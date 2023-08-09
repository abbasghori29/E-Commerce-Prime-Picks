import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        //valiadtion
        if (!name) {
            res.send({ message: "Name is required" })
        }
        if (!email) {
            res.send({ message: "email is required" })
        }
        if (!password) {
            res.send({ message: "password is required" })
        }
        if (!phone) {
            res.send({ message: "phone is required" })
        }
        if (!address) {
            res.send({ message: "address is required" })
        }
        if (!answer) {
            res.send({ message: "Answer is required" })
        }

        // check user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Registerd please login"
            })
        }

        //registerUser
        const hashedPassword = await hashPassword(password)
        //save

        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save()
        res.status(201).send({
            success: true,
            message: "Registered Successfully",
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in registeration",
            error
        })
    }
}

// POST Login

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid E-mail or Password"
            })
        }
        //check user
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "E-mail is not registered"
            })
        }

        const match = await comparePassword(password, user.password)

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        //token
        const token = await jwt.sign({ _id: user._id }, process.env.jwt_secret, {
            expiresIn: "7d", //token expiry time
        });

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error

        })
    }

}
//FORGOT PASSWORD CONTROLLER

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "E-mail is requires" })
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "Password is required" })
        }
        //check from database
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong E-mail or Answer",
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reseted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error,
        })
    }

}



// update user Profile Controller
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            email: email || user.email,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
        },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something Went Wrong In Updating Category",
            error,
        })
    }
}