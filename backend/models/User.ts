import {
  Document,
  Model,
  model,
  Types,
  Schema,
  Query,
  HydratedArraySubdocument,
  HydratedDocument,
} from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserModel } from "../types/custom/user";
const SALT_WORK_FACTOR = 5;

const UserSchema = new Schema<IUser, IUserModel>({
  name: String,
  email: String,
  password: String,
  gender: String,
  isDeleted: Boolean,
  // approvalStatus: {
  //   enum: ["approved", "rejected", "pending"],
  //   default: "pending",
  // },
},{timestamps:true});

UserSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  const currentPassword = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(
      candidatePassword,
      currentPassword,
      function (err: any, isMatch: unknown) {
        if (err) return reject(err);
        resolve(isMatch);
      }
    );
  });
};

const User = model<IUser, IUserModel>("user", UserSchema);

export default User;
