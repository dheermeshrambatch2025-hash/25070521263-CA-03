import mongoose from 'mongoose';
const schema=new mongoose.Schema({number:{type:Number,required:true,unique:true,min:1},seats:{type:Number,required:true,min:1,max:20},status:{type:String,enum:['available','occupied','reserved','cleaning'],default:'available'},area:{type:String,default:'Main dining'}});
export default mongoose.model('Table',schema);
