const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    cover:{
        type:String,
        required:false
    },
    author:{
        type:String,
        required:false,
        unique:false
    },
    categories:{
        type:Array,
        required:false
    },
    createdDate: {
        type: Date,
        default: Date.now
      },
      updatedDate: {
        type: Date,
        default: Date.now
      }

}
);

module.exports = mongoose.model("Posts",PostSchema)