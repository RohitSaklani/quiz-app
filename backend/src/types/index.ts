import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  name: z.string().min(5),
});

export const subjectSchema = z.object({
  name: z.string().min(2),
  subject_id: z.number(),
});

export type SubjectType = z.infer<typeof subjectSchema>;

export const quizSchema = z.object({
  name: z.string().min(1),
  level: z.number().min(1),
  subject_id: z.number().min(1),
});

export type QuizType = z.infer<typeof quizSchema>;

export const QuestionSchema = z.object({
  question: z.string().min(1),

  quiz_id: z.number().min(1),
});

export type QuestionType = z.infer<typeof QuestionSchema>;

export const OptionSchema = z.object({
  description: z.string().min(1),
  isRight: z.boolean(),
  question_id: z.number().min(1),
});

export type OptionType = z.infer<typeof OptionSchema>;
