import mongoose from "mongoose";

const { Schema } = mongoose;

const userModel = new Schema(
  {
    name: {
      type: String,
      require: [true, "Name is require   "],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "Email is require   "],
      trim: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      require: [true, "Email is require   "],
      min: 6,
      max: 300,
      // select: false,
    },

    role: {
      type: [String],
      enum: ["User", "Seller", "Admin"],
      default: ["User"],
    },

    product: {
      type: mongoose.ObjectId,
      ref: "Product",
    },

    passwordResetCode: "",

    image: [{}],
  },
  { timestamps: true }
);

export default mongoose.model("User", userModel);
// module.exports = mongoose.model("User", userModel);
