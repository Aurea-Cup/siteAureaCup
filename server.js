const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
// Libera a pasta 'uploads' para o front-end conseguir acessar as imagens pela URL
app.use('/uploads', express.static('uploads'));

// ==========================================
// CONFIGURAÇÃO DO UPLOAD DE IMAGENS (MULTER)
// ==========================================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Salva na pasta uploads
    },
    filename: (req, file, cb) => {
        // Cria um nome único para a imagem não sobrescrever outra
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// ==========================================
// ROTAS DE BUSCA (GET) - ESSENCIAIS PARA OS SELECTS
// ==========================================

// Rota para listar todos os TIMES (Equipes)
app.get('/times', async (req, res) => {
    try {
        const times = await db.Time.findAll();
        res.json(times); // Envia a lista de times para o front-end
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao buscar times no banco.' });
    }
});

// Rota para listar todos os JOGADORES (Faltava essa!)
app.get('/jogadores', async (req, res) => {
    try {
        const jogadores = await db.Jogador.findAll({
            include: [{ model: db.Time, as: 'time' }]
        });
        res.json(jogadores);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao buscar jogadores no banco.' });
    }
});

app.post('/jogos', async (req, res) => {
    try {
        const { id_edicao, id_time_casa, id_time_fora, placar_casa, placar_fora, horario, status_partida, gols } = req.body;

        const resultado = await db.sequelize.transaction(async (t) => {
            // 1. Cria o Jogo
            const novoJogo = await db.Jogo.create({
                id_edicao, id_time_casa, id_time_fora, placar_casa, placar_fora, horario, status_partida
            }, { transaction: t });

            // 2. Registra os Gols (Se houver)
            if (gols && gols.length > 0) {
                // FIX: Filtra gols anônimos para não tentarem ser inseridos como jogadores reais
                // e garante que a inserção seja limpa
                const golsParaInserir = gols.filter(g => g.id_jogador !== "999998" && g.id_jogador !== "999999")
                    .map(g => ({
                        id_jogo: novoJogo.id_jogo,
                        id_jogador: g.id_jogador,
                        id_time: g.id_time // 👈 SALVANDO O ID DO TIME DO MOMENTO DO GOL
                    }));

                if (golsParaInserir.length > 0) {
                    await db.GolJogo.bulkCreate(golsParaInserir, { transaction: t });
                }
                // FIM FIX
            }

            // ... resto do código de estatísticas continua igual
            return novoJogo;
        });

        res.status(201).json({ mensagem: 'Partida registrada!', jogo: resultado });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao salvar jogo.' });
    }
});

// Rota para buscar o histórico de partidas
app.get('/jogos', async (req, res) => {
    try {
        console.log("Buscando partidas no banco...");
        const jogos = await db.Jogo.findAll({
            include: [
                // Os nomes abaixo (as) DEVEM ser iguais aos do seu models/index.js
                { model: db.Time, as: 'timeCasa' },
                { model: db.Time, as: 'timeFora' },
                {
                    model: db.GolJogo,
                    as: 'gols',
                    include: [{ model: db.Jogador, as: 'marcador' }]
                }
            ],
            order: [['horario', 'DESC']]
        });
        res.json(jogos);
    } catch (erro) {
        console.error("ERRO AO BUSCAR JOGOS:", erro.message);
        res.status(500).json({ erro: 'Erro ao carregar histórico.', detalhes: erro.message });
    }
});

// Rota para listar as EDIÇÕES
app.get('/edicoes', async (req, res) => {
    try {
        const edicoes = await db.Edicao.findAll();
        res.json(edicoes);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar edições.' });
    }
});

app.post('/edicoes', async (req, res) => {
    try {
        // Cria uma nova edição vazia (o banco vai gerar o ID automaticamente)
        const novaEdicao = await db.Edicao.create({});
        res.status(201).json({
            mensagem: `Edição #${novaEdicao.id_edicao || novaEdicao.id} gerada com sucesso!`
        });
    } catch (erro) {
        console.error("Erro ao gerar edição:", erro);
        res.status(500).json({ erro: 'Erro interno ao criar a edição.' });
    }
});

// 2. CADASTRAR TIME COM LOGO E ZERAR ESTATÍSTICAS
app.post('/times', upload.single('logo'), async (req, res) => {
    try {
        const { nome_time } = req.body;
        // Se enviou imagem, salva o caminho. Se não, fica nulo.
        const caminhoLogo = req.file ? `/uploads/${req.file.filename}` : null;

        // Inicia uma "Transaction" para garantir que se uma tabela falhar, ele desfaz a outra
        const result = await db.sequelize.transaction(async (t) => {
            const novoTime = await db.Time.create({ nome_time, logo: caminhoLogo }, { transaction: t });

            // Já cria a tabela de estatísticas do time zerada!
            await db.EstatisticasTime.create({ id_time: novoTime.id_time }, { transaction: t });

            return novoTime;
        });

        res.status(201).json({ mensagem: `${nome_time} cadastrado com sucesso!`, time: result });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar o time.' });
    }
});

// 3. CADASTRAR JOGADOR E ZERAR ESTATÍSTICAS
app.post('/jogadores', async (req, res) => {
    try {
        const { nome, id_time } = req.body;

        const result = await db.sequelize.transaction(async (t) => {
            const novoJogador = await db.Jogador.create({ nome, id_time }, { transaction: t });
            // Cria a estatística zerada do jogador
            await db.EstatisticasJogadores.create({ id_jogador: novoJogador.id_jogador }, { transaction: t });
            return novoJogador;
        });

        res.status(201).json({ mensagem: `Jogador ${nome} cadastrado!`, jogador: result });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar jogador.' });
    }
});


const PORTA = process.env.PORTA || 3000;
db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORTA, () => console.log(`🚀 Servidor rodando na porta ${PORTA}`));
});
