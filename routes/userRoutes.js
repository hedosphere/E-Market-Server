import express from "express";
import {
  Register,
  Login,
  MyAccount,
  Logout,
  PasswordResetCode,
  PasswordReset,
  EditUser,
  EditPassword,
} from "../controllers/userController";
import { isAdmin } from "../middleware/AdminRole";

import { RequireSignin } from "../middleware/RequireSignin";

const route = express.Router();

// "/api/v1/register" v1/user/edit-password
route.get("/logout", Logout);
route.put("/user/edit-password", RequireSignin, EditPassword);
route.put("/user/edit", RequireSignin, EditUser);
route.get("/me", RequireSignin, MyAccount);
route.get("/admin", RequireSignin, isAdmin, MyAccount);
route.post("/user/password-reset", PasswordReset);
route.post("/user/password-reset-code", PasswordResetCode);
route.post("/login", Login);
route.post("/register", Register);

// export default route;
module.exports = route;
