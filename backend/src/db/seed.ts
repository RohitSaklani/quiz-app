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

const subjectData = [
  {
    name: "electronics",
    subject_id: null,
  },

  { id: 1, name: "CS", subject_id: null },
  { id: 2, name: "machanical", subject_id: null },
  {
    name: "civil",
    subject_id: null,
  },
];

const subjectData2 = [
  { id: 51, name: "dsa", subject_id: 1 },
  { id: 52, name: "cyber", subject_id: 1 },
  { id: 53, name: "c++", subject_id: 2 },
  { id: 54, name: "java", subject_id: 1 },
  { id: 55, name: "chemical", subject_id: 2 },
];

const quizData = [
  { id: 1, name: "101", level: 1, subject_id: 51 },
  { id: 2, name: "102", level: 1, subject_id: 52 },
  { id: 3, name: "103", level: 2, subject_id: 53 },
  { id: 4, name: "104", level: 3, subject_id: 53 },
];

const questionData = [
  {
    id: 1,
    question:
      "Root element that contains all other elements. Follows the DOCTYPE declaration.",
    quiz_id: 1,
  },
  {
    id: 2,
    question:
      "Refers to building, creating and maintaining web content. It includes web design, web publishing, web programming and database management.",
    quiz_id: 1,
  },
  {
    id: 3,
    question:
      "The part of a CSS rule which specifies which element(s) are to be styled.",
    quiz_id: 1,
  },
  { id: 4, question: "Colors that are opposite of each other", quiz_id: 1 },
  {
    id: 5,
    question:
      "Refers to building, creating and maintaining web content. It includes web design, web publishing, web programming and database management.",
    quiz_id: 1,
  },
  {
    id: 6,
    question:
      "A selector that applies the same attribute to any HTML element that references it. It can be used multiple times in an HTML document.",
    quiz_id: 1,
  },
  {
    id: 7,
    question:
      "Root element that contains all other elements. Follows the DOCTYPE declaration.",
    quiz_id: 2,
  },
  {
    id: 8,
    question:
      "Refers to building, creating and maintaining web content. It includes web design, web publishing, web programming and database management.",
    quiz_id: 2,
  },
  {
    id: 9,
    question:
      "The part of a CSS rule which specifies which element(s) are to be styled.",
    quiz_id: 2,
  },
  { id: 10, question: "Colors that are opposite of each other", quiz_id: 2 },
  {
    id: 11,
    question:
      "Refers to building, creating and maintaining web content. It includes web design, web publishing, web programming and database management.",
    quiz_id: 2,
  },
  {
    id: 12,
    question:
      "A selector that applies the same attribute to any HTML element that references it. It can be used multiple times in an HTML document.",
    quiz_id: 2,
  },
];

const optionsData = [
  { description: "option1", isRight: false, question_id: 1 },
  { description: "option2", isRight: true, question_id: 1 },
  { description: "option3", isRight: false, question_id: 1 },
  { description: "option4", isRight: false, question_id: 1 },
  { description: "option1", isRight: false, question_id: 2 },
  { description: "option2", isRight: false, question_id: 2 },
  { description: "option3", isRight: false, question_id: 2 },
  { description: "option4", isRight: true, question_id: 2 },
  { description: "option1", isRight: true, question_id: 3 },
  { description: "option2", isRight: false, question_id: 3 },
  { description: "option3", isRight: false, question_id: 3 },
  { description: "option4", isRight: false, question_id: 3 },
  { description: "option1", isRight: false, question_id: 4 },
  { description: "option2", isRight: false, question_id: 4 },
  { description: "option3", isRight: true, question_id: 4 },
  { description: "option4", isRight: false, question_id: 4 },
  { description: "option1", isRight: false, question_id: 5 },
  { description: "option2", isRight: false, question_id: 5 },
  { description: "option3", isRight: false, question_id: 5 },
  { description: "option4", isRight: true, question_id: 5 },
  { description: "option1", isRight: true, question_id: 6 },
  { description: "option2", isRight: false, question_id: 6 },
  { description: "option3", isRight: false, question_id: 6 },
  { description: "option4", isRight: false, question_id: 6 },
  { description: "option1", isRight: false, question_id: 7 },
  { description: "option2", isRight: true, question_id: 7 },
  { description: "option3", isRight: false, question_id: 7 },
  { description: "option4", isRight: false, question_id: 7 },

  { description: "option1", isRight: false, question_id: 8 },
  { description: "option2", isRight: false, question_id: 8 },
  { description: "option3", isRight: true, question_id: 8 },
  { description: "option4", isRight: false, question_id: 8 },

  { description: "option1", isRight: false, question_id: 9 },
  { description: "option2", isRight: true, question_id: 9 },
  { description: "option3", isRight: false, question_id: 9 },
  { description: "option4", isRight: false, question_id: 9 },

  { description: "option1", isRight: true, question_id: 10 },
  { description: "option2", isRight: false, question_id: 10 },
  { description: "option3", isRight: false, question_id: 10 },
  { description: "option4", isRight: false, question_id: 10 },
  { description: "option1", isRight: false, question_id: 11 },
  { description: "option2", isRight: false, question_id: 11 },
  { description: "option3", isRight: true, question_id: 11 },
  { description: "option4", isRight: false, question_id: 11 },

  { description: "option1", isRight: false, question_id: 12 },
  { description: "option2", isRight: true, question_id: 12 },
  { description: "option3", isRight: false, question_id: 12 },
  { description: "option4", isRight: false, question_id: 12 },
];

export async function seed() {
  await prisma.subject.createMany({ data: [...subjectData] });
  const newData = await Promise.all(
    userData.map(async (ele) => {
      const newP = await bcrypt.hash(ele.password, 8);
      return { ...ele, password: newP };
    })
  );

  await prisma.admin.createMany({
    data: [...newData],
  });

  await prisma.subject.createMany({ data: [...subjectData2] });

  await prisma.quiz.createMany({
    data: [...quizData],
  });

  await prisma.question.createMany({ data: [...questionData] });
  await prisma.option.createMany({ data: [...optionsData] });
}

export async function clearSeed() {
  await prisma.admin.deleteMany({});
  await prisma.option.deleteMany({});
  await prisma.question.deleteMany({});

  await prisma.quiz.deleteMany({});

  const res = await prisma.subject.deleteMany({});

  console.log("delete : res : ", res);
  return 0;
}
