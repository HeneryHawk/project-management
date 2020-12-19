import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Body, Get, JsonController, Post, Req, Res } from "routing-controllers";
import { DocumentRepository } from "../repositories/base/base.repo";
import { IProject, Model as ProjectModel } from "../models/project.model";
import { Repo } from "../repositories/base/decorators";
import { BaseController } from "./base/base.controller";

@JsonController("/project")
export class ProjectController extends BaseController {
    @Repo<IProject>(ProjectModel)
    private readonly projectRepo: DocumentRepository<IProject>;

    @Get("/")
    public async getProjects(@Req() req: Request, @Res() res: Response): Promise<any> {
        const projects = await this.projectRepo.select().run();
        return res.json(this.response<IProject[]>(res, StatusCodes.OK).data(projects).build());
    }

    @Post("/")
    public async createProject(@Req() req: Request, @Res() res: Response, @Body() data: IProject): Promise<any> {
        const project = await this.projectRepo.insert(data).run();
        return res.json(this.response<IProject>(res, StatusCodes.CREATED).data(project).build());
    }
}
