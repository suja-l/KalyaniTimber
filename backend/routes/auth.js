const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "ktm_secret_key",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
});

// ROUTE 1: Request Password Reset (Sends Email)
router.post("/forgot-password-request", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    // Create a temporary token valid for 15 minutes
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "ktm_secret_key",
      { expiresIn: "15m" }
    );

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Kalyani Timber - Password Reset Request",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Password Reset</h2>
          <p>You requested a password reset. Click the button below to set a new password. This link expires in 15 minutes.</p>
          <a href="${resetUrl}" style="background: #92400e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Reset link sent to your email!" });
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
});

// ROUTE 2: Verify Token and Update Password
router.post("/reset-password-final", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "ktm_secret_key");
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user in database
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(400).json("Invalid or expired reset token.");
  }
});

module.exports = router;