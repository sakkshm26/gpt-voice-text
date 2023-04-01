import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    let token, decoded_data;

      token = req.headers.authorization;
      decoded_data = jwt.verify(token, process.env.JWT_SECRET_KEY);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;
