module.exports = (sequelize, DataTypes) => {
  const EstatisticasTime = sequelize.define('EstatisticasTime', {
    id_time: { type: DataTypes.INTEGER, primaryKey: true }, // PK e FK ao mesmo tempo
    gols: { type: DataTypes.INTEGER, defaultValue: 0 },
    gols_sofridos: { type: DataTypes.INTEGER, defaultValue: 0 },
    partidas: { type: DataTypes.INTEGER, defaultValue: 0 },
    vitorias: { type: DataTypes.INTEGER, defaultValue: 0 },
    derrotas: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'estatisticas_time',
    timestamps: false
  });
  return EstatisticasTime;
};