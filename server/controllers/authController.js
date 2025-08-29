import { UserModel } from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../nodemailer/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(404).json({ success: false, message: "missing details" });
  }

  const checkEmail = await UserModel.findOne({ email: email });

  if (checkEmail) {
    return res.status(404).json({ message: "email already exists" });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ name, email, password: hashedPassword });
      if (!newUser) {
        return res
          .status(500)
          .json({ success: false, message: "Internal error" });
      }
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_KEY, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      console.log(email);
      // sending welcome email
      try {
        const emailOtions = {
          from: process.env.OWNER_EMAIL,
          to: email,
          subject: "welcome to our app",
          text: `hello ${name}, welcome to our app. we are glad to have you on board`,
        };

        await transporter.sendMail(emailOtions, async (err, info) => {
          if (err) {
            return console.log(err.message);
          }
          console.log("email has been sent", info.response);
        });
      } catch (error) {}

      return res.status(200).json({ status: true, data: newUser });
    } catch (err) {
      res.json({ success: false, message: err.message });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "email and password are required" });
  }
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect passoword" });
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const createOtp = async (req, res) => {
  const { id } = req.userId;

  const user = await UserModel.findOne({ _id: id });

  if (user.isAccountVerified) {
    return res
      .status(200)
      .json({ status: false, message: "user already verified" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpireAt = Date.now() + 10 * 60 * 1000;

  // setting options to the user

  user.verifyOtp = otp;
  user.verifyOtpExpireAt = otpExpireAt;
  await user.save();
  const mailOption = {
    from: process.env.OWNER_EMAIL,
    to: user.email,
    subject: "Account verification otp",
    text: `yout OTP is ${otp}. Verify you account with the provided OTP`,
  };

  await transporter.sendMail(mailOption, async (err, info) => {
    if (err) {
      console.log(err.message);
    }
    console.log("email sent succesfully" + info.response);
  });
  res.status(200).json({ status: true });
};

export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const { id } = req.userId;

  try {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res.json({ message: "OTP Expired" });
    }
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// check if user is authentcated
export const isAuthenicated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const resetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(404)
      .json({ success: false, message: "email is required" });
  }
  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = resetOtp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();
    res.status(200).json({ success: true, message: "otp sent to your email" });

    console.log(user);
    const mailOption = {
      from: process.env.OWNER_EMAIL,
      to: email,
      subject: "password reset otp",
      text: `reset your password by use of this otp ${resetOtp}. make sure don't share it with anyone`,
    };
    await transporter.sendMail(mailOption);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { otp, newPassword, email } = req.body;
  if (!otp || !email || !newPassword) {
    return res.status(404).json({
      success: false,
      message: "Email, new password and OTP are required",
    });
  }
  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.json(404).json({ success: false, message: "user not found" });
    }
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ status: false, message: "Invalid OTP" });
    }
    if (Date.now() > user.resetOtpExpireAt) {
      return res.json({ status: false, message: "otp is expired" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.resetOtpExpireAt = 0;
    user.resetOtp = "";
    await user.save();

    res.status(200).json({ status: true, message: "password reset success" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
