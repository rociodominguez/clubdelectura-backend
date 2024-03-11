const express = require('express');
const surveyRouter = express.Router();
const { surveyResults } = require('../controllers/survey');
const { isAuth } = require('../../middlewares/auth');

surveyRouter.post('/survey', [isAuth], surveyResults);

module.exports = surveyRouter;