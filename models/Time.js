module.exports = (sequelize, DataTypes) => {
  const Time = sequelize.define('Time', {
    id_time: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_lider: { type: DataTypes.INTEGER }, // FK
    nome_time: { type: DataTypes.STRING(100), allowNull: false },
    logo: { type: DataTypes.STRING(255) }
  }, {
    tableName: 'time',
    timestamps: false
  });
  return Time;
};