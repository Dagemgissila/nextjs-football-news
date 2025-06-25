import { model, models, Schema, Types } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  image?: string;
  categories: Types.ObjectId;
  tags?: Types.ObjectId[];
  author: Types.ObjectId;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    categories: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Post = models?.Post || model<IPost>("Post", PostSchema);

export default Post;
