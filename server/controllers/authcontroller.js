import { deleteUser, findAllUsers, getUser, loginUser, registerUser, updateUser } from "../service/authservice.js";
import { ApiResponse } from "../utils/ApiResponse.js"; // Assuming this is a custom response handler
import { ApiError } from "../utils/ApiError.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await registerUser(username, email, password);
        res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const fetchUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await getUser(email);
        res.status(200).json({ message: "User found", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if (!email) {
            throw new Error("Email is required");
        }

        const updates = { name, password };
        const user = await updateUser(email, updates);
        res.status(200).json({ message: "User updated", user });
    } catch (error) {
        res.status(400).json({ message: "Error updating user", error: error.message });
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const {email} = req.body;
        const result = await deleteUser(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

export const fetchAllUser = async (req, res) => {
    try {
        const users = await findAllUsers();
        res.status(200).json({users});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
