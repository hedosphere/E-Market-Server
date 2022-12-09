import express from "express";

import { RequireSignin } from "../middleware/RequireSignin";
import { isAdmin } from "../middleware/AdminRole";

import {
  createProduct,
  GetProducts,
  GetProductDetails,
  createReview,
  DeleteProduct,
} from "../controllers/productControllers";

const route = express.Router();

// "/api/v1/register" Login

//  product-detail/${productId}`);
route.get("/product-detail/:productId", GetProductDetails);
route.get(
  "/admin/product-detail/:productId",
  RequireSignin,
  isAdmin,
  GetProductDetails
);
route.get("/product/all", GetProducts);
route.post("/product/create", RequireSignin, isAdmin, createProduct);

// axios.put(`/api/v1/delete-product/${productId}`);
route.put("/delete-product/:productId", RequireSignin, isAdmin, DeleteProduct);

route.put("/create-review", RequireSignin, createReview);

// export default route; GetProducts
module.exports = route;
