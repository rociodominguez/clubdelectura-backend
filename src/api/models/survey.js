const mongoose = require('mongoose');

const surveyResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  selectedBook: { type: String, required: true },
}, {
  timestamps: true,
});

const SurveyResult = mongoose.model('SurveyResult', surveyResultSchema, 'surveyResults');

module.exports = SurveyResult;