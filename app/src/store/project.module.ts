import { ProjectService } from "@/common/api.service";
import { IProject } from "@/types/IProject";
import { IState } from "@/types/IState";

const initialState: IState = {
    projects: [],
};

export const state = { ...initialState };

export const actions = {
    async fetchProjects(context: any): Promise<IProject[]> {
        const { data } = await ProjectService.query<IProject>();
        context.commit("setProjects", data.data);
        return data.data || [];
    },

    async saveProject(context: any, project: IProject): Promise<IProject | undefined> {
        const { data } = await ProjectService.post("", project);
        context.commit("addProject", data.data);
        return data.data;
    },
};

export const mutations = {
    setProjects(state: IState, projects: IProject[]): void {
        state.projects = projects;
    },

    addProject(state: IState, project: IProject): void {
        state.projects.push(project);
    },
};

const getters = {
    projects(state: IState): IProject[] {
        return state.projects;
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
};
