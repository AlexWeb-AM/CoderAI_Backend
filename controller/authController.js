import connectDB from "../config/connectDB.js";
import userModel from "../models/userModel.js";

connectDB();

export const login = async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    res
      .json({ success: false, message: "Name or Email are required" })
      .status(400);
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.json({ success: false, message: "Email is Not defined" }).status(404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        routeId: user.routeId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
