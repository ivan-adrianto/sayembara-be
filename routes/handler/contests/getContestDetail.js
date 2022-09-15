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
      ],
    });

    const submissions = await submission.findAll({
      where: { contest_id: id },
      attributes: ["id", "thumbnail", "title", "description"],
    });
    const data = {
      ...contests.dataValues,
      submissions,
      prize_text: prizeToText(contests.dataValues.prize),
      posted_since: timeDiff(contests.dataValues.created_at),
      due_date: formatDate(contests.dataValues.due_date),
      announcement_date: formatDate(contests.dataValues.announcement_date),
      status: new Date() < new Date(contests.dataValues.due_date) ? "Open" : "Closed",
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
