export interface IRestResponse<T = any, E = any> {
    code: number;
    message: string;
    errors?: string[];
    data?: T;
    event?: E;
}
