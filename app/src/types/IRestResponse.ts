export interface IRestResponse<T = any> {
    code: number;
    message: string;
    errors?: string[];
    data?: T;
}
