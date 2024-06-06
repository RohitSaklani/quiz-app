import { Request, Response } from "express";
import { quizSchema } from "../types";
import {
  createQuiz,
  deleteQuiz,
  findQuizAll,
  findQuizById,
  updatequiz,
} from "../service/quizs.service";

export async function getQuizs(req: Request, res: Response) {
  try {
    const result = await findQuizAll();

    res.status(200).json({
      result,
      message: "quiz get successfull",
    });
  } catch (error) {
    console.log("[QUIZ_GET_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getQuiz(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await findQuizById(id);

    if (result) {
      res.status(200).json({
        result,
        message: "Quiz get successfull",
      });
    } else {
      res.status(404).json({
        message: "no record found",
      });
    }
  } catch (error) {
    console.log("[QUIZ_GET_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addQuiz(req: Request, res: Response) {
  try {
    const body = req.body;

    const validation = quizSchema.safeParse(body);
    if (validation.success) {
      const result = await createQuiz(body);

      res.status(200).json({
        message: "quiz added successfull",
        result,
      });
    } else {
      res.status(422).json({ message: validation.error?.format() });
    }
  } catch (error) {
    console.log("[QUIZ_CREATE_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeQuiz(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (id) {
      const result = await deleteQuiz(id);

      res.status(200).json({
        message: "quiz deleted successfull",
      });
    } else {
      res.status(422).json({ message: "quiz id missing !!" });
    }
  } catch (error) {
    console.log("[QUIZ_DELETE_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function modifyQuiz(req: Request, res: Response) {
  try {
    const body = req.body;
    const id = Number(req.params.id);

    const validation = quizSchema.safeParse(body);
    if (validation.success && id) {
      const result = await updatequiz(body, id);

      res.status(200).json({
        message: "quiz updated successfull",
      });
    } else {
      res.status(422).json({ message: validation.error?.format() });
    }
  } catch (error) {
    console.log("[QUIZ_MODIFY_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
