import {
  createSubject,
  deleteSubject,
  findBaseSubjectAll,
  findBaseSubjectById,
  findSubSubjectAll,
  findSubSubjectById,
  updateSubject,
} from "../service/subject.service";
import { subjectSchema } from "../types";

import { Request, Response } from "express";

export async function getBaseSubjects(req: Request, res: Response) {
  try {
    const result = await findBaseSubjectAll();

    res.status(200).json({
      result,
      message: "subject get successfull",
    });
  } catch (error) {
    console.log("[SUBJECT_GET_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getBaseSubject(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await findBaseSubjectById(id);

    if (result) {
      res.status(200).json({
        result,
        message: "subject get successfull",
      });
    } else {
      res.status(404).json({
        message: "no record found",
      });
    }
  } catch (error) {
    console.log("[SUBJECT_GET_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addSubject(req: Request, res: Response) {
  try {
    const body = req.body;

    const validation = subjectSchema.safeParse(body);
    if (validation.success) {
      const result = await createSubject(body);

      res.status(200).json({
        message: "subject added successfull",
        result,
      });
    } else {
      res.status(422).json({ message: validation.error?.format() });
    }
  } catch (error) {
    console.log("[SUBJECT_CREATE_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeSubject(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (id) {
      const result = await deleteSubject(id);

      res.status(200).json({
        message: "subject deleted successfull",
      });
    } else {
      res.status(422).json({ message: "subject id missing !!" });
    }
  } catch (error) {
    console.log("[SUBJECT_DELETE_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function modifySubject(req: Request, res: Response) {
  try {
    const body = req.body;
    const id = Number(req.params.id);

    const validation = subjectSchema.safeParse(body);
    if (validation.success && id) {
      const result = await updateSubject(body, id);

      res.status(200).json({
        message: "subject updated successfull",
      });
    } else {
      res.status(422).json({ message: validation.error?.format() });
    }
  } catch (error) {
    console.log("[SUBJECT_MODIFY_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSubSubjects(req: Request, res: Response) {
  try {
    const result = await findSubSubjectAll();

    res.status(200).json({
      result,
      message: "Sub subject get successfull",
    });
  } catch (error) {
    console.log("[SUBJECT_GET_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSubSubject(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await findSubSubjectById(id);

    if (result) {
      res.status(200).json({
        result,
        message: "subject bt id  get successfull",
      });
    } else {
      res.status(404).json({
        message: "no record found",
      });
    }
  } catch (error) {
    console.log("[SUBJECT_GET_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
