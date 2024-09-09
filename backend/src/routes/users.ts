import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import User from "../models/user";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post(
  "/register",
  [
    check("firstName", "First Name is required").trim().isLength({ min: 1 }),
    check("lastName", "Last Name is required").trim().isLength({ min: 1 }),
    check("email", "Email is required").isEmail(),
    check("password", "password must be atleast of 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({ message: error.msg });
      }

      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "user already exist" });
      }

      const hash = await bcrypt.hash(req.body.password, 6);

      user = new User({ ...req.body, password: hash });
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res
        .cookie("booking_auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 86400000,
        })
        .json({ message: "user registered sucessfully" });
    } catch (error) {
      console.log(error, "register error");
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

export default router;
