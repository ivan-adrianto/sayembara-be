module.exports = (sequelize, DataTypes) => {
  const Contest = sequelize.define(
    "contest",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contest_status: {
        type: DataTypes.ENUM,
        values: ["Open", "Pending", "Closed"],
        allowNull: false,
        defaultValue: "Open",
      },
      payment_status: {
        type: DataTypes.ENUM,
        values: ["Paid", "Unpaid"],
        allowNull: false,
        defaultValue: "Unpaid",
      },
      prize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      announcement_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      winner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "contests",
      timestamps: true,
    }
  );

  return Contest;
};
