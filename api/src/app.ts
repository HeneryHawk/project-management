import "reflect-metadata";
import express, { Express } from "express";
import * as restRouter from "routing-controllers";
import { Container } from "typedi";
import log from "./logger/log";
import mongoose from "mongoose";

class App {
    private readonly app: Express;

    constructor() {
        this.app = express();
        this.createDBConnection();
        this.listen();
    }

    /**
     * @return Express application
     */
    public getApp(): Express {
        return this.app;
    }

    /**
     * Start application server
     */
    protected listen(): void {
        const port = process.env.PORT || 3001;

        restRouter.useContainer(Container);
        restRouter.useExpressServer(this.app, {
            routePrefix: "api",
            controllers: [__dirname + "/controllers/**/*.ts"],
        });

        this.app.listen(port, () => {
            log.info(`Started on port ${port}`);
        });
    }

    protected async createDBConnection(): Promise<void> {
        const mongoUri = `mongodb://localhost:27017/projectManagement`;
        try {
            mongoose.connect(mongoUri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
        } catch (error) {
            throw new Error(`unable to connect to database: ${mongoUri}`);
        }
    }
}

export default new App().getApp();
