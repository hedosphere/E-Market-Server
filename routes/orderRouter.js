import express from "express";

import { RequireSignin } from "../middleware/RequireSignin";
import { isAdmin } from "../middleware/AdminRole";

import {
  paystackUrl,
  paystackVerification,
  createOrder,
  userOrder,
} from "../controllers/orderController";

const route = express.Router();

///order/geturl
route.post("/order/geturl", paystackUrl);

// payment/getstatus"
route.post("/payment/getstatus", paystackVerification);

//  order/create
route.post("/order/create", RequireSignin, createOrder);

// user/order
route.get("/user/order", RequireSignin, userOrder);

// export default route; GetProducts
module.exports = route;
