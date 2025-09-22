// Packages
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import farmerRoutes from "./routes/farmersRoutes.js";
dotenv.config();
const port = process.env.PORT || 8000;
connectDB();
const app = express();
app.use(express.json()); // Express dont understand json , so it will convert json data sent by user into JS  object
app.use(express.urlencoded({
    extended: true,
    parameterLimit: 5000,   // parameterLimit will prevent Dos Attack
}));
app.use(cookieParser());
app.use("/api/farmers", farmerRoutes);
app.listen(port, () => console.log(`Server is running on : ${port}`));