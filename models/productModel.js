import mongoose from "mongoose";
const productSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
},
slug:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
category:{
    type:mongoose.ObjectId,
    ref:"Category",  // giving refrence of category model so that the product and category is linked
    required:true
},
quantity:{
    type:Number,
    required:true
},
photo:{
    data:Buffer, // buffer is a type to store image or file
    contentType:String
},
shipping:{
    type:Boolean,
}
},{timestamps:true})

export default mongoose.model("Products",productSchema);