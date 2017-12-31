import { appendFileSync } from "fs";
import { LOG_FILE_PATH } from "./app-settings";
import * as moment from "moment";


const logLevel = (text: string) => {
    console.log(`[${moment().format()}][LOG]: ${text}`)
    return `[${moment().format()}][LOG]: ${text}\n`
}

    
const infoLevel = (text: string) => {
    console.log(`\x1b[44m[${moment().format()}][INFO]: ${text}\x1b[0m`)
    return `[${moment().format()}][INFO]: ${text}\n`
}
        
const warnLevel = (text: string) =>{
    console.log(`\x1b[33m[${moment().format()}][WARN]: ${text}\x1b[0m`)
    return `[${moment().format()}][WARN]: ${text}\n`
}

const errorLevel = (text: string) =>{
    console.log(`\x1b[31m[${moment().format()}][ERROR]: ${text}\x1b[0m`)
    return `[${moment().format()}][INFO]: ${text}\n`
}


export const log = (text: string) => appendFileSync(LOG_FILE_PATH,logLevel(text))
export const logInfo = (text: string) => appendFileSync(LOG_FILE_PATH,infoLevel(text))
export const logWarn = (text: string) => appendFileSync(LOG_FILE_PATH,warnLevel(text))
export const logError = (text: string) => appendFileSync(LOG_FILE_PATH,errorLevel(text))
