import express from "express";
import {
  addQuiz,
  getQuiz,
  getQuizs,
  modifyQuiz,
  removeQuiz,
} from "../controller/quizs.controller";
import {
  addQuestion,
  getQuestion,
  getQuestions,
  modifyQuestion,
  removeQuestion,
} from "../controller/quizQuestion.controller";
const quizRoute = express.Router();

quizRoute.get("/:quizId/question", getQuestions);

quizRoute.post("/:quizId/question", addQuestion);

quizRoute.delete("/:quizId/question/:questionId", removeQuestion);

quizRoute.get("/:quizId/question/:questionId", getQuestion);

quizRoute.put("/:quizId/question/:questionId", modifyQuestion);

// quizRoute.get("/:id", getQuiz);

// quizRoute.delete("/:id", removeQuiz);

// quizRoute.put("/:id", modifyQuiz);

export default quizRoute;
