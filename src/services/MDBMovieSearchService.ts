import { Moment } from "moment";
import axios from "axios"

import MDBCommonInterface from '../model/MDBCommonInterface'
import { MDB_SEARCH_MOVIE_URL, MDB_API_KEY } from "../app-settings";

//export interface MDBMovieSearchInterface extends MDBCommonInterface<MDBMovieSearchInput, MDBMovieSearchOutput>{}

export class MDBMovieSearchOutput {
  title: string
  valoration: number
  releaseDate: Moment
  overview: string

  constructor(_title: string, _valoration: number, _releaseDate: Moment, _overview: string) {
    this.title = _title
    this.valoration = _valoration
    this.releaseDate = _releaseDate
    this.overview = _overview
  }
}

/*export const getMovieByName: Promise<MDBMovieSearchOutput> = async (name:string) => {
  fetchMovieByTitle(name)
}*/

export const fetchMovieByTitle = async (name:string) => axios.get(MDB_SEARCH_MOVIE_URL,{ params: { query: name, api_key: MDB_API_KEY } })
