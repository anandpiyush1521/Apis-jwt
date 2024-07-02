import bcrypt from "bcrypt";
import { User } from "../model/User.model.js";
import logger from "../logger.js";
import { ApiError } from "../utils/ApiError.js";



const generateAccessAndRefreshToken = async function(userId){
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false });

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
        
    }
}


export const registerUser = async (username, email, password) => {
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
        username: username.toLowerCase(),
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
    // Check if user is registered or not using email
    logger.info(`Checking if user is registered with email: ${email}`);
    const user = await User.findOne({ email });
    if (!user) {
        logger.warn(`User not found with email: ${email}`);
        throw new Error("User not found");
    }

    // Check if password is valid or not
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        logger.error("Invalid password")
        throw new Error("Invalid password");
    }
    logger.info(`user found with email: ${email}`)
    return user;
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