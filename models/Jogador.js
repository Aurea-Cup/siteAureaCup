module.exports = (sequelize, DataTypes) => {
  const Jogador = sequelize.define('Jogador', {
    id_jogador: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    id_time: { type: DataTypes.INTEGER } // FK
  }, {
    tableName: 'jogador',
    timestamps: false
  });
  return Jogador;
};