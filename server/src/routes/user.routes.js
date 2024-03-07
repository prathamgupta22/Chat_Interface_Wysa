import { Router } from "express";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({
      status: true,
      message: "Registered user",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not registered" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "honest.pratham11@gmail.com",
        pass: "mxzq aehp lcth zkdr",
      },
    });

    const mailOptions = {
      from: "honest.pratham11@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        return res.json({ status: true, message: "Email sent" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "updated password" });
  } catch (error) {
    return res.json("Invalid token");
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);

    next();
  } catch (error) {
    return res.json(error);
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorized" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});

export default router;
