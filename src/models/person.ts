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
    }
});

export default model("Person", personSchema);