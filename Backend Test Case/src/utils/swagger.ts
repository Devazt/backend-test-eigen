import { Express, Request, Response} from "express";
import * as swaggerJsdoc from "swagger-jsdoc"
import * as swaggerUi from "swagger-ui-express"
import {version} from "../../package.json"
import log from "./logger"

const options:swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Book Store Documentation",
            description: "OpenAPI which contains complete documentation about all endpoints that can be used in this RESTful API.",
            contact: {
                name: "Nandy Septiana",
                email: "nandy.septiana@gmail.com"
            },
            version
        },
    },
    apis: ["./src/routes/*.ts"]
};

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express, port: number) {
    // Swagger Page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Docs Json format
    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })

    log.info("Docs available at http://localhost:" + port + "/docs")
}

export default swaggerDocs