import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./model/User.model.js"; // Updated import to match the correct path and file extension
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {deleteUsers, fetchAllUser, fetchUser, login, register, update } from "./controllers/authcontroller.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// mongoose.connect(process.env.MONGO_URI) // Using IPv4 address explicitly
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((error) => console.error("Could not connect to MongoDB:", error));

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB connection failed !!!", err);
})

app.post("/register", register)
app.post("/login", login)
app.get("/fetchuser", fetchUser)
app.put("/update", update)
app.delete("/delete", deleteUsers)
app.get("/findall", fetchAllUser)



// app.post("/register", async (req, res) => {
//     try {
//         const {name, email, password} = req.body;

//         const existedUser = await User.findOne({email});
//         if(existedUser){
//             return res.status(400).json({message: "User already exists."});
//         }

//         //hased the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         //create the user
//         const user = await User.create({name, email, password: hashedPassword});

//         res.status(200).json(user);

//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// app.get("/login", async (req, res) => {
//     try{
//         const { email, password } = req.body;
//         const user = User.findOne({email: email});
//         if(user){
//             if(user.password===password && user.email==email){

//             }
//         }
//     }
// })

//const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//     console.log("Server is running on port 3001");
// });

