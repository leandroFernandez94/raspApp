import * as moment from "moment"
import axios from "axios"

import MDBCommonInterface from '../model/MDBCommonInterface'
import { MDB_SEARCH_MOVIE_URL, MDB_API_KEY, POSTERS_URL } from "../app-settings";
import MovieNotFoundException from "../exceptions/MovieNotFoundException";

//export interface MDBMovieSearchInterface extends MDBCommonInterface<MDBMovieSearchInput, MDBMovieSearchOutput>{}

interface IMDBMovieSearchOutput {
  id?:number
  title: string
  valoration?: number
  releaseDate?: moment.Moment
  overview?: string
  posterPath?: string
}

export class MDBMovieSearchOutput {
  id:number
  title: string
  valoration: number
  releaseDate: moment.Moment
  overview: string
  posterPath: string

  constructor(obj: IMDBMovieSearchOutput = {id: null, title: null, valoration: null, releaseDate: null, overview: null, posterPath: null }) {
    this.id = obj.id
    this.title = obj.title
    this.valoration = obj.valoration
    this.releaseDate = obj.releaseDate
    this.overview = obj.overview
    this.posterPath = obj.posterPath
  }

}

/*export const getMovieByName: Promise<MDBMovieSearchOutput> = async (name:string) => {
  fetchMovieByTitle(name)
}*/

export const fetchMovieByTitle = async (name: string): Promise<MDBMovieSearchOutput> => {
  const response = await axios.get(MDB_SEARCH_MOVIE_URL, { params: { query: name, api_key: MDB_API_KEY } })
  const data = await response.data
  console.log(`MDB response for ${name} - `,data.results[0])
  if (data.results.length) {
    const result = data.results[0]
    return Promise.resolve(new MDBMovieSearchOutput({
      id: result.id,
      title: result.title,
      valoration: result.vote_average,
      releaseDate: moment(result.release_date),
      overview: result.overview,
      posterPath: `${POSTERS_URL}/${result.poster_path}`}))
  } else throw new MovieNotFoundException(name)
}
