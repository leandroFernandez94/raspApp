import { Router } from "express";

import { log, logWarn } from "./logger";
import { getMoviesList, getSeriesList, getPhotosList } from "./services/FSService";
import { fetchMovieByTitle, MDBMovieSearchOutput } from "./services/MDBMovieSearchService"
import { FSType } from "./model/FSType";
import MovieNotFoundException from "./exceptions/MovieNotFoundException"
import { getInSequence } from "./utils";

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

    const directories = nodos.filter(nodo => nodo.type == FSType.DIRECTORY)

    const resp: MDBMovieSearchOutput[] = await getInSequence(directories.map(dir => dir.filename),fetchMovieByTitle)

    console.log('movies found in library: ', resp)

    res.send(resp)
})

router.get('/movies/:title', async (req, res) => {
    const title: string = decodeURI(req.params.title)
    try {
        const resp: MDBMovieSearchOutput = await fetchMovieByTitle(title)
        res.send(resp)
    } catch (e) {
        console.log(e)
        res.status(404)
        res.send(e.message)
    }
})

router.get('/series', (req, res) => {
    res.send(getSeriesList())
})

router.get('/photos', (req, res) => {
    res.send(getPhotosList())
})

export default router
