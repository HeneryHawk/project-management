import { StatusCodes } from "http-status-codes";

export interface IRestError extends Error {
    statusCode: StatusCodes;
    msgCode: number;
}
