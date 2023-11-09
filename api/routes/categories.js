const router = require("express").Router();
const Category = require("../models/Category");

//POST

router.post("/", async (req,res)=>{
    const newpost = new Category(req.body);
    try{
        const setpost = await newpost.save();
        res.status(200).json(setpost);
    }catch(err){
        res.status(500).json(err);
    }
})

//GET

router.get("/", async (req,res)=>{
    try{
        const cats = await Category.find();
        res.status(200).json(cats);

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router 