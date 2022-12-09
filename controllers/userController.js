//
import formidable from "formidable";
import cloudinary from "cloudinary";
import slugify from "slugify";
import User from "../model/userModel";
import { ComparePassword, HashPassword } from "../utils/Hashings";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { RandomNumber } from "../utils/randomText";
// "./utils/randomText";

// const nanoid = require("nanoid");
//

//

cloudinary.config({
  cloud_name: "dtewqiozx",
  api_key: "731148955343977",
  api_secret: "_nl2TUEbbZ-H21Whn3LOJfjvrSo",
});

//

//

//

//
export const EditPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // console.log("req.body", newPassword);
    if (!oldPassword) return res.status(400).send("Old Password required.");
    if (!newPassword || newPassword.length < 6) {
      return res
        .status(400)
        .send("New Password required. must not less than 6 character");
    }

    const user = await User.findById({ _id: req.auth._id })
      // .select("-passwordResetCode")
      // .select("-password")
      .exec();

    const match = await ComparePassword(oldPassword, user.password);
    if (!match) return res.status(400).send("Wrong Password");

    const hashPassword = await HashPassword(newPassword);

    user.password = hashPassword;

    await user.save();
    console.log(user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

//

///

//

//

//

export const EditUser = async (req, res) => {
  try {
    let image = {};

    const myForm = formidable();
    myForm.parse(req, async (err, fields, files) => {
      let { name, email, oldImageId } = fields;

      const userExist = await User.findOne({ _id: req.auth._id }).exec();
      if (!userExist) return res.status(400).send("Please Login First");

      if (!name) name = userExist.name;
      if (!email) email = userExist.email;

      if (oldImageId) {
        // image did not changed

        image = userExist.image;
      } else {
        // image changed

        cloudinary.v2.uploader.destroy(userExist.image[0].public_id);

        const { newImage } = files;
        // console.log("edit user no oldImageId", oldImageId);
        const cloudinaryImage = await cloudinary.v2.uploader.upload(
          newImage.filepath,
          {
            public_id: slugify(name) + "-" + newImage.newFilename,
            folder: "HedoShop/User",
            width: 200,
            crop: "scale",
          }
        );
        image = {
          url: cloudinaryImage.url,
          public_id: cloudinaryImage.public_id,
        };
      }

      const user = await User.findByIdAndUpdate(
        { _id: req.auth._id },
        {
          name,
          email,
          image,
        },
        { new: true }
      ).exec();

      // return;

      console.log(user);
      return res.json({ ok: true, user });
    });
  } catch (err) {
    console.log(err);
  }
};

//

//

//

//
export const Logout = async (req, res) => {
  // console.log("logout");
  res.clearCookie("token");

  return res.json({ ok: true });
};

//
export const PasswordResetCode = async (req, res) => {
  //
  try {
    const randomNumber = RandomNumber();
    // console.log(randomNumber);
    const { email } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) return res.status(400).send("Email not found ");

    //
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        pass: process.env.NODEMAILER_GMAIL_PASSWORD,
        user: process.env.NODEMAILER_GMAIL_EMAIL,
      },
    });
    //  Application-specific password required. Learn more at
    const details = {
      from: process.env.NODEMAILER_GMAIL_EMAIL,
      to: email,
      subject: "Passord reset code",
      // text: { html: 1234 },
      html: `
    
    <div style='text-align:center;
    font-size:30px;
    background:black;
    padding-top:9px;
    padding-bottom:9px;
    color:red;
    '>
    ${randomNumber}
    </div>
    
    `,
    };

    transporter.sendMail(details, (err, data) => {
      if (err) {
        res.status(400).send("Not ok");
      } else {
        user.passwordResetCode = randomNumber;
        user.save({ validateBeforeSave: false });
        res.json({ ok: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
  //
};

//
export const PasswordReset = async (req, res) => {
  try {
    const { email, code, password } = req.body;
    const hashPassword = await HashPassword(password);
    //
    if (!code || code.length < 4) {
      res.status(400).send("Wrong code ");
    }

    if (!password || password.length < 6) {
      res.status(400).send("Wrong Password combination");
    }
    if (!email) {
      res.status(400).send("Email is required ");
    }
    // console.log;
    const user = await User.findOneAndUpdate(
      { email, passwordResetCode: code },
      {
        password: hashPassword,
        passwordResetCode: "",
      },
      { new: true }
    ).exec();

    //
    console.log("PasswordReset", user);

    //
    res.json({ ok: true });

    //
  } catch (err) {
    console.log(err);
    res.status(400).send("not ok");
  }
};

//

export const MyAccount = async (req, res) => {
  //
  try {
    const user = await User.findById({ _id: req.auth._id })
      .select("-passwordResetCode")
      .select("-password")
      .exec();
    if (!user) return;

    return res.json({ ok: true, user });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Login First");
  }
};
//

//

export const Login = async (req, res) => {
  //
  try {
    // console.log("Login user", req.body);
    const { email, password } = req.body;
    if (!email) return res.status(400).send("Email is required");
    if (!password) return res.status(400).send("Password is required");
    const user = await User.findOne({ email }).exec();

    if (!user) return res.status(400).send("Wrong Email");

    const match = await ComparePassword(password, user.password);
    // console.log(match, " HashPassword", hashPassword);
    // return;
    if (!match) return res.status(400).send("Wrong Password");

    user.password = undefined;

    const token = jwt.sign({ _id: user._id }, process.env.EXPRESS_JWT_SECRET, {
      expiresIn: "10h",
    });
    res.cookie("token", token);
    return res.json({ ok: true, user, message: "Welcome " + user.name });
  } catch (err) {
    console.log(err);
  }
};

//

//

export const Register = async (req, res) => {
  try {
    // const myForm = new formidable.IncomingForm();
    const myForm = formidable();
    myForm.parse(req, async (err, fields, files) => {
      const { name, email, password } = fields;
      const { image } = files;
      if (!name) return res.status(400).send("Name is required");
      if (!email) return res.status(400).send("Email is required");
      if (!password) return res.status(400).send("Password is required");
      //image.filepath = path/image , new name=image.newFilename

      const userExist = await User.findOne({ email }).exec();

      if (userExist) return res.status(400).send("Email is taken");

      // cloudinary.v2.uploader.destroy(
      //   "HedoShop/Kingdom-Johowar-78f14a2d49ebcbce3f0dcac00"   = public_id
      // );

      const cloudinaryImage = await cloudinary.v2.uploader.upload(
        image.filepath,
        {
          public_id: slugify(name) + "-" + image.newFilename,
          folder: "HedoShop/User",
          width: 200,
          crop: "scale",
        }
      );
      //  cloudinaryImage.url = image name; cloudinaryImage.public_id = db38a7a46c470db960aa9a300
      const hashPassword = await HashPassword(password);
      const user = new User({
        name,
        email,
        password: hashPassword,
        image: {
          url: cloudinaryImage.url,
          public_id: cloudinaryImage.public_id,
        },
      });

      await user.save();
      // console.log(user);
      return res.json({ ok: true, message: "Registration Complete" });
    });
  } catch (err) {
    console.log(err);
  }
};
