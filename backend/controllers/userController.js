import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
// authentication using jwt token
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },   
        process.env.JWT_SECRET,    
        { expiresIn: "30d" }
    );
};

export const registerUser = async (req, res) => {
    try {
        console.log("Incoming Body", req.body);
        const { name, email, password } = req.body;

         if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password.toString(), salt);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        })

          const { password: _, ...safeUser } = user.toObject();
  
          res.status(201).json({
              ...safeUser,
              token: generateToken(user._id),
          });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatched = await bcrypt.compare(password.toString(), user.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const { password: _, ...safeUser } = user.toObject();

        res.json({
            ...safeUser,
            token: generateToken(user._id),
        });

    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}


