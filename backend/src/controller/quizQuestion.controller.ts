import { Request, Response } from "express";
import {
  createQuestion,
  deleteQuestion,
  findQuestionById,
  findQuestionByQuizId,
  updateQuestion,
} from "../service/quizQuestion.service";
import { OptionSchema, QuestionSchema } from "../types";
import {
  createOptionsByQuestionId,
  deleteOptionsByQuestionId,
} from "../service/options.service";

export async function getQuestions(req: Request, res: Response) {
  try {
    const quizId = Number(req.params.quizId);
    const result = await findQuestionByQuizId(quizId);

    res.status(200).json({
      result,
      message: "question get successfull",
    });
  } catch (error) {
    console.log("[QUESTION_GET_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getQuestion(req: Request, res: Response) {
  try {
    const questionId = Number(req.params.questionId);

    const id = Number(req.params.id);
    const result = await findQuestionById(questionId);

    if (result) {
      res.status(200).json({
        result,
        message: "Question get successfull",
      });
    } else {
      res.status(404).json({
        message: "no record found",
      });
    }
  } catch (error) {
    console.log("[QUESTION_GET_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addQuestion(req: Request, res: Response) {
  try {
    const quizId = Number(req.params.quizId);
    let question = req.body.question;

    let questionBody = { question: question, quiz_id: quizId };
    const optionsBody = req.body.options;

    const validationQuestion = QuestionSchema.safeParse(questionBody);
    if (validationQuestion.success) {
      const result = await createQuestion(questionBody);

      let options = [];

      for (let i = 0; i < optionsBody.length; ++i) {
        options[i] = { ...optionsBody[i], question_id: result.id };
        const validationOption = OptionSchema.safeParse(options[i]);

        if (validationOption.success) {
          await createOptionsByQuestionId(options[i]);
        } else {
          res.status(422).json({ message: validationOption.error?.format() });
        }
      }
      res.status(200).json({
        message: "question created successfull",
      });
    } else {
      res.status(422).json({ message: validationQuestion.error?.format() });
    }
  } catch (error) {
    console.log("[QUESTION_CREATE_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeQuestion(req: Request, res: Response) {
  try {
    const quizId = Number(req.params.quizId);
    const questionId = Number(req.params.questionId);

    if (questionId) {
      const result = await deleteQuestion(questionId);

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

export async function modifyQuestion(req: Request, res: Response) {
  try {
    const quizId = Number(req.params.quizId);

    const questionId = Number(req.params.questionId);
    let question = req.body.question;

    let questionBody = { question: question, quiz_id: quizId };
    const optionsBody = req.body.options;

    const validationQuestion = QuestionSchema.safeParse(questionBody);
    if (validationQuestion.success) {
      await deleteOptionsByQuestionId(questionId);

      const result = await updateQuestion(questionBody, questionId);
      let options = [];

      for (let i = 0; i < optionsBody.length; ++i) {
        options[i] = { ...optionsBody[i], question_id: result.id };
        const validationOption = OptionSchema.safeParse(options[i]);

        if (validationOption.success) {
          await createOptionsByQuestionId(options[i]);
        } else {
          res.status(422).json({ message: validationOption.error?.format() });
        }
      }
      res.status(200).json({
        message: "question updated successfull",
      });
    } else {
      res.status(422).json({ message: validationQuestion.error?.format() });
    }
  } catch (error) {
    console.log("[QUESTION_UPDATE_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
