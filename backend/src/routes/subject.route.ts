import express from "express";
import {
  addSubject,
  getBaseSubject,
  getBaseSubjects,
  getSubSubject,
  getSubSubjects,
  modifySubject,
  removeSubject,
} from "../controller/subject.controller";
const subjectRoute = express.Router();

subjectRoute.get("/base", getBaseSubjects);

subjectRoute.post("/base", addSubject);

subjectRoute.get("/base/:id", getBaseSubject);

subjectRoute.delete("/base/:id", removeSubject);

subjectRoute.put("/base/:id", modifySubject);

subjectRoute.get("/sub", getSubSubjects);

subjectRoute.get("/sub/:id", getSubSubject);

subjectRoute.post("/sub", addSubject);

subjectRoute.delete("/sub/:id", removeSubject);

subjectRoute.put("/sub/:id", modifySubject);

export default subjectRoute;
