import prisma from "./db";
import bcrypt from "bcrypt";

const userData = [
  {
    name: "Rohit Saklani",
    email: "rohit@gmail.com",
    password: "rohit",
  },
  {
    name: "Rajat Macias",
    email: "rajat@gmail.com",
    password: "rajat",
  },
  {
    name: "Mary Dean",
    email: "marydean@retrack.com",
    password: "rohit",
  },
  {
    name: "Pugh Wise",
    email: "pughwise@retrack.com",
    password: "rohit",
  },
  {
    name: "Rochelle Roberson",
    email: "rochelleroberson@retrack.com",
    password: "rohit",
  },
  {
    name: "Lee Murray",
    email: "leemurray@retrack.com",
    password: "rohit",
  },
];

export async function seed() {
  const newData = await Promise.all(
    userData.map(async (ele) => {
      const newP = await bcrypt.hash(ele.password, 8);
      return { ...ele, password: newP };
    })
  );

  await prisma.user.createMany({
    data: [...newData],
  });
}

export async function clearSeed() {
  const res = await prisma.user.deleteMany({});
  console.log("delete : res : ", res);
  return 0;
}
