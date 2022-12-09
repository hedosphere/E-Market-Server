import mongoose from "mongoose";

const { Schema } = mongoose;

const productModel = new Schema(
  {
    name: {
      type: String,
      require: [true, "Name is require   "],
      trim: true,
    },

    price: {
      type: Number,
      require: [true, "Price is require   "],
      default: 0.0,
    },
    description: {
      type: String,
      require: [true, "Description is require   "],
    },

    image: [
      {
        public_id: {
          type: String,
        },
        url: { type: String },
      },
    ],

    category: {
      type: [String],
      enum: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Phones",
        "Accessories",
        "Headphone",
        "Foods",
        "Books",
        "Sports",
        "Homes",
        "Outdoors",
      ],
      default: ["Homes"],
    },

    sellers: {
      type: String,
      require: [true, "Sellers is require   "],
    },
    stock: {
      type: Number,
      require: [true, "Stock Quantity is required"],
    },

    noOfReviews: {
      type: Number,
      default: 0,
    },

    ratings: {
      type: Number,
      default: 1.0,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "User",
      require: [true, "User is required"],
    },

    review: [
      {
        user: {
          type: mongoose.ObjectId,
          ref: "User",
        },

        rating: {
          type: Number,
          default: 0,
        },

        comment: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productModel);
