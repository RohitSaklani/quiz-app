import prisma from "../db/db";
import { QuizType } from "../types";

export async function createQuiz(data: QuizType) {
  console.log("quiz data : ", data);
  const result = await prisma.quiz.create({ data });
  return result;
}

export async function deleteQuiz(id: number) {
  const result = await prisma.quiz.delete({ where: { id: id } });
  return result;
}

export async function updatequiz(data: QuizType, id: number) {
  const result = await prisma.quiz.update({ data: data, where: { id: id } });
  return result;
}

export async function findQuizAll() {
  const result = await prisma.quiz.findMany({ include: { subject: true } });
  return result;
}

export async function findQuizById(id: number) {
  const result = await prisma.quiz.findUnique({
    where: { id: id },
    include: { subject: true },
  });
  return result;
}
