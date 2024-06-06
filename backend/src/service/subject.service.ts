import prisma from "../db/db";
import { SubjectType } from "../types";

export async function createSubject(data: SubjectType) {
  const result = await prisma.subject.create({ data });
  return result;
}

export async function deleteSubject(id: number) {
  const result = await prisma.subject.delete({ where: { id: id } });
  return result;
}

export async function updateSubject(data: SubjectType, id: number) {
  const result = await prisma.subject.update({ data: data, where: { id: id } });
  return result;
}

export async function findBaseSubjectAll() {
  const result = await prisma.subject.findMany({ where: { subject_id: null } });
  return result;
}

export async function findBaseSubjectById(id: number) {
  const result = await prisma.subject.findUnique({ where: { id: id } });
  return result;
}

export async function findSubSubjectAll() {
  const result = await prisma.subject.findMany({
    where: { subject_id: { not: null } },
    include: {
      subject: true,
    },
  });
  return result;
}

export async function findSubSubjectById(id: number) {
  const result = await prisma.subject.findUnique({
    where: { id: id },
    include: {
      subject: true,
    },
  });
  return result;
}
