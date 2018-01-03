import { readdir } from "fs"
import * as express from "express"

import appRouter from "./router";
import { DEV_PORT } from "./app-settings";

const app = express()

app.use(appRouter)

app.listen(DEV_PORT,() => console.log(`listening on port ${DEV_PORT}`))
