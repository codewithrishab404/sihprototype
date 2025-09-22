import { timeStamp } from "console";
import mongoose from "mongoose";

const farmersSchema = mongoose.Schema({
    firstname: { type: String, required: true, },
    lastname: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false },

}, { timestamps: true });
const Farmers = mongoose.model('Farmers', farmersSchema);