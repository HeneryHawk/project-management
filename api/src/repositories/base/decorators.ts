import { Container } from "typedi";
import { DocumentRepository } from "./base.repo";
import { Document, Model } from "mongoose";

export function Repo<T extends Document>(model: Model<T>): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        const repository = new DocumentRepository<T>(model);
        Container.registerHandler({
            object: target,
            propertyName: key as string,
            value: containerInstance => repository,
        });
    };
}
