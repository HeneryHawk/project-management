import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
    name: string;
    customer: string;
    start: Date;
}

const ProjectSchema: Schema = new Schema(
    {
        name: String,
        customer: String,
        start: Date,
    },
    { timestamps: true }
);

export const Model = model<IProject>("project", ProjectSchema);
