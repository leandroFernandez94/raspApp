interface AsyncFunction{
  (element: any): Promise<any>
} 

/**
 * Returns a promise that applies an async function to an array of elements
 */
export const getInSequence = (array:Array<any>, asyncFunc:AsyncFunction) =>
  array.reduce((previous: Promise<any>, current) => (
    previous.then(accumulator => (
      asyncFunc(current).then(result => accumulator.concat(result))
    ))
  ), Promise.resolve([]));
