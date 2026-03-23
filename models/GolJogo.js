// No seu arquivo models/GolJogo.js (ou equivalente)
module.exports = (sequelize, DataTypes) => {
    const GolJogo = sequelize.define('GolJogo', {
        id_gol: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_jogo: { type: DataTypes.INTEGER, allowNull: false },
        id_jogador: { type: DataTypes.INTEGER, allowNull: true }, // 👈 MUDE PARA TRUE AQUI
        id_time: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'gol_jogos',
        timestamps: false
    });
    return GolJogo;
};