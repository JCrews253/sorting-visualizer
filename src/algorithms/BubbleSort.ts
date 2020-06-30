export interface IBubbleSortData {
    Index: number,
    CompareIndex: number,
    IndexValue: number,
    CompareValue: number,
}

var queue: IBubbleSortData[] = []

export const GetBubbleSortData = (array: number[]):IBubbleSortData[] => {
    queue = []
    Sort(array)
    return queue
}

const Sort = (array: number[]) => {
    for(let i = 0; i < array.length; i++){
        var swapped = false
        for(let j=0; j < array.length - i - 1; j++){
            let data: IBubbleSortData = { 
                Index: j,
                CompareIndex: j+1,
                IndexValue: array[j],
                CompareValue: array[j+1]
            }
            if(array[j] > array[j+1]){
                let temp = array[j + 1]
                array[j + 1] = array[j]
                array[j] = temp 
                swapped = true
                
                data.IndexValue = array[j]
                data.CompareValue = array[j+1]
            }
            queue.push(data)
        }
        if(!swapped){ break}
    }
}