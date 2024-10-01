const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

//Sign-up
router.post("/sign-up", async (req, res) => {
    try{
        const {username, email, password} = req.body;

         if(!username || !email || !password){
            return res.status(400).json({message: "All fields required"})
         }

         if(username.length < 5){
            return res.status(400).json({message: "Username must be at least 5 characters"});
         }

         if(password.length < 5){
            return res.status(400).json({message: "Password must be at least 5 characters"});
         }

         const existingEmail = await User.findOne({email});
         const exsistingUser = await User.findOne({username});
         if(existingEmail || exsistingUser){
            return res.status(400).json({message: "Username or email already exits"});
         }


         const hashPath = await bcrypt.hash(password, 10)
         const newUser = new User({username: username, password: hashPath, email: email})
         await newUser.save();
         return res.status(201).json({message: "User created successfully"})

    }catch(e){
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
})

//sign-in
router.post("/sign-in", async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields required"})
         }

        const exsistingUser = await User.findOne({email})
        if(!exsistingUser){
            return res.status(400).json({message: "Email does't exists"})
        }

        const isMatchPassword = await bcrypt.compare(password, exsistingUser.password)
        if(!isMatchPassword){
            return res.status(400).json({message: "Password did not matched !!"})
        }

        const token = jwt.sign({id: exsistingUser._id, email: exsistingUser.email}, process.env.JWT_SECRET, {expiresIn: "30d"})
        res.cookie("podcasterUserToken", token, {
            httpOnly: true,             // Prevents access via JavaScript on the client side
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
            secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
            sameSite: "None",           // Allows cross-site requests (required for cross-origin cookie)
          });

        return  res.status(201).json({id: exsistingUser._id, username:exsistingUser.username, email: exsistingUser.email, message: "Sign in successfully"})


    }catch(e){
        console.log(e);
        res.status(500).json({ message: "User not found" });
    }
})

//log-out
router.post("/log-out", async (req, res) => {
    res.clearCookie("podcasterUserToken", {httpOnly: true});
    return res.status(200).json({message: "Logged out successfully"})
})

//check if cookie present or not
router.get("/check-cookie", async (req, res) => {
    const token = req.cookies.podcasterUserToken;
    if(token){
        return res.status(200).json({message: true})
    }
    return res.status(200).json({message: false})
})

//get user details
router.get("/get-user", authMiddleware, async (req, res) => {
    try {
        const { email } = req.user;
        const exsistingUser = await User.findOne({ email }).select("-password"); // Await the async operation
        if (!exsistingUser) {
            return res.status(404).json({ message: "User not found" }); // Handle case where user is not found
        }
        return res.status(200).json({ user: exsistingUser });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server Error" });
    }
});



module.exports = router;