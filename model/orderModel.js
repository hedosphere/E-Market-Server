import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderModel = new Schema(
  {
    itemPrice: {
      type: Number,
      require: [true, "itemPrice is require   "],
    },

    taxPrice: {
      type: Number,
      require: [true, "taxPrice is require   "],
    },

    shippingPrice: {
      type: Number,
      require: [true, "shippingPrice is require   "],
    },

    totalPrice: {
      type: Number,
      require: [true, "totalPrice is require   "],
    },

    orderStatus: {
      type: String,
      default: "Proccessing",
    },

    orderItems: [{}],

    shippingInfo: {},

    paymentInfo: {},

    user: {
      type: mongoose.ObjectId,
      ref: "User",
    },

    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderModel);
// module.exports = mongoose.model("User", OrderModel);
