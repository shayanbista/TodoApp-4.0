
import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpiration: 3000,
    refreshTokenExpiration: 10000,
  },
};

export default config;
