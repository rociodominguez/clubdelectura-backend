const mongoose = require('mongoose');

const surveyResultSchema = new mongoose.Schema({
  selectedBook: { type: String, required: true },
}, {
  timestamps: true,
});

const SurveyResult = mongoose.model('SurveyResult', surveyResultSchema, 'surveyResults');

module.exports = SurveyResult;