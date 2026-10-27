import mongoose from 'mongoose';
const schema=new mongoose.Schema({actor:{type:mongoose.Schema.Types.ObjectId,ref:'User'},action:{type:String,required:true},entityType:{type:String,required:true},entityId:{type:String,default:''},details:{type:mongoose.Schema.Types.Mixed,default:{},select:false},createdAt:{type:Date,default:Date.now,index:true}});
export default mongoose.model('AuditEvent',schema);
