const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Puxa as variáveis seguras do .env

// Configura a conexão lendo os dados do .env
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Daqui pra baixo continua o código que você já tinha:
// const Usuario = require('./Usuario')(sequelize, DataTypes);
// const Edicao = require('./Edicao')(sequelize, DataTypes);
// ... e o resto das associações ...
// Inicializando os Modelos
const Usuario = require('./Usuario')(sequelize, DataTypes);
const Edicao = require('./Edicao')(sequelize, DataTypes);
const Time = require('./Time')(sequelize, DataTypes);
const Jogador = require('./Jogador')(sequelize, DataTypes);
const EstatisticasTime = require('./EstatisticasTIme')(sequelize, DataTypes);
const EstatisticasJogadores = require('./EstatisticasJogadores')(sequelize, DataTypes);
const Jogo = require('./Jogo')(sequelize, DataTypes);
const GolJogo = require('./GolJogo')(sequelize, DataTypes);

// ==========================================
// DEFININDO AS ASSOCIAÇÕES (As linhas do diagrama)
// ==========================================

// 1. Usuário e Time (1:N)
Usuario.hasMany(Time, { foreignKey: 'id_lider' });
Time.belongsTo(Usuario, { foreignKey: 'id_lider', as: 'lider' });

// 2. Time e Jogador (1:N)
Time.hasMany(Jogador, { foreignKey: 'id_time', as: 'jogadores' });
Jogador.belongsTo(Time, { foreignKey: 'id_time', as: 'time' });

// 3. Time e Estatísticas (1:1)
Time.hasOne(EstatisticasTime, { foreignKey: 'id_time', as: 'estatisticas' });
EstatisticasTime.belongsTo(Time, { foreignKey: 'id_time' });

// 4. Jogador e Estatísticas (1:1)
Jogador.hasOne(EstatisticasJogadores, { foreignKey: 'id_jogador', as: 'estatisticas' });
EstatisticasJogadores.belongsTo(Jogador, { foreignKey: 'id_jogador' });

// 5. Edição e Jogos (1:N)
Edicao.hasMany(Jogo, { foreignKey: 'id_edicao' });
Jogo.belongsTo(Edicao, { foreignKey: 'id_edicao' });

// 6. Time e Jogos (1:N para casa, 1:N para fora)
Time.hasMany(Jogo, { foreignKey: 'id_time_casa', as: 'jogosCasa' });
Time.hasMany(Jogo, { foreignKey: 'id_time_fora', as: 'jogosFora' });
Jogo.belongsTo(Time, { foreignKey: 'id_time_casa', as: 'timeCasa' });
Jogo.belongsTo(Time, { foreignKey: 'id_time_fora', as: 'timeFora' });

// 7. Tabela N:N Titulos (Edicao <-> Time)
// O Sequelize cria a tabela intermediária "titulos" automaticamente com base nessa relação
Edicao.belongsToMany(Time, { through: 'titulos', foreignKey: 'id_edicao', otherKey: 'id_time', as: 'campeoes' });
Time.belongsToMany(Edicao, { through: 'titulos', foreignKey: 'id_time', otherKey: 'id_edicao', as: 'titulosGanhos' });

// 8. Tabela Gol_Jogos (Jogador e Jogo)
Jogador.hasMany(GolJogo, { foreignKey: 'id_jogador' });
GolJogo.belongsTo(Jogador, { foreignKey: 'id_jogador', as: 'marcador' });

Jogo.hasMany(GolJogo, { foreignKey: 'id_jogo', as: 'gols' });
GolJogo.belongsTo(Jogo, { foreignKey: 'id_jogo' });

// Exportando tudo para usar na aplicação
module.exports = {
    sequelize,
    Usuario,
    Edicao,
    Time,
    Jogador,
    EstatisticasTime,
    EstatisticasJogadores,
    Jogo,
    GolJogo
};