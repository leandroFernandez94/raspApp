import { FSType } from "./FSType"

export interface FSNodeInterface {
    filename: string
    type: FSType
}

export default class FSNode implements FSNodeInterface {
    filename: string;
    type: FSType;

    constructor(_filename: string, _type: FSType) {
        this.filename = _filename
        this.type = _type
    }
}