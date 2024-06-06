import express from "express";
import {
  addQuiz,
  getQuiz,
  getQuizs,
  modifyQuiz,
  removeQuiz,
} from "../controller/quizs.controller";
const quizsRoute = express.Router();

quizsRoute.get("/", getQuizs);

quizsRoute.post("/", addQuiz);

quizsRoute.get("/:id", getQuiz);

quizsRoute.delete("/:id", removeQuiz);

quizsRoute.put("/:id", modifyQuiz);

export default quizsRoute;
