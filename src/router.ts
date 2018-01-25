import { Router } from "express";

import { log, logWarn } from "./logger";
import { getMoviesList, getSeriesList, getPhotosList } from "./services/FSService";
import { fetchMovieByTitle } from "./services/MDBMovieSearchService"
import { FSType } from "./model/FSType";

const router = Router()

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use((req, res, next) => {
    log(`${req.method} - ${req.url}`)
    next()
})

router.get('/hello', (req, res) => {
    res.send('world')
})

router.get('/movies', async (req, res) => {
    const nodos = await getMoviesList()

    let resp = { files: Array<string>(), directories: Array<string>() };
    nodos.forEach(element => {
        if (element.type == FSType.FILE) {
            resp.files.push(element.filename)
        } else resp.directories.push(element.filename)
    });

    res.send(resp)
})

router.get('/movie-by-title',async (req,res) => {
    const title = req.query.title
    console.log('title',title)
    const resp = await fetchMovieByTitle(title)
    const data = await resp.data
    if(data.results.length) {
        res.send(data.results[0])
    }else res.send('movie title not found')
})

router.get('/series', (req, res) => {
    res.send(getSeriesList())
})

router.get('/photos', (req, res) => {
    res.send(getPhotosList())
})

export default router
