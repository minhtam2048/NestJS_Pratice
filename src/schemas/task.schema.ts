import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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
  },
  comments: [
    {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Comment'
    }
  ],
});