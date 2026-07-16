import express, {type Express} from "express";
import {setupApp} from "./setup-app.js";
import {SETTINGS} from './core/config/settings.js';
import { runDB } from './db/mongo.db.js';



const bootstrap = async () => {
    const app: Express = express();
    setupApp(app);
    const PORT = SETTINGS.PORT;

    await runDB(SETTINGS.MONGO_URL);

    app.listen(PORT, ():void => {
        console.log(`Example app listening on port ${PORT}`);
    });
    return app;
};

bootstrap();



