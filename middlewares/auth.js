import jwt from "jsonwebtoken";
import { Doctor } from "../models/doctor.js";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(404).json({
        success: false,
        message: "Login First",
    });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Doctor.findById(decoded._id);
    next();
}