import Vue from "vue";
import { ProjectService } from "@/common/api.service";
import { IProject } from "@/types/IProject";
import { IProjectState, IRootState } from "@/types/IState";
import { Module, Commit } from "vuex";

const initialState: IProjectState = {
    projects: [],
};

export const state = { ...initialState };

const namespaced = false;
export const projectModule: Module<IProjectState, IRootState> = {
    namespaced,
    state,
    getters: {
        projects(state: IProjectState): IProject[] {
            return state.projects;
        },
    },
    actions: {
        async fetchProjects({ commit }: { commit: Commit }): Promise<IProject[]> {
            const { data } = await new ProjectService().query();
            commit("setProjects", data.data);
            return data.data || [];
        },

        async createProject({ commit }: { commit: Commit }, project: IProject): Promise<IProject | undefined> {
            const { data } = await new ProjectService().post(project);
            commit("addProject", data.data);
            return data.data;
        },

        async updateProject({ commit }: { commit: Commit }, project: IProject): Promise<IProject | undefined> {
            const { data } = await new ProjectService().put(project);
            commit("updateProject", data.data);
            return data.data;
        },

        async deleteProject({ commit }: { commit: Commit }, project: IProject): Promise<void> {
            if (project._id) {
                const { data } = await new ProjectService().delete(project._id);

                if (data) {
                    commit("deleteProject", project._id);
                }
            }

            return;
        },
    },
    mutations: {
        setProjects(state: IProjectState, projects: IProject[]): void {
            state.projects = projects;
        },

        addProject(state: IProjectState, project: IProject): void {
            state.projects.push(project);
        },

        updateProject(state: IProjectState, changedProject: IProject): void {
            const index = state.projects.findIndex(project => project._id === changedProject._id);
            Vue.set(state.projects, index, changedProject);
            // state.projects.$set(index, changedProject);
        },

        deleteProject(state: IProjectState, id: string): void {
            state.projects = state.projects.filter(project => project._id !== id);
        },
    },
};
