import { Model } from "mongoose";
import { Mongoose } from "../classes/db";

const { Schema, model } = window.require("mongoose") as Mongoose;

const personSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    nationalId: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    birthDate: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export interface PersonType {
    name: string;
    nationalId: string;
    birthDate: Date;
    gender: string;
    address: string;
    phone: string;
    email?: string;
    createdAt: Date;
    updatedAt: Date;
}

const Person = model("Person", personSchema) as Model<PersonType>;

export default Person;