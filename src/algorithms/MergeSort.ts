export interface IMergeSortData {
  iIndex: number,
  jIndex: number,
  changedIndex: number,
  changedValue: number,
}

var queue: IMergeSortData[] = []

export function GetMergeSortData(array: number[]): IMergeSortData[]{
    queue = []
    const aux = [...array]
    Sort(array, aux, 0, array.length-1)
    return queue
}

const Merge = (array: number[], aux: number[], low: number, mid: number, high: number) => { 
    for(let k = low; k <= high; k++){
      aux[k] = array[k]
    }
    var i = low 
    var j = mid+1
    for(let k = low; k <= high; k++){
      if(i > mid) { array[k] = aux[j]; j++ }
      else if ( j > high) { array[k] = aux[i]; i++ }
      else if ( aux[j] < aux[i] ) { array[k] = aux[j]; j++ }
      else { array[k] = aux[i]; i++}

      //Animation Data
      let jInput = j 
      if(jInput >= high){ jInput = high }
      queue.push({ 
        iIndex: i,
        jIndex: jInput,
        changedIndex: k,
        changedValue: array[k],
      })  
    } 
}

const Sort = (array: number[], aux: number[], low: number, high: number) => {
    if(high <= low ) { return }
    const mid = Math.floor(low + (high - low) / 2)
    Sort(array, aux, low, mid)
    Sort(array, aux, mid+1, high)
    Merge(array, aux, low, mid, high)
}  