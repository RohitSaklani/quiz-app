import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(1, { message: "password is required" }),
});

export type LoginType = z.infer<typeof LoginSchema>;
export type LoginErrorType = z.inferFormattedError<typeof LoginSchema>;

export const SignupSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(1, { message: "password is required" }),
  name: z.string(),
});

export type SignupType = z.infer<typeof LoginSchema>;
export type SignupErrorType = z.inferFormattedError<typeof LoginSchema>;

export const BaseSubjectSchema = z.object({
  name: z.string().min(1, { message: "subject is required" }),
});

export type BaseSubjectType = z.infer<typeof BaseSubjectSchema>;
export type BaseSubjectErrorType = z.inferFormattedError<
  typeof BaseSubjectSchema
>;

export const SubSubjectSchema = z.object({
  name: z.string().min(1, { message: "subject name is required" }),
  subject: z.string().min(1, { message: "base subject is required" }),
});

export type SubSubjectType = z.infer<typeof SubSubjectSchema>;
export type SubSubjectErrorType = z.inferFormattedError<
  typeof SubSubjectSchema
>;

export const QuizSchema = z.object({
  name: z.string().min(1, { message: "Quiz Name is required" }),
  level: z.string().min(1, { message: "level is required" }),
  subject: z.string().min(1, { message: "subject is required" }),
});

export type QuizType = z.infer<typeof QuizSchema>;
export type QuizErrorType = z.inferFormattedError<typeof QuizSchema>;

export const level = [
  { label: "easy", value: 1 },
  { label: "medium", value: 2 },
  { label: "hard", value: 3 },
];

export const levelArr = ["easy", "medium", "hard"];

export const optionNumber = ["A", "B", "C", "D", "a", "b", "c", "d"];

export const QuestionSchema = z.object({
  question: z.string().min(1, { message: "question  is required" }),
  option1: z.string().min(1, { message: "option A is required" }),
  option2: z.string().min(1, { message: "option B is required" }),
  option3: z.string().min(1, { message: "option C is required" }),
  option4: z.string().min(1, { message: "option D is required" }),
  isRight: z.number().min(1, { message: "mark the right answer" }),
});

export type QuestionType = z.infer<typeof QuestionSchema>;
export type QuestionErrorType = z.inferFormattedError<typeof QuestionSchema>;
