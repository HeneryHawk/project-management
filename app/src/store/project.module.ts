import { ProjectService } from "@/common/api.service";

const initialState = {
    projects: [],
};

export const state = { ...initialState };

export const actions = {
    async fetchProjects(context: any): Promise<void> {
        const { data } = await ProjectService.query();
        context.commit("setProjects", data.data);
        return data;
    },
};

export const mutations = {
    setProjects(state: any, projects: any): void {
        state.projects = projects;
    },
};

const getters = {
    projects(state) {
        return state.projects;
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
};
