import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Body, Delete, Get, JsonController, Param, Post, Put, Req, Res } from "routing-controllers";
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

    @Put("/:id")
    public async updateProject(@Req() req: Request, @Res() res: Response, @Param("id") id: string, @Body() data: IProject): Promise<any> {
        const project = await this.projectRepo.update(id, data).run();
        return res.json(this.response<IProject>(res, StatusCodes.CREATED).data(project).build());
    }

    @Delete("/:id")
    public async deleteProject(@Req() req: Request, @Res() res: Response, @Param("id") id: string): Promise<any> {
        const result = await this.projectRepo.delete({ _id: id }).run();
        return res.json(this.response<boolean>(res, StatusCodes.CREATED).data(result).build());
    }
}
