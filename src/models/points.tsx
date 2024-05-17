import { Mongoose } from "../classes/db";
import Person from "./person";

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

export async function addPoints(personId: string, points: number, note?: string) {
    const personObj = await Person.findById(personId);

    if (!personObj) throw new Error("404");

    personObj.points += points;

    const pointsObj = new Points({
        person: personId,
        note,
        points
    });


    await Promise.all([
        pointsObj.save(),
        personObj.save()
    ]);

    return 200
}

export default Points;
