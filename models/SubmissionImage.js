module.exports = (sequelize, DataTypes) => {
    const SubmissionImage = sequelize.define(
      "submissionImage",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        submission_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: "subs_images",
        timestamps: false,
      }
    );
  
    return SubmissionImage;
  };
  