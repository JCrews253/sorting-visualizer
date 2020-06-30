export interface IInsertionSortData {
    iIndex: number,
    jIndex: number,
    Key: number,
    jValue: number,
}

var queue: IInsertionSortData[] = []

export const GetInsertionSortData = (array: number[]):IInsertionSortData[] => {
    queue = []
    Sort(array)
    return queue
}

const Sort = (array: number[]) => {
    for(let i = 1; i < array.length; i++){
        var key = array[i]
        var j = i - 1    
        while( (array[j] > key) && j >= 0 ){   
            queue.push({iIndex:i, jIndex: j, Key: key, jValue: array[j]})           
            array[j + 1] = array[j]
            j--                 
        } 
        array[j+1] = key
    }
}