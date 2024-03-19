const User = require("../models/user");
const SurveyResult = require('../models/survey');

const surveyResults = async (req, res) => {
  try {
    const surveyData = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, { hasVoted: true });

    const newSurveyResult = new SurveyResult({
      user: user._id,
      selectedBook: surveyData.selectedBook,
    });
    

    const savedResult = await newSurveyResult.save();

    res.status(201).json("Encuesta enviada con éxito");

  } catch (error) {
    res.status(500).json("Error al enviar la encuesta");
  }
};

module.exports = { surveyResults };