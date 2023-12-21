import { Schema, model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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

// .pre is used to run a function before the document is saved
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 8);
  next();
});

// .methods is used to add a method to the UserSchema
UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = model<IUser>("User", UserSchema);

export default User;
