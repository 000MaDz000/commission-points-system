import { Mongoose } from "../classes/db"

const { Schema, model } = window.require("mongoose") as Mongoose;

const cardSchema = new Schema({
    code: {
        type: String,
        unique: true,
        dropDups: true
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: "Person",
        unique: true,
        dropDups: true,
    }
});

const Card = model("Card", cardSchema);

cardSchema.index({ code: 1 });
cardSchema.index({ person: 1 });

export default Card;