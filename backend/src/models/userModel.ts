import { InferSchemaType, Schema, model } from "mongoose";

const userModel = new Schema(
  {
    name: { type: String, required: [true, "Name is Required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userModel>;
export default model<User>("User", userModel);
