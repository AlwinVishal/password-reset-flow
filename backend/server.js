require("dotenv").config();

const express = require("express");
const cors =require("cors");

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/users", userRouter);

app.use(errorHandler);

const startServer = async () => {

    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server started on Port ${PORT}`);
    });
}

startServer();