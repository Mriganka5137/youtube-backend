import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  password: string;
  refreshToken: string;
  watchHistory: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: { type: String, required: true, index: true, trim: true },
    avatar: { type: String, required: true },
    coverImage: { type: String },
    password: { type: String, required: [true, "Password is required"] },
    refreshToken: { type: String, required: true },
    watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;
