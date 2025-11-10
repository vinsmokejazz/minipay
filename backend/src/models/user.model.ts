import { Schema, model } from "mongoose";
import type { IUser } from "../types/user.interface.js";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 10,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      trim: true,
    },
  },
  { timestamps: true }
);

// indexes for better query performance
userSchema.index({ firstName: 1 });
userSchema.index({ lastName: 1 });




// Instance method for password comparison 
// userSchema.methods.comparePassword = async function(candidatePassword: string):Promise<boolean>{
//   // Compare the input password with the stored hashed password
//   return bcrypt.compare(candidatePassword,this.password);
// }


export const User = model<IUser>("User", userSchema);
