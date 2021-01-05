import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Body, Delete, Get, JsonController, Param, Post, Put, Req, Res } from "routing-controllers";
import { DocumentRepository } from "../repositories/base/base.repo";
import { Repo } from "../repositories/base/decorators";
import { BaseController } from "./base/base.controller";
import { ITime, Model as TimeModel } from "../models/time.model";

@JsonController("/time")
export class TimeController extends BaseController {
    @Repo<ITime>(TimeModel)
    private readonly timeRepo: DocumentRepository<ITime>;

    @Get("/")
    public async getProjects(@Req() req: Request, @Res() res: Response): Promise<any> {
        const projects = await this.timeRepo.select().run();
        return res.json(this.response<ITime[]>(res, StatusCodes.OK).data(projects).build());
    }

    @Post("/")
    public async createProject(@Req() req: Request, @Res() res: Response, @Body() data: ITime): Promise<any> {
        const project = await this.timeRepo.insert(data).run();
        return res.json(this.response<ITime>(res, StatusCodes.CREATED).data(project).build());
    }

    // @Put("/:id")
    // public async updateProject(@Req() req: Request, @Res() res: Response, @Param("id") id: string, @Body() data: IProject): Promise<any> {
    //     const project = await this.timeRepo.update(id, data).run();
    //     return res.json(this.response<ITime>(res, StatusCodes.CREATED).data(project).build());
    // }

    // @Delete("/:id")
    // public async deleteProject(@Req() req: Request, @Res() res: Response, @Param("id") id: string): Promise<any> {
    //     const result = await this.timeRepo.delete({ _id: id }).run();
    //     return res.json(this.response<boolean>(res, StatusCodes.CREATED).data(result).build());
    // }
}
