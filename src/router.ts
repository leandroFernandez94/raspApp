import { Router } from "express";
import { log, logWarn } from "./logger";
import { getMoviesList, getSeriesList, getPhotosList } from "./FSService";

const router = Router()

router.use((req, res, next) => {
    log(`${req.method} - ${req.url}`)
    next()
})

router.get('/hello', (req,res) => {
    res.send('world')
})

router.get('/movies',(req,res) => {
    res.send(getMoviesList())
})

router.get('/series',(req,res) => {
    res.send(getSeriesList())
})

router.get('/photos',(req,res) => {
    res.send(getPhotosList())
})

export default router
