const {
  timeDiff,
  prizeToText,
  formatDate,
} = require("../../../helpers/converter");
const { contest, User, submission } = require("../../../models");
contest.hasOne(User, {
  foreignKey: "id",
  sourceKey: "provider_id",
});
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const id = req.params.id;
  try {
    const contests = await contest.findOne({
      where: { id },
      include: [{ model: User, attributes: ["fullname"], as: "provider" }],
      attributes: [
        "id",
        "title",
        "created_at",
        "prize",
        "description",
        "due_date",
        "announcement_date",
        "winner_id",
      ],
    });

    const mySubmissions = await submission.findAll({
      where: { contest_id: id, participant_id: req.user.id },
      attributes: ["id", "thumbnail", "title", "description"],
    });
    const othersSubmissions = await submission.findAll({
      where: { contest_id: id, participant_id: { [Op.not]: req.user.id } },
      attributes: ["id", "thumbnail", "title", "description"],
    });
    const joinStatus = () => {
      if (contests.winner_id === req.user.id) {
        return "winner";
      }
      if (mySubmissions.length > 0) {
        return "joined";
      }
      return "not join";
    };

    const data = {
      ...contests.dataValues,
      submissions: [...mySubmissions, ...othersSubmissions],
      prize_text: prizeToText(contests.dataValues.prize),
      posted_since: timeDiff(contests.dataValues.created_at),
      due_date: formatDate(contests.dataValues.due_date),
      announcement_date: formatDate(contests.dataValues.announcement_date),
      status:
        new Date() < new Date(contests.dataValues.due_date) &&
        !contests.winner_id
          ? "Open"
          : "Closed",
      join_status: joinStatus(),
    };
    
    res.json({
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
