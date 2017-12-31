import { readdirSync, PathLike } from "fs";
import { MOVIES_DIR, PHOTOS_DIR, SERIES_DIR } from "../app-settings.js";
import { log, logError } from "./logger";

interface serviceFunction {
    (): string[]
}

export const getMoviesList: serviceFunction = () => readdirSync(MOVIES_DIR)

export const getPhotosList: serviceFunction = () => readdirSync(PHOTOS_DIR)

export const getSeriesList: serviceFunction = () => readdirSync(SERIES_DIR)
