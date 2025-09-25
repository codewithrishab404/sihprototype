// Packages
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 5000 }));
app.use(cookieParser());
app.use(cors()); // Allow all origins (for development)

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GeminiAPIKey);

// Route for AI crop recommendation
app.post("/getresponse", async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // System prompt for crop recommendation
        const systemPrompt = `
You are an experienced agricultural expert for Indian farmers.
Based on the farmer's input about location, soil type, and budget, provide 3–5 crop recommendations that are:
- Suitable for the local climate and soil
- Economically viable within the budget
- Seasonal crops preferred
- Written in simple language, mixing Hindi + English, understandable by farmers
- Presented as short bullet points
`;

        const result = await model.generateContent({
            contents: [
                {
                    role: "model",
                    parts: [{ text: systemPrompt }]
                },
                {
                    role: "user",
                    parts: [{ text: req.body.question }]
                }
            ]
        });

        // Send AI response back to client
        res.json({ response: result.response.text() });
    } catch (err) {
        console.error("Error in /getresponse:", err);
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
