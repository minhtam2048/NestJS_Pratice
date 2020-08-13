import * as mongoose from 'mongoose';
import { isEmail } from 'class-validator';


export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 6,
    maxlength: 20,
    required: true,
    uniqued: true,
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 50,
    required: true,
    unique: true,
    validate: [isEmail, 'please input a valid email address']
  },
  password: {
    type: String,
    maxlength: 100,
    required: true,
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
