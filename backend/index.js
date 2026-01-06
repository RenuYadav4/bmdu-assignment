import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js"
import { protect } from "./authMiddleware.js";

dotenv.config();
connectDb(process.env.MONGO_URI);

const app = express()
const PORT =  process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:5173",

]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
   
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/product",protect, productRouter);
app.listen(PORT,()=>console.log(`server running on the port ${PORT}`));
