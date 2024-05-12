import { Mongoose } from "../classes/db";

const { Schema, model } = window.require("mongoose") as Mongoose;

const pointsSchema = new Schema({
    points: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: "Person",
        required: true,
    },
    note: String,
});


interface PointsType {
    points: number;
    date: Date;
    person: string;
    note?: string;
}

pointsSchema.index({ date: 1, points: 1 });
pointsSchema.index({ person: 1 });
const Points = model<PointsType>("points", pointsSchema);

export default Points;
