module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome_usuario: { type: DataTypes.STRING(100), allowNull: false },
    tipo_usuario: { type: DataTypes.ENUM('admin', 'comum', 'lider'), allowNull: false },
    senha: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true }
  }, {
    tableName: 'usuario',
    timestamps: false
  });
  return Usuario;
};