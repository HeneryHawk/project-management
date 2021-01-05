import mongoose, { Schema, model, Document } from "mongoose";
import { ModelName as ProjectModelName } from "./project.model";

export const ModelName = "time";

export interface ITime extends Document {
    project: string;
    date: Date;
    startTime: number;
    endTime: number;
    activity: string;
}

const TimeSchema: Schema = new Schema(
    {
        project: { type: mongoose.Schema.Types.ObjectId, ref: ProjectModelName, required: true },
        date: { type: Date, required: true },
        startTime: { type: Number, required: true },
        endTime: { type: Number, required: true },
        activity: { type: String, required: true },
    },
    { timestamps: true }
);

export const Model = model<ITime>(ModelName, TimeSchema);
