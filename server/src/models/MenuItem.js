import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxlength:100},description:{type:String,default:'',maxlength:500},category:{type:String,required:true,enum:['Starters','Mains','Sides','Desserts','Drinks']},price:{type:Number,required:true,min:0,max:100000},image:{type:String,default:''},available:{type:Boolean,default:true},vegetarian:{type:Boolean,default:false},createdAt:{type:Date,default:Date.now}});
export default mongoose.model('MenuItem',schema);
