import { Document } from "mongoose";

export interface User extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly avatar: string;
  readonly date: Date;
}