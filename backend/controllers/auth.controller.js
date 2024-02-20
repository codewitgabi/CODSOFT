import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../mail.config.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User with email already exists" });
    } else if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    await transporter.sendMail({
      from: "Binstores<no_reply@domain.com>",
      to: email,
      subject: "Verify OTP",
      text: "1234",
      html: "<b>1234</b>",
    });

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 3600,
          }
        );
        res.status(200).json({ token });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }
};
