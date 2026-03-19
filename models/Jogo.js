module.exports = (sequelize, DataTypes) => {
  const Jogo = sequelize.define('Jogo', {
    id_jogo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_time_casa: { type: DataTypes.INTEGER }, // FK
    id_time_fora: { type: DataTypes.INTEGER }, // FK
    id_edicao: { type: DataTypes.INTEGER }, // FK
    placar_casa: { type: DataTypes.INTEGER, defaultValue: 0 },
    placar_fora: { type: DataTypes.INTEGER, defaultValue: 0 },
    horario: { type: DataTypes.DATE },
    status_partida: { type: DataTypes.ENUM('em_breve', 'em_andamento', 'finalizada'), allowNull: false }
  }, {
    tableName: 'jogos',
    timestamps: false
  });
  return Jogo;
};