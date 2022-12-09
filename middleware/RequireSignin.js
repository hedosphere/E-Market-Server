import { expressjwt } from "express-jwt";

export const RequireSignin = expressjwt({
  //

  algorithms: ["HS256"],
  secret: process.env.EXPRESS_JWT_SECRET,
  getToken: (req, res) => req.cookies.token,
});
