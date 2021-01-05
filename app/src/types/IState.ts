import { IProject } from "./IProject";

export interface IProjectState {
    projects: IProject[];
}

export interface IRootState {
    version: string;
}
