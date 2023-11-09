const router = require("express").Router();
const Post = require("../models/Posts");

//GET

router.get("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json("err")
    }
 })

 router.get("/userpost/:id", async (req,res)=>{
    try{
        const post = await Post.find({author:req.params.id})
        res.status(200).json(post)
    }catch(err){
        res.status(500).json("err")
    }
 })

router.get("/",async (req,res)=>{
    const q = req.query;

    const filters = {
        ...(q.search && { title: { $regex: q.search, $options: "i" } })
    }

    try{
        let post;
      

                post = await Post.find(filters).limit(6).sort({createdDate:-1})
                res.status(200).json(post)
         
    }catch(err){
        res.status(500).json("err")
    }
})

//POST

router.post("/",async(req,res)=>{
    const newpost = Post(req.body)

    try{
        const savepost = await newpost.save()
        res.status(200).json(savepost)

    }catch(err){
        res.status(500).json("error occuring")
    }

})




//DELETE POST

router.delete("/:id",async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        await post.deleteOne();
        res.status(200).json("post has been deleted....");
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE POST

router.put("/:id",async (req,res) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set: req.body,},{new:true});
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put("/manyupdate/:id",async (req,res) => {
    try{
        const updatedPost = await Post.updateMany({author:req.params.id},{$set: req.body},{multi:true});
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(500).json(err);
    }
});
     


module.exports = router 
    

