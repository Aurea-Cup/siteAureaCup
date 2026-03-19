const express = require('express');
const cors = require('cors');
require('dotenv').config(); // <-- Adiciona no topo
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensagem: 'API da Aurea Cup rodando lisa! 🏆' });
});

// Puxa a porta do .env. Se não achar, usa a 3000 por padrão
const PORTA = process.env.PORTA || 3000;

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('✅ Banco de dados sincronizado e conectado com sucesso!');
        app.listen(PORTA, () => {
            console.log(`🚀 Servidor de pé rodando em http://localhost:${PORTA}`);
        });
    })
    .catch((erro) => {
        console.error('❌ Deu ruim na conexão com o banco de dados:', erro);
    });


// ==========================================
// ROTAS DA API
// ==========================================

// Rota para CRIAR uma nova Edição
app.post('/edicoes', async (req, res) => {
  try {
    // Como na sua tabela a edição só tem o id_edicao (auto_increment), a gente só manda criar.
    const novaEdicao = await db.Edicao.create();
    res.status(201).json({ mensagem: 'Edição criada com sucesso!', edicao: novaEdicao });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Deu ruim ao criar a edição.' });
  }
});

// Rota para CADASTRAR um novo Time
app.post('/times', async (req, res) => {
  try {
    // Puxa os dados que vão vir lá do HTML
    const { nome_time, logo } = req.body;
    
    // Insere no banco
    const novoTime = await db.Time.create({ nome_time, logo });
    
    res.status(201).json({ mensagem: `${nome_time} cadastrado com sucesso!`, time: novoTime });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Deu ruim ao cadastrar o time.' });
  }
});