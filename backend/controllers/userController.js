const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        const error = new Error("All fields are required");
        error.statusCode = 400;

        throw error;
    }

    if (password !== confirmPassword) {
        const error = new Error("Password doesn't match");
        error.statusCode = 400;

        throw error;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 400;

        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(user._id);

    res.status(201).json({
        success: true,
        message: "User created",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error("Email and Password are required");
        error.statusCode = 400;

        throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("Invalid Credentials");
        error.statusCode = 401;

        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error("Invalid Credentials");
        error.statusCode = 401;

        throw error;
    }

    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
});

const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;

        throw error;
    }

    // user.resetPasswordToken = Math.random().toString(36).substring(2);
    const token = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    user.resetPasswordToken = token;
    user.resetPasswordExpires = resetPasswordExpires;

    await user.save();

    await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        message: `
        <h2>You requested a password reset</h2>
        <p>Click below to reset your password</p>
        <a href ="${resetUrl}" target="_blank">Reset Password</a>
        <p>This link will expire soon</p>
        `
    })

    res.status(200).json({
        success: true,
        message: "Password reset email sent"
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { resetPasswordToken, newPassword, confirmNewPassword } = req.body;

    if (!resetPasswordToken || !newPassword || !confirmNewPassword) {
        const error = new Error("All fields are required");
        error.statusCode = 400;

        throw error;
    }

    if (newPassword !== confirmNewPassword) {
        const error = new Error("Passwords doesn't match");
        error.statusCode = 400;

        throw error;
    }

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        const error = new Error("No token or token expired");
        error.statusCode = 401;

        throw error;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password Updated"
    })

});

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}