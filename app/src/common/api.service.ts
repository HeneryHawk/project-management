import Vue from "vue";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import VueAxios from "vue-axios";
import { IRestResponse } from "@/types/IRestResponse";
import { IProject } from "@/types/IProject";

class ApiService {
    public static init(): void {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = "/api";
    }

    // setHeader(): void {},

    public static async query<T>(resource: string, params: AxiosRequestConfig | undefined): Promise<AxiosResponse<IRestResponse<T[]>>> {
        return await Vue.axios.get<IRestResponse<T[]>>(resource, params).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }

    public static async get(resource: string, slug = ""): Promise<AxiosResponse<any>> {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }

    public static async post<T>(resource: string, params: T): Promise<AxiosResponse<IRestResponse<T>>> {
        return await Vue.axios.post<IRestResponse<T>>(`${resource}`, params);
    }

    public static async update(resource: string, slug: string, params: Record<string, unknown>): Promise<AxiosResponse<any>> {
        return Vue.axios.put(`${resource}/${slug}`, params);
    }

    public static async put(resource: string, params: Record<string, unknown>): Promise<AxiosResponse<any>> {
        return Vue.axios.put(`${resource}`, params);
    }

    public static async delete(resource: string): Promise<AxiosResponse<any>> {
        return Vue.axios.delete(resource).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }
}

export default ApiService;

export class ProjectService extends ApiService {
    public static async query<IProject>(): Promise<AxiosResponse<IRestResponse<IProject[]>>> {
        return super.query<IProject>("project", {});
    }
    public static async post<IProject>(resource: string, project: IProject): Promise<AxiosResponse<IRestResponse<IProject>>> {
        return super.post<IProject>("project", project);
    }
}
