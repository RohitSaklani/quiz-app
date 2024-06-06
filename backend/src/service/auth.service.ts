import prisma from "../db/db";
export const findUserByEmail = async (email: string) => {
  const result = await prisma.admin.findFirst({
    where: { email },
  });

  return result;
};

export const createUser = async (data: any) => {
  const result = await prisma.admin.create({ data: { ...data } });
  return result;
};
