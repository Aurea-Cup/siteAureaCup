module.exports = (sequelize, DataTypes) => {
  const Edicao = sequelize.define('Edicao', {
    id_edicao: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  }, {
    tableName: 'edicao',
    timestamps: false
  });
  return Edicao;
};