import { Router } from "express";

import { log, logWarn } from "./logger";
import { getMoviesList, getSeriesList, getPhotosList } from "./FSService";
import { FSType } from "./model/FSType";

const router = Router()

router.use((req, res, next) => {
    log(`${req.method} - ${req.url}`)
    next()
})

router.get('/hello', (req,res) => {
    res.send('world')
})

router.get('/movies',async (req,res) => {
    const nodos = await getMoviesList()
    console.log('nodos',nodos)
    let resp = { files: Array<string>(), directories: Array<string>() };
    nodos.forEach(element => {
        if (element.type == FSType.FILE) {
            resp.files.push(element.filename)
        } else resp.directories.push(element.filename)
    });

    res.send(resp)
})

router.get('/series',(req,res) => {
    res.send(getSeriesList())
})

router.get('/photos',(req,res) => {
    res.send(getPhotosList())
})

export default router
