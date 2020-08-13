import { Document } from "mongoose";

export interface User extends Document {
  readonly username: String;
  readonly email: String;
  readonly password: String;
  readonly avatar: String;
  readonly date: Date;
}