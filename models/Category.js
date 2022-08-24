module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      "category",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "categories",
        timestamps: false,
      }
    );
  
    return Category;
  };
  