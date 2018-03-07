import * as moment from "moment"
import axios from "axios"

import MDBCommonInterface from '../model/MDBCommonInterface'
import { MDB_SEARCH_MOVIE_URL, MDB_API_KEY } from "../app-settings";

//export interface MDBMovieSearchInterface extends MDBCommonInterface<MDBMovieSearchInput, MDBMovieSearchOutput>{}

export class MDBMovieSearchOutput {
  id: number
  title: string
  valoration: number
  releaseDate: moment.Moment
  overview: string

  constructor(_id: number, _title: string, _valoration: number, _releaseDate: moment.Moment, _overview: string) {
    this.id = _id
    this.title = _title
    this.valoration = _valoration
    this.releaseDate = _releaseDate
    this.overview = _overview
  }
}

/*export const getMovieByName: Promise<MDBMovieSearchOutput> = async (name:string) => {
  fetchMovieByTitle(name)
}*/

export const fetchMovieByTitle = async (name: string): Promise<MDBMovieSearchOutput> => {
  const response = await axios.get(MDB_SEARCH_MOVIE_URL, { params: { query: name, api_key: MDB_API_KEY } })
  const data = await response.data
  if (data.results.length) {
    const result = data.results[0]
    return Promise.resolve(new MDBMovieSearchOutput(result.id, result.title, result.vote_average, moment(result.release_date), result.overview))
  } else throw new Error("Movie title not found")
}
