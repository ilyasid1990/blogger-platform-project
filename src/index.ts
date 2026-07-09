import express, {type Express} from "express";
import {setupApp} from "./setup-app.js";
import {SETTINGS} from './core/config/settings.js';


const app: Express = express();

setupApp(app);

const PORT = SETTINGS.PORT;


app.listen(PORT, (): void => {
    console.log(`Example app listening on port ${PORT}`);
});
