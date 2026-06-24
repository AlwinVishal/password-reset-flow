const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const error = new Error("Not authorized or no token");
        error.statusCode = 401;

        throw error;
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

    }
    catch (error) {
        const err = new Error("Not auhtorized, token failed");
        err.statusCode = 401;

        throw err;
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        const error = new Error("No user found");
        error.statusCode = 401;

        throw error;
    }

    req.user = user;

    next();
});

module.exports = protect;