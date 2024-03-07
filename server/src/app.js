import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "process.env.CORS_ORIGIN",
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import routes
import userRouter from "./routes/user.routes.js";

//routes declare
app.use("/api/v1/users", userRouter);
app.get("/", (req, res) => {
  res.send("heeloo");
});

export { app };
