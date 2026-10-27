import AuditEvent from '../models/AuditEvent.js';
export async function audit(req,action,entityType,entityId='',details={}){try{await AuditEvent.create({actor:req.session?.userId,action,entityType,entityId,details});}catch(err){console.error('Audit event could not be recorded:',err.message);}}
