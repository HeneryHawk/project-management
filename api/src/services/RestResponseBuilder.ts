import { getReasonPhrase } from "http-status-codes";
import { Response } from "express";
import { IRestResponse } from "../types/IRestResponse";

/**
 * Generic response creator.
 *
 * @export
 * @class ResponseCreator
 * @template T Type for the payload data of the response to create
 */
export class RestResponseBuilder<T = any, E = any> {
    /**
     * Express response.
     *
     * @private
     * @type {Response}
     * @memberof ResponseCreator
     */
    private res: Response;

    /**
     * HTTP response code.
     *
     * @private
     * @type {number}
     * @memberof ResponseCreator
     */
    private statusCode: number;

    /**
     * Response message.
     *
     * @private
     * @type {string}
     * @memberof ResponseCreator
     */
    private message?: string;

    /**
     * status code.
     *
     * @private
     * @type {number}
     * @memberof ResponseCreator
     */
    private code?: number;

    /**
     * Response errors.
     *
     * @private
     * @type {string[]}
     * @memberof RestResponseBuilder
     */
    private internalErrors: string[] = [];

    /**
     * Generic payload data.
     *
     * @private
     * @type {T} Type of the payload data
     * @memberof ResponseCreator
     */
    private internalData?: T;

    /**
     * Generic event payload data.
     *
     * @private
     * @type {E} Type of the event payload data.
     * @memberof RestResponseBuilder
     */
    private internalEvent?: E;

    /**
     * Default constructor.
     * @param {Response} res Express response
     * @param {number} code HTTP response code
     * @memberof ResponseCreator
     */
    constructor(res: Response, statusCode: number) {
        this.res = res;
        this.statusCode = statusCode;
    }

    /**
     * Creates the response based on given information.
     *
     * @returns {IRestResponse<T>} Created response
     * @memberof ResponseCreator
     */
    public build(): IRestResponse<T> {
        this.res.status(this.statusCode);
        return {
            code: this.code || 0,
            message: this.createMessage(),
            errors: this.internalErrors || undefined,
            data: this.internalData ? this.internalData : undefined,
            event: this.internalEvent ? this.internalEvent : undefined,
        };
    }

    /**
     * Sets the generic payload data.
     *
     * @param {T} data Payload data
     * @returns {this} Instance
     * @memberof ResponseCreator
     */
    public data(data: T): this {
        this.internalData = data;

        return this;
    }

    /**
     * Sets the generic event payload data.
     *
     * @param {E} event Event payload data
     * @returns {this} Instance
     * @memberof RestResponseBuilder
     */
    public event(event: E): this {
        this.internalEvent = event;

        return this;
    }

    /**
     * Sets a custom message.
     *
     * If the previously given HTTP response code is valid
     * the message will be prefixed with the HTTP status code text.
     *
     * @param {string} message Response message
     * @returns {this} Instance
     * @memberof ResponseCreator
     */
    public msg(message: string): this {
        this.message = message;

        return this;
    }

    /**
     * Sets a custom message.
     *
     * If the previously given HTTP response code is valid
     * the message will be prefixed with the HTTP status code text.
     *
     * @param {string} message Response message
     * @returns {this} Instance
     * @memberof ResponseCreator
     */
    public msgCode(code: number): this {
        this.code = code;

        return this;
    }

    /**
     * Adds an error message to the response.
     *
     * @param {string} message Message of the error
     * @returns {this} Instance
     * @memberof RestResponseBuilder
     */
    public error(message: string): this {
        this.internalErrors.push(message);

        return this;
    }

    /**
     * Adds multiple error messages to the response.
     *
     * @param {string[]} messages Message to add
     * @returns {this} Instance
     * @memberof RestResponseBuilder
     */
    public errors(messages: string[]): this {
        this.internalErrors.push(...messages);

        return this;
    }

    /**
     * Creates a the final response message with the data set.
     *
     * @private
     * @returns {string} Created response massage
     * @memberof ResponseCreator
     */
    private createMessage(): string {
        let result = "";

        const messagePrefix = getReasonPhrase(this.statusCode);
        if (this.message) {
            result = this.message;
        } else {
            result = messagePrefix !== "" ? messagePrefix : getReasonPhrase(500);
        }

        return result;
    }
}
