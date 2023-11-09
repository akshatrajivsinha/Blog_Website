const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
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

module.exports = mongoose.model("Category",CategorySchema)