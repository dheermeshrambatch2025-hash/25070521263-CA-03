import mongoose from 'mongoose';
const schema=new mongoose.Schema({customer:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},name:{type:String,required:true,trim:true,maxlength:80},phone:{type:String,required:true,trim:true,maxlength:25},partySize:{type:Number,required:true,min:1,max:20},dateTime:{type:Date,required:true},notes:{type:String,default:'',maxlength:500},status:{type:String,enum:['requested','confirmed','seated','completed','cancelled'],default:'requested'},createdAt:{type:Date,default:Date.now}});
export default mongoose.model('Reservation',schema);
