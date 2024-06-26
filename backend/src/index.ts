import express from "express";
import { clearSeed, seed } from "./db/seed";
import authRoute from "./routes/auth.route";

import { authVerification } from "./middleware";
import cors from "cors";
import subjectRoute from "./routes/subject.route";
import quizsRoute from "./routes/quizs.route";
import quizRoute from "./routes/quizQuestion.route";

var app = express();

const corsOptions = {
  origin: process.env.ALLOW_ORIGIN || "".split(","),
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoute);

const server = app.listen(process.env.PORT || 3000, async () => {
  // await clearSeed();
  // seed();
});

// app.use("/", () => console.log("intercepted route"));

app.use("/subject", authVerification, subjectRoute);

app.use("/quizs", authVerification, quizsRoute);

app.use("/quiz", authVerification, quizRoute);

app.get("/", authVerification, (req, res) => {
  res.json("home route /");
});

process.on("SIGINT", () => {
  server.close(async () => {
    console.log("Server has been shut down SIGINT");

    process.exit(0); // Exit the process
  });
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server has been shut down SIGTERM");
    process.exit(0); // Exit the process
  });
});
