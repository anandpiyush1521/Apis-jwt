import bcrypt from "bcrypt";
import logger from "../logger.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/User.model.js";


const generateAccessAndRefreshToken = async function(userId){
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false });

        return {accessToken, refreshToken};
    } catch (error) {
        logger.warn(error);
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
        
    }
}


export const registerUser = async (username, email, password) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    
    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        logger.warn(`user with this email or username is already registered`);
        throw new ApiError(409, "User with username or email already exists");
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        logger.error("Something went wrong while registering the user");
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return createdUser;

};

export const loginUser = async (email, password) => {
    if (!email) {
        logger.warn("email is required");
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({email: email});

    if (!user) {
        logger.error(`${user} does not exist`);
        throw new ApiError(400, "User does not exist");
    }

    //check password is correct or not
    const isPasswordValid = await user.isPasswordCorrect(password);
    
    if (!isPasswordValid) {
        logger.error("Invalid User Credentials");
        throw new ApiError(400, "Invalid User Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id); // Use await
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    if(loggedInUser){
        logger.info("User logged in successfully");
    }

    return { loggedInUser, accessToken, refreshToken };
};


export const getUser = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

export const updateUser = async (email, updates) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    // Update the user fields
    if (updates.name) {
        user.name = updates.name;
    }
    // if (updates.email) {
    //     user.email = updates.email;
    // }
    if (updates.password) {
        user.password = await bcrypt.hash(updates.password, 10);
    }

    // Save the updated user
    const updatedUser = await user.save();
    return updatedUser;
};

export const deleteUser = async (email) =>{
    const user = await User.findOne({email});
    //if user not found
    if(!user){
        throw new Error("User not found");
    }

    //delete the user
    await User.deleteOne({email});

    return {message : "user delted successfull"};
};

export const findAllUsers = async () => {
    const users = await User.find({});
    return users;
}