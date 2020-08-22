import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply'
    }
  ]
});