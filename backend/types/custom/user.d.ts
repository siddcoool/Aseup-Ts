import { Model } from "mongoose";
import { HydratedDocument } from "mongoose";

interface IUser {
    name: string,
    email: string;
    password: string;
    gender: string;
    isDeleted: boolean
}



export interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;  //compare the given password with the
}

export type IUserInstance = HydratedDocument<IUser>


export interface IUserModel extends Model<
    IUser,
    {},
    IUserMethods
> {
    // findAllUsers(): Promise<HydratedDocument<IApplicationUser, IApplicationUserMethods>>
}
