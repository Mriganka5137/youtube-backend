import { Schema, model, Document } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
interface IVideo extends Document {
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
  videoFile: string;
  owner: Schema.Types.ObjectId;
  views: number;
  isPublished: boolean;
}

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    videoFile: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);
const Video = model<IVideo>("Video", videoSchema);

export default Video;
