import express from "express";
import { clearSeed, seed } from "./db/seed";
import authRoute from "./routes/auth.route";

import { authVerification } from "./middleware";
import cors from "cors";

var app = express();
app.use(cors({ origin: process.env.ALLOW_ORIGIN }));

app.use(express.json());

app.use("/auth", authRoute);

const server = app.listen(process.env.PORT || 3000, async () => {
  await clearSeed();
  seed();
});

app.get("/", authVerification, (req, res) => {
  res.json("api route /");
});

process.on("SIGINT", () => {
  server.close(async () => {
    console.log("Server has been shut down SIGINT");

    process.exit(0); // Exit the process
  });
});

process.on("SIGTERM", () => {
  console.log("Server ", server);
  server.close(() => {
    console.log("Server has been shut down SIGTERM");
    process.exit(0); // Exit the process
  });
});
