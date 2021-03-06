import { Schema, model, Document } from "mongoose";

export const ModelName = "project";

export interface IProject extends Document {
    name: string;
    customer: string;
    start: Date;
    status: Number;
}

const ProjectSchema: Schema = new Schema(
    {
        name: String,
        customer: String,
        start: Date,
        status: Number,
    },
    { timestamps: true }
);

export const Model = model<IProject>(ModelName, ProjectSchema);
