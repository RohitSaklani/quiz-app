import prisma from "../db/db";
import { OptionType, QuestionType } from "../types";

export async function createOptionsByQuestionId(option: OptionType) {
  const result = await prisma.option.create({ data: option });

  return result;
}

export async function deleteOptionsByQuestionId(questionId: number) {
  const result = await prisma.option.deleteMany({
    where: { question_id: questionId },
  });
  return result;
}

// export async function updateOptionByQuestionId(data: OptionType, id: number) {
//   const result = await prisma.option.updateMany({
//     data: data,
//     where: { id: id },
//   });
//   return result;
// }

export async function findOptionsByQuestionId(questionId: number) {
  const result = await prisma.option.findMany({
    where: { question_id: questionId },
  });
  return result;
}

// export async function findOptionById(id: number) {
//   const result = await prisma.option.findUnique({
//     where: { id: id },
//   });
//   return result;
// }
