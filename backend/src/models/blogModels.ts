import { InferSchemaType, Schema, model } from "mongoose";

const blogModel = new Schema(
  {
    heading: { type: String, required: true },
    blog: { type: String, required: true },
    author: { type: String, required: true },
    featured: { type: Boolean },
    image: { type: String },
    author_id: { type: String, required: true },
    category: [{ type: String }],
  },
  { timestamps: true }
);
type Blog = InferSchemaType<typeof blogModel>;
export default model<Blog>("Blog", blogModel);
