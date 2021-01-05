/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import VueAxios from "vue-axios";
import { IRestResponse } from "@/types/IRestResponse";
import { IProject } from "@/types/IProject";

export default class ApiService<T> {
    public static init(): void {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = "/api";
    }

    // setHeader(): void {},

    public async query(params: AxiosRequestConfig | undefined, resource: string): Promise<AxiosResponse<IRestResponse<T[]>>> {
        return await Vue.axios.get<IRestResponse<T[]>>(resource, params).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }

    public async get(resource: string, slug = ""): Promise<AxiosResponse<any>> {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }

    public async post(params: T, resource: string): Promise<AxiosResponse<IRestResponse<T>>> {
        return await Vue.axios.post<IRestResponse<T>>(`${resource}`, params);
    }

    public async put(params: T, resource: string): Promise<AxiosResponse<IRestResponse<T>>> {
        return Vue.axios.put<IRestResponse<T>>(`${resource}`, params);
    }

    public async delete(id: string, resource: string): Promise<AxiosResponse<IRestResponse<boolean>>> {
        return Vue.axios.delete<IRestResponse<boolean>>(`${resource}/${id}`);
    }
}

export class ProjectService extends ApiService<IProject> {
    public async query(): Promise<AxiosResponse<IRestResponse<IProject[]>>> {
        return super.query({}, "project");
    }

    public async post(project: IProject): Promise<AxiosResponse<IRestResponse<IProject>>> {
        return super.post(project, "project");
    }

    public async put(project: IProject): Promise<AxiosResponse<IRestResponse<IProject>>> {
        return super.put(project, `project/${project._id}`);
    }

    public async delete(id: string): Promise<AxiosResponse<IRestResponse<boolean>>> {
        return super.delete(id, "project");
    }
}
