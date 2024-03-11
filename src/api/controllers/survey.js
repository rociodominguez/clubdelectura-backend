const User = require("../models/user");
const SurveyResult = require('../models/survey');

const surveyResults = async (req, res) => {
  try {
    const surveyData = req.body;

    const user = await User.findById(req.user._id);
    user.hasVoted = true;
    await user.save();

    const newSurveyResult = new SurveyResult({
      selectedBook: surveyData.selectedBook,
    });

    const savedResult = await newSurveyResult.save();

    res.status(201).json("Encuesta enviada con éxito");

  } catch (error) {
    res.status(500).json("Error al enviar la encuesta");
  }
};

module.exports = { surveyResults };
