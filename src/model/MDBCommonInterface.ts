export default interface MDBCommonInterface<I,O> {
  getData(input: I): Promise<O>
}