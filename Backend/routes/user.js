const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");  // Import the User model correctly
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const {middleware} = require("../middleware");
// Zod schema for signup validation
const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
});

// Signup route
router.post("/signup", async (req, res) => {
    // Validate the request body using Zod
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({
            username: req.body.username
        });

        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            });
        }

        // Create a new user
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });
        
        const userId = user._id;

        //Create new account 
        await Account.create({
            userId,
            balance : Math.floor(Math.random() * 10000) + 1
        })

        // Sign the JWT token
        const token = jwt.sign({ userId }, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// Zod schema for signin validation
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

// Signin route
router.post("/signin", async (req, res) => {
    // Validate the request body using Zod
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    try {
        // Find the user by username and password
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);

            res.json({
                token: token
            });
        } else {
            res.status(411).json({
                message: "Error while logging in"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

//put request
const updateBody = zod.object({
	password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

router.put('/', middleware, async(req, res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg : "Error while updating the information"
        })
    }
    await User.updateOne(
        { id: req.userId }, // Filter by user Id
        { 
            $set: {
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
        } // Update the document with the new data
    );
    
    res.json({
        msg : "Updated Successfully"
    })
})

router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter ? req.query.filter.trim() : "";
        const user = await User.find({
            $or: [
                {
                    firstname: { "$regex": filter, "$options": "i" } // Case-insensitive search
                },
                {
                    lastname: { "$regex": filter, "$options": "i" } // Case-insensitive search
                }
            ]
        });

        res.json({
            user: user.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "An error occurred while fetching users." });
    }
});

module.exports = router;
