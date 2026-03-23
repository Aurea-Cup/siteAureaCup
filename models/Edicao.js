module.exports = (sequelize, DataTypes) => {
  const Edicao = sequelize.define('Edicao', {
    id_edicao: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_time_campeao: { type: DataTypes.INTEGER } // FK
  }, {
    tableName: 'edicao',
    timestamps: false
  });
  return Edicao;
};