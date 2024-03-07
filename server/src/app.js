import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  console.log("Id", socket.id);

  const preWrittenMessages = [
    "Hi there! ",
    "I'm Wysa - an AI chatbot built by therapists",
    "I'm here to understand your concerns and connect you with the best resources available to support you",
    "Can I help you?",
  ];

  let messageIndex = 0;

  const sendMessageWithDelay = () => {
    if (messageIndex < preWrittenMessages.length) {
      socket.emit("welcome", preWrittenMessages[messageIndex]);
      messageIndex++;
    }

    if (messageIndex < preWrittenMessages.length) {
      setTimeout(sendMessageWithDelay, 1000);
    }
  };

  sendMessageWithDelay();

  socket.on("userMessage", (recievedInput) => {
    setTimeout(() => {
      io.emit("userText", recievedInput);
    }, 1000);
  });
});
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
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

export { app, server };
