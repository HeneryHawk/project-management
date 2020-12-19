import { StatusCodes } from "http-status-codes";
import { Container, Service } from "typedi";
import { IRestResponse } from "../../types/IRestResponse";
import { Response } from "express";
import { RestResponseBuilder } from "../../services/RestResponseBuilder";
import { IRestError } from "../../types/IRestError";

export interface ITranslater<T> {
    for: (locale: string) => T;
    to: (locale: string) => T;
}

/**
 * Base RESTful controller.
 *
 * @export
 * @class BaseController
 */
@Service()
export class BaseController {
    /**
     * Creates a RESTful response builder.
     *
     * @protected
     * @template T Type of the payload data
     * @template E Type of the event payload data
     * @param {Response} res Express response
     * @param {number} statusCode Statuscode of the response
     * @returns {RestResponseBuilder<T, E>} RESTful response builder
     * @memberof BaseController
     */
    protected response<T = any, E = any>(res: Response, statusCode: number): RestResponseBuilder<T, E> {
        return new RestResponseBuilder<T, E>(res, statusCode);
    }

    /**
     * Creates an RESTful response from an given error.
     *
     * @protected
     * @param {Response} res Express response
     * @param {Error} error Error to create response from
     * @param {number} statusCode Statuscode of the response
     * @returns {IRestResponse} Created response
     * @memberof BaseController
     */
    protected errorResponse(res: Response, error: IRestError, statusCode?: number): IRestResponse {
        return this.response(res, statusCode || error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .msg(error.message)
            .msgCode(error.msgCode)
            .build();
    }
}
