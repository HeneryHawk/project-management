import mongoose, { Document, Model, FilterQuery, PopulateOptions } from "mongoose";
import { Container, Inject, Service } from "typedi";
import { IRunner } from "../../types/IRunner";

/**
 * Base document repository.
 *
 * @export
 * @class DocumentRepository
 */
@Service()
export class DocumentRepository<T extends Document> {
    /**
     * Model schema of the repository entity
     *
     * @protected
     * @type {Schema}
     * @memberof DocumentRepository
     */
    protected model: Model<T>;

    /**
     * Default constructor.
     *
     * @param {string} entity Entity this repository is concerned with
     * @param {Schema} schema Schema of the entity
     * @memberof DocumentRepository
     */
    constructor(model: Model<T>) {
        this.model = model;
    }

    /**
     * Inserts given entities on the DB.
     *
     * @param {T} data Data to insert
     * @returns {Promise<boolean>} Flag, wheter or not the operation was successfull or not
     * @memberof Repository
     */
    public insert(data: T): IRunner<T> {
        return {
            /**
             * Runs the insert command.
             * UserContext has to be provided.
             * NOTE: When you want to to have transaction handling (e.g. for rollbacks) make sure to provide a transaction context!
             *
             * @param {IUserContext} userContext
             * @returns boolean
             */
            run: async () => {
                return await new this.model(data).save();
            },
        };
    }

    /**
     * Reads entities from the DB.
     *
     * @param {Object} [conditions] Select conditions
     * @returns {Promise<T[]>} All read entities
     * @memberof Repository
     */
    public select(conditions?: FilterQuery<T>, select?: any, sort?: string | any, limit?: number, skip?: number, populate?: PopulateOptions): IRunner<T[]> {
        return {
            run: async () => {
                const result = await this.model.find(conditions).select(select).sort(sort).limit(limit).skip(skip).populate(populate).exec();
                return result.map(result => result.toObject()) as any;
            },
        };
    }

    /**
     * Reads entities from the DB.
     *
     * @param {Object} [conditions] Select conditions
     * @returns {Promise<T[]>} All read entities
     * @memberof Repository
     */
    public count(conditions?: FilterQuery<T>): IRunner<number> {
        return {
            run: async () => {
                return await this.model.countDocuments(conditions).exec();
            },
        };
    }

    /**
     * Updates entities on the DB.
     *
     * @param {(T | T[])} data Data to update
     * @param {Object} conditions Update conditions
     * @returns {Promise<boolean>} Flag, wheter or not the operation was successfull or not
     * @memberof Repository
     */
    public update(id: string, data: T): IRunner<T> {
        return {
            run: async () => {
                return await this.model.findByIdAndUpdate(id, data as any, { new: true }).exec();
            },
        };
    }

    /**
     * Deletes entities from the DB.
     *
     * @param {Object} conditions Deletion condition
     * @returns {Promise<boolean>} Flag, wheter or not the operation was successfull or not
     * @memberof Repository
     */
    public delete(conditions: FilterQuery<T>): IRunner<boolean> {
        return {
            run: async () => {
                const { deletedCount } = await this.model.deleteMany(conditions).exec();
                return deletedCount > 0;
            },
        };
    }
}
