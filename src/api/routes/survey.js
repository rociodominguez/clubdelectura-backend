const express = require('express');
const surveyRouter = express.Router();
const { isAuth } = require("../../middlewares/auth");
const { surveyResults, getSurveyResults } = require('../controllers/survey');

surveyRouter.post('/survey', [isAuth], surveyResults);

module.exports = surveyRouter;