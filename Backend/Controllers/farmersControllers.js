import Farmers from "../models/farmerModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";

const createFarmers = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, mobileNumber, dateOfBirth } = req.body;

    // checking whether anything is left for farmer to enter
    if (!firstname || !lastname || !email || !password || !mobileNumber || !dateOfBirth)
        throw new Error(`Please fill all fields....`);

    //  checking whether farmer is creating account again or not .
    const existFarmer = await Farmers.findOne({ email });
    if (existFarmer) {
        res.status(400).send("User alread exist with this email");

    }

});