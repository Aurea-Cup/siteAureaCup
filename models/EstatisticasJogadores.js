module.exports = (sequelize, DataTypes) => {
  const EstatisticasJogadores = sequelize.define('EstatisticasJogadores', {
    id_jogador: { type: DataTypes.INTEGER, primaryKey: true }, // PK e FK
    gols: { type: DataTypes.INTEGER, defaultValue: 0 },
    partidas: { type: DataTypes.INTEGER, defaultValue: 0 },
    vitorias: { type: DataTypes.INTEGER, defaultValue: 0 },
    derrotas: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'estatisticas_jogadores',
    timestamps: false
  });
  return EstatisticasJogadores;
};