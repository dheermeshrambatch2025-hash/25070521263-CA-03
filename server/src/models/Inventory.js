import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxlength:100},unit:{type:String,required:true,default:'units'},quantity:{type:Number,required:true,min:0},lowStockAt:{type:Number,required:true,min:0,default:5},updatedAt:{type:Date,default:Date.now}});
export default mongoose.model('Inventory',schema);
