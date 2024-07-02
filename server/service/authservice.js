import bcrypt from "bcrypt";
import { User } from "../model/User.model.js";
import logger from "../logger.js";

export const registerUser = async (name, email, password) => {
    // Check if user already exists
    logger.info(`Checking if user already exists with email: ${email}`);
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        logger.warn(`User already exists with email: ${email}`);
        throw new Error("User already exists.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword });

    return user;
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