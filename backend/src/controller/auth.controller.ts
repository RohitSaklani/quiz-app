import { loginSchema, signupSchema } from "../types";
import prisma from "../db/db";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../service/auth.service";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const validation = loginSchema.safeParse(body);
    if (validation.success) {
      const result = await findUserByEmail(body.email);
      if (result) {
        const isMatch = bcrypt.compareSync(body.password, result.password);

        if (isMatch) {
          const token = jwt.sign(
            {
              user: { email: result.email, id: result.id, name: result.name },
            },
            process.env.JWT_KEY || "qwerty",
            { expiresIn: process.env.JWT_EXPIRE }
          );
          res.json({
            token,
            user: { email: result.email, id: result.id, name: result.name },
            message: "login successfull",
          });
        } else {
          res.status(401).json({ error: "incorrect password" });
        }
      } else {
        res.status(404).json({ error: "user not found! Please signup" });
      }
    } else {
      res.status(422).json({ error: validation.error?.format() });
    }
  } catch (error) {
    console.log("[LOGIN_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const validation = signupSchema.safeParse(body);
    if (validation.success) {
      const result = await findUserByEmail(body.email);
      if (result) {
        res
          .status(409)
          .json({ message: "User already registered! Please login" });
      } else {
        const hashedPassword = await bcrypt.hash(body.password, 8);
        const result = await createUser({
          ...validation.data,
          password: hashedPassword,
        });

        const token = jwt.sign(
          {
            user: { email: result.email, id: result.id, name: result.name },
          },
          process.env.JWT_KEY || "qwerty"
        );
        res.json({
          token,
          user: { email: result.email, id: result.id, name: result.name },
          message: "signup successfull",
        });
      }
    } else {
      res.status(422).json({ message: validation.error?.format() });
    }
  } catch (error) {
    console.log("[SIGNUP_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;

    if (headers.token) {
      const token = Array.isArray(headers.token)
        ? headers.token[0]
        : headers.token;
      const user = jwt.verify(
        token,
        process.env.JWT_KEY || "qwerty",
        (err, user) => {
          if (err) {
            res.status(401).json({
              success: false,
              message: "Unauthorized",
              error: err?.name,
            });
          } else {
            res
              .status(200)
              .json({ success: true, user, message: "JWT token verified" });
          }
        }
      );
    } else {
      res.status(401).json({ message: "JWT token missing" });
    }
  } catch (error) {
    console.log("[VERIFY_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
