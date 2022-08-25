module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define(
    "submission",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "submissions",
      timestamps: false,
    }
  );

  return Submission;
};
