module.exports = (sequelize, DataTypes) => {
  const Jogo = sequelize.define('Jogo', {
    id_jogo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_edicao: DataTypes.INTEGER,
    // 👇 ADICIONE ESSA LINHA AQUI 👇
    fase: DataTypes.STRING,

    id_time_casa: DataTypes.INTEGER,
    id_time_fora: DataTypes.INTEGER,
    placar_casa: DataTypes.INTEGER,
    placar_fora: DataTypes.INTEGER,
    horario: DataTypes.DATE,
    status_partida: DataTypes.STRING
  }, {
    tableName: 'jogos',
    timestamps: false
  });

  // ... (resto das associações)
  return Jogo;
};