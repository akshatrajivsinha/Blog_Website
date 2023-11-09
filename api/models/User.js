const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:false
    },
    cover:{
        type:String,
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

module.exports = mongoose.model("Users",UserSchema)