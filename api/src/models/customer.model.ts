import { Schema, model, Document } from "mongoose";

export interface ICustomer extends Document {
    name: string;
}

export const CustomerSchema: Schema = new Schema(
    {
        name: String,
    },
    { timestamps: true }
);

export const Model = model<ICustomer>("customer", CustomerSchema);
