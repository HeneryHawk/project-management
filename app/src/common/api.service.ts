import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import VueAxios from "vue-axios";

class ApiService {
    public static init(): void {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = "/api";
    }

    // setHeader(): void {},

    public static async query(resource: string, params: Record<string, unknown>): Promise<AxiosResponse<any>> {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }

    public static async get(resource: string, slug = ""): Promise<AxiosResponse<any>> {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }

    public static async post(resource: string, params: Record<string, unknown>): Promise<AxiosResponse<any>> {
        return Vue.axios.post(`${resource}`, params);
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
    public static async query(): Promise<AxiosResponse<any>> {
        return super.query("project", {});
    }
}
