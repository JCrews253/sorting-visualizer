export interface IHeapSortData {
    swap1: number,
    swap1Value: number,
    swap2: number,
    swap2Value: number,
}

var queue: IHeapSortData[] = []

export const GetHeapSortData = (array: number[]):IHeapSortData[] => {
    queue = []
    Sort(array)
    return queue
}

const Sort = (array: number[]) => {
    for(let i = Math.floor(array.length / 2) - 1; i >= 0; i--) Heapify(array, array.length, i)
    for(let i = array.length - 1; i > 0; i--){
        queue.push({
            swap1: 0, 
            swap1Value: array[0], 
            swap2: i, 
            swap2Value: array[i]
        })
        let temp = array[0]
        array[0] = array[i]
        array[i] = temp
        Heapify(array, i, 0)
    }
}

const Heapify = (array: number[], n:number, i: number) => {
    var largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if(left < n && array[left] > array[largest]) largest = left
    if(right < n && array[right] > array[largest]) largest = right
    if(largest !== i){
        queue.push({
            swap1: i,
            swap1Value: array[i],
            swap2: largest,
            swap2Value: array[largest]
        })       
        let temp = array[i]
        array[i] = array[largest]
        array[largest] = temp
        Heapify(array, n, largest)
    }
}