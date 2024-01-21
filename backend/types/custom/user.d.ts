import { HydratedDocument } from "mongoose";

interface IUser{
    name: string,
    email: string;
    password: string;
    gender: string;
    isDeleted: boolean      
}

export type IUserInstance = HydratedDocument<IUser>