import { FSType } from "./FSType"

export default class FSNode {
    filename: string
    type: FSType

    constructor(_filename: string, _type: FSType) {
        this.filename = _filename
        this.type = _type
    }
}