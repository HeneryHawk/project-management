import { IProject } from "./IProject";
import { ITime } from "./ITime";

export interface IProjectState {
    projects: IProject[];
}

export interface ITimeState {
    times: ITime[];
}

export interface IRootState {
    version: string;
}
