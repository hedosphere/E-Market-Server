import User from "../model/userModel";
export const isAdmin = async (req, res, next) => {
  const user = await User.findById({ _id: req.auth._id })
    .select("-password")
    .exec();

  if (user && user.role && !user.role.includes("Admin")) {
    return res.status(401).send("");
  } else next();
};
