import { readdirSync, readdir, statSync } from "fs";
import { join } from "path"

import { MOVIES_DIR, PHOTOS_DIR, SERIES_DIR } from "../app-settings.js"
import FSNode from "../model/FSNode"
import { FSType } from "../model/FSType"
import { log, logError } from "../logger"

export const getMoviesList = async function (): Promise<Array<FSNode>> {
    console.log(MOVIES_DIR)
    return new Promise<Array<FSNode>>((resolve, reject) => {
        readdir(MOVIES_DIR, (err, files) => {
            if (err) {
                reject(err)
            }
            resolve(
                files.reduce((prev: Array<FSNode>, currentNode: string) => {
                    if (statSync(join(MOVIES_DIR, currentNode)).isFile()) {
                        prev.push(new FSNode(currentNode, FSType.FILE))
                    } else if (statSync(join(MOVIES_DIR, currentNode)).isDirectory()) {
                        prev.push(new FSNode(currentNode, FSType.DIRECTORY))
                    }
                    return prev
                }, Array<FSNode>())
            )
        })
    })
}


export const getPhotosList = () => readdirSync(PHOTOS_DIR)

export const getSeriesList = () => readdirSync(SERIES_DIR)
