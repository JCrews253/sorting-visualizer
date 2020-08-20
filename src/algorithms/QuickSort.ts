export interface IQuickSortData {
    iIndex: number,
    iValue: number,
    jIndex: number,
    jValue: number
    pivot: number,
}

var queue: IQuickSortData[] = []

export const GetQuickSortData = (array: number[]):IQuickSortData[] => {
    queue = []
    Sort(array,0,array.length-1)
    return queue
}

const Sort = (array: number[],low:number,high:number) => {
    if(low >= high) return
    const pivot = array[Math.floor((low+high)/2)]
    const index = Partition(array,low,high,pivot,Math.floor((low+high)/2))
    Sort(array,low,index-1)
    Sort(array,index,high)
}

const Partition = (array: number[],low:number,high:number,pivot:number,pivotIdx:number):number => {
    let i = low
    let j = high
    queue.push({
        iIndex: i,
        iValue: array[i],
        jIndex: j,
        jValue: array[j],
        pivot: pivotIdx
    })
    while( i <= j ){
        while(array[i] < pivot){
            i++
            if(i < array.length){
                queue.push({
                    iIndex: i,
                    iValue: array[i],
                    jIndex: j,
                    jValue: array[j],
                    pivot: pivotIdx
                })
            }
        } 
        while(array[j] > pivot){
            j--
            if(j >= 0){
                queue.push({
                    iIndex: i,
                    iValue: array[i],
                    jIndex: j,
                    jValue: array[j],
                    pivot: pivotIdx
                })
            }
        } 
        if(i <= j){
            Swap(array,i,j)
            queue.push({
                iIndex: i,
                iValue: array[i],
                jIndex: j,
                jValue: array[j],
                pivot: pivotIdx
            })
            i++
            j--
            queue.push({
                iIndex: i > array.length - 1 ? array.length -1 : i,
                iValue: array[i],
                jIndex: j < 0 ? 0 : j,
                jValue: array[j],
                pivot: pivotIdx
            })
        }
    }
    return i
}

const Swap = (array:number[],idx1:number,idx2:number) => {
    const temp = array[idx1]
    array[idx1] = array[idx2]
    array[idx2] = temp
}