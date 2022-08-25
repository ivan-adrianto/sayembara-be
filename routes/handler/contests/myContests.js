const { Op } = require("sequelize");
const { contest, submission, User } = require("../../../models");
contest.hasOne(User, {
  foreignKey: "id",
  sourceKey: "provider_id",
  as: "provider",
});

module.exports = async (req, res) => {
  try {
    const submissions = await submission.findAll({
      where: { participant_id: req.user.id },
    });
    let data = [];
    for (let i = 0; i < submissions.length; i++) {
      const item = await contest.findOne({
        where: { id: submissions[i].contest_id },
        include: [{ model: User, attributes: ["fullname"], as: "provider" }],
        attributes: [
          "id",
          "winner_id",
          "title",
          "created_at",
          "prize",
          "description",
          "due_date",
        ],
      });
      if (item.dataValues.winner_id == req.user.id) {
        item.dataValues.winner_status = true
      } else {
        item.dataValues.winner_status = false
      }
      delete item.dataValues.winner_id
      data.push(item);
    }

    return res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
