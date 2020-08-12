import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    minlength: 6,
    maxlength: 100,
    required: true 
  },
  description: 
  { type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
    required: true
  }
});