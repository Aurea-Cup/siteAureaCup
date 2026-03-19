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