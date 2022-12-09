//
import { json } from "body-parser";
import Order from "../model/orderModel";

const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);
//

//

//

export const userOrder = async (req, res) => {
  //
  // console.log("userOrder", req.auth._id);
  try {
    const order = await Order.find({ user: req.auth._id });
    // console.log(order);
    return res.json(order);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

//

//

//

export const createOrder = async (req, res) => {
  // console.log("paid 1 999999999"); shippingIfo

  const {
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderItems,
    shippingInfo,
    paidAt,
    paymentInfo,
  } = req.body;
  console.log(req.body.reference);
  const orderExist = await Order.findOne({
    "paymentInfo.reference": req.body.reference,
  });

  if (orderExist) {
    return res.json({ ok: true });
  }

  const order = new Order({
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderItems,
    shippingInfo,
    paidAt,
    paymentInfo,
    user: req.auth._id,
  });
  await order.save();
  //
  return res.json({ ok: true });
};
//

//

//

export const paystackVerification = async (req, res) => {
  //
  try {
    const { reference } = req.body;

    paystack.transaction.verify(reference, (err, body) => {
      let paidAt = body.data.paidAt;
      let status = body.data.gateway_response; // Successful
      // console.log(body);
      return res.json({ ok: true, paystack: { paidAt, status } });
    });
    return;

    // reference: reference;
  } catch (err) {
    console.log(err);
  }
};

//

//

//
export const paystackUrl = async (req, res) => {
  const { email, price } = req.body;
  const Price = price * 100;
  //   console.log("paySatckUrl", email, Price);
  //   return;
  try {
    const { email, price } = req.body;
    const paystackDetails = await paystack.transaction.initialize({
      amount: Price,
      email,
      callback_url: "http://localhost:3000/shipping/payment",
    });
    // access_code:   reference
    res.json({
      authorization_url: paystackDetails.data.authorization_url,
      access_code: paystackDetails.data.access_code,
      reference: paystackDetails.data.reference,
    });
    console.log("paystackDetails", paystackDetails.data);
  } catch (err) {
    console.log(err);
  }
};
