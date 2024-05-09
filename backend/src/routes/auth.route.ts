import express from "express";
import { login, signup, verify } from "../controller/auth.controller";

const authRoute = express.Router();

authRoute.get("/", async (req, res) => {
  res.json("get login route");
});

authRoute.post("/login", login);

authRoute.post("/signup", signup);

authRoute.post("/verify", verify);

export default authRoute;
