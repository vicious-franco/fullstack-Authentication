import { UserModel } from "../models/userModels.js";

export const getUserData = async (req, res) => {
  const { id } = req.userId;

  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};
