import prisma from "../db/db";
import { OptionType, QuestionType } from "../types";

export async function createQuestion(data: QuestionType) {
  console.log("question data : ", data);
  const result = await prisma.question.create({ data });
  return result;
}

export async function deleteQuestion(id: number) {
  const result = await prisma.question.delete({ where: { id: id } });
  return result;
}

export async function deleteQuestionsByQuizId(quizId: number) {
  const result = await prisma.question.deleteMany({
    where: { quiz_id: quizId },
  });
  return result;
}

export async function updateQuestion(data: QuestionType, id: number) {
  const result = await prisma.question.update({
    data: data,
    where: { id: id },
  });
  return result;
}

export async function findQuestionByQuizId(quizId: number) {
  const result = await prisma.question.findMany({
    where: { quiz_id: quizId },
    include: { options: true },
  });
  return result;
}

export async function findQuestionById(id: number) {
  const result = await prisma.question.findUnique({
    where: { id: id },
    include: { options: true },
  });
  return result;
}
