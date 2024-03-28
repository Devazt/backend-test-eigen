import * as express from "express"
import * as session from "express-session"
import * as cors from "cors"
import { AppDataSource } from "./data-source"
import router from "./routes"
import swaggerDocs from "./utils/swagger"
import log from "./utils/logger"

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const port = 5000;

        const corsOptions = {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        };

        app.use(session({
            secret: "my-secret",
            resave: false,
            saveUninitialized: false
        }));

        app.use(express.json());
        app.use(cors(corsOptions));
        app.use("/api/v1", router);

        app.listen(port, () => {
            log.info("Server started at http://localhost:" + port);
            swaggerDocs(app, port);
        });
    })
    .catch((error) => console.log(error))
