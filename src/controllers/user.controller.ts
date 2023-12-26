import asyncHandler from "../utils/asyncHandler.js";
import { Request, Response } from "express";

// Register a new user
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({
      message: "Coffee and Mriganka",
    });
  }
);
