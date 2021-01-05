import Vue from "vue";
import { TimeService } from "@/common/api.service";
import { ITimeState, IRootState } from "@/types/IState";
import { Module, Commit } from "vuex";
import { ITime } from "@/types/ITime";

const initialState: ITimeState = {
    times: [],
};

export const state = { ...initialState };

const namespaced = false;
export const timeModule: Module<ITimeState, IRootState> = {
    namespaced,
    state,
    getters: {
        times(state: ITimeState): ITime[] {
            return state.times;
        },
    },
    actions: {
        async fetchTimes({ commit }: { commit: Commit }): Promise<ITime[]> {
            const { data } = await new TimeService().query();
            commit("setTimes", data.data);
            return data.data || [];
        },

        async createTime({ commit }: { commit: Commit }, project: ITime): Promise<ITime | undefined> {
            const { data } = await new TimeService().post(project);
            commit("addTime", data.data);
            return data.data;
        },

        // async updateProject({ commit }: { commit: Commit }, project: IProject): Promise<IProject | undefined> {
        //     const { data } = await new ProjectService().put(project);
        //     commit("updateProject", data.data);
        //     return data.data;
        // },

        // async deleteProject({ commit }: { commit: Commit }, project: IProject): Promise<void> {
        //     if (project._id) {
        //         const { data } = await new ProjectService().delete(project._id);

        //         if (data) {
        //             commit("deleteProject", project._id);
        //         }
        //     }

        //     return;
        // },
    },
    mutations: {
        setTimes(state: ITimeState, projects: ITime[]): void {
            state.times = projects;
        },

        addTime(state: ITimeState, project: ITime): void {
            state.times.push(project);
        },

        // updateProject(state: IProjectState, changedProject: IProject): void {
        //     const index = state.projects.findIndex(project => project._id === changedProject._id);
        //     Vue.set(state.projects, index, changedProject);
        //     // state.projects.$set(index, changedProject);
        // },

        // deleteProject(state: IProjectState, id: string): void {
        //     state.projects = state.projects.filter(project => project._id !== id);
        // },
    },
};
