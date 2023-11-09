const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Posts");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/register",async(req,res)=>{
    
    try{
        const size = req.body.username.length;
        for( let i=0 ; i<size ; i++){
            if(req.body.username[i] === " ") return(res.status(400).json("No space in Username"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        const saveuser = new User(
           { ...req.body,
            password:hashPass,}
        );
        const rest = await saveuser.save();
        res.status(201).json(rest);
    }catch(err){
        res.status(500).json("error");
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const username = req.params.id
        const user = await User.findOneAndUpdate({username:username},req.body,{new:true});
        res.status(200).json(user);

        
        
    }catch(err){console.log("error")}
})

router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return(res.status(400).json("user not found"))
        const isCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect) return(res.status(400).json("user not found."))
        const token = jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_KEY
        );
        const { password, ...data } = user._doc;
        res.cookie("accessToken",token,{httpOnly:true,}).status(200).send(data)
    }catch(err){
        res.status(500).json("error")
    }
})

router.post("/logout", async (req, res) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  });

router.get("/",async (req,res)=> {
    
    try{
        const user = await User.find()
        res.status(200).json(user)

    }catch(err){
        console.log("error in getting user")
    }
})

router.get("/:username",async (req,res)=> {
    
    try{
        const user = await User.findOne({username:req.params.username})
        res.status(200).json(user)

    }catch(err){
        console.log("error in getting user")
    }
})

router.delete("/:username",async(req,res)=>{
    try{
        await User.deleteOne({username:req.params.username})
        await Post.deleteMany({author:req.params.username})
        res.status(200).json("author deleted")
    }catch(err){res.status(500).json("error")}
})
module.exports = router 