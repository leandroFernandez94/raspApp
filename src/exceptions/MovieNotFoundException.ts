class MovieNotFoundException extends Error {
  constructor(title?: string) {
      super(`Movie ${title ? `- ${title} ` : null}Not Found`); // 'Error' breaks prototype chain here
      this.name = title
      Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export default MovieNotFoundException
