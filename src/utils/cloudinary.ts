import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (path: string) => {
  try {
    if (!path) return null;
    const res = await cloudinary.uploader.upload(path, {
      resource_type: "auto",
    });
    console.log("FILE UPLOADED ON CLOUDINARY");
    return res.secure_url;
  } catch (error) {
    fs.unlinkSync(path); //delete file
    console.log(error);
  }
};
