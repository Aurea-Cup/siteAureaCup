module.exports = (sequelize, DataTypes) => {
  const GolJogo = sequelize.define('GolJogo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_jogador: { type: DataTypes.INTEGER }, // FK
    id_jogo: { type: DataTypes.INTEGER } // FK
  }, {
    tableName: 'gol_jogos',
    timestamps: false
  });
  return GolJogo;
};