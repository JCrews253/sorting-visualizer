import React from 'react';
import './App.css';
import { useState } from 'react';
import { GetMergeSortData } from './algorithms/MergeSort';
import { GetBubbleSortData } from './algorithms/BubbleSort';
import { GetInsertionSortData } from './algorithms/InsertionSort';
import { GetHeapSortData } from './algorithms/HeapSort';
import { GetQuickSortData } from './algorithms/QuickSort';

const MIN_ELEMENT_SIZE_PX = 15;
const MAX_ELEMENT_SIZE_PX = window.innerHeight;
const DEFAULT_ITERATION_SPEED_MS = 10;
const DEFAULT_ARRAY_SIZE = 50 ;

function App() {
  const genRandomArray = (arraySize: number): number[] => {
    const stepSize = (MAX_ELEMENT_SIZE_PX-MIN_ELEMENT_SIZE_PX)/arraySize
    const returnArray = []
    for(let i = 0; i < arraySize; i++){
      returnArray[i] = i * stepSize + MIN_ELEMENT_SIZE_PX
    }
    for(let i = returnArray.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)   
      const temp:number = returnArray[i]
      returnArray[i] = returnArray[j]
      returnArray[j] = temp
    }
    return returnArray
  }

  const [state, setState] = useState( () => genRandomArray(DEFAULT_ARRAY_SIZE))
  const [sortingState, setSortingState] = useState(false)
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE)
  const [speedState, setSpeedState] = useState(DEFAULT_ITERATION_SPEED_MS)
  const [hasSolution,setHasSolution] = useState(false)

  const HandleStart = () => {
    if(hasSolution) setState(genRandomArray(state.length))
    setSortingState(true)
    const selectedAlgo = document.getElementById('algo-select') as HTMLInputElement
    let x = selectedAlgo.value === 'mergeSort' ? MergeSort() : 
      selectedAlgo.value === 'bubbleSort' ? BubbleSort() : 
      selectedAlgo.value === 'insertionSort' ? InsertionSort() :  
      selectedAlgo.value === 'heapSort' ? HeapSort() : 
      selectedAlgo.value === 'quickSort' ? QuickSort() : null
  }

  const HandleReset = () => {
    SetDefaultColors()
    setState(genRandomArray(arraySize))
    setHasSolution(false)
  }

  const HandleSizeChange = () => {
    const slider = document.getElementById('elementSlider') as HTMLInputElement
    SetDefaultColors()
    setArraySize(parseInt(slider.value))
    setState(genRandomArray(parseInt(slider.value)))
    setHasSolution(false)
  }

  const HandleSpeedChange = () => {
    const slider = document.getElementById('speedSlider') as HTMLInputElement
    setSpeedState(parseInt(slider.value))
  }

  const HandleGitHubClick = () => {
    window.open("https://github.com/JCrews253/sorting-visualizer")
  }

  const HandleHomeClick = () => {
    window.open('https://jamesrcrews.com','_self')
  }

  const SetDefaultColors = () => {
    const sb = document.getElementsByClassName('sorting-bar') as HTMLCollectionOf<HTMLElement>
    for(let i = 0; i < sb.length; i++) {
        sb[i].style.backgroundColor = ColorGenerator(parseInt(sb[i].style.height))
    }       
  }

  const FinishAnimation = () => {
    const sb = document.getElementsByClassName('sorting-bar') as HTMLCollectionOf<HTMLElement>
    for(let j = 1; j < sb.length; j++){
      setTimeout( () => {
        sb[j-1].style.backgroundColor = ColorGenerator(parseInt(sb[j-1].style.height))
        sb[j].style.backgroundColor = 'white'
        if(j === sb.length-1) {
          sb[j].style.backgroundColor = ColorGenerator(parseInt(sb[j].style.height))
          setSortingState(false)
          setHasSolution(true)
        }
      },  j * speedState)
    }
  }

  const ColorGenerator = (value: number): string => {
    let r = 0, g = 0, b = 0
    const step = MAX_ELEMENT_SIZE_PX/1275
    if(value <= step*255){r=255; g=value/step; b=0}
    else if(value <= step*255*2){r=255-(value/step-255); g=255; b=0}
    else if(value <= step*255*3){r=0; g=255; b=value/step-255*2}
    else if(value <= step*255*4){r=0; g=255-(value/step-255*3); b=255}
    else if(value <= step*255*5){r=value/step-255*4; g=0; b=255}
    return `rgb(${Math.floor(r)} ${Math.floor(g)} ${Math.floor(b)})`
  }

  const MergeSort = () => {
    const intData = GetMergeSortData(state.slice())
    const sb = document.getElementsByClassName('sorting-bar') as HTMLCollectionOf<HTMLElement>
    for(let i = 1; i < intData.length; i++){
      setTimeout(() => {
        SetDefaultColors()
        sb[intData[i].iIndex].style.backgroundColor = 'white'
        sb[intData[i].jIndex].style.backgroundColor = 'white'
        sb[intData[i].changedIndex].style.backgroundColor = `white`
        sb[intData[i].changedIndex].style.height = `${intData[i].changedValue}px`
        if(i === intData.length-1) FinishAnimation()
      }, i * speedState)
    }
  }

  const BubbleSort = () => {
    const intData = GetBubbleSortData(state.slice())
    const sb = document.getElementsByClassName('sorting-bar') as HTMLCollectionOf<HTMLElement>
    for(let i = 0; i < intData.length; i++){
      setTimeout( () => {
        SetDefaultColors()
        sb[intData[i].Index].style.backgroundColor = 'white'
        sb[intData[i].CompareIndex].style.backgroundColor = 'white'
        sb[intData[i].Index].style.height = `${intData[i].IndexValue}px`
        sb[intData[i].CompareIndex].style.height = `${intData[i].CompareValue}px`
        if(i === intData.length-1) FinishAnimation()
      }, i * speedState)
    }
  }

  const InsertionSort = () => {
    const intData = GetInsertionSortData(state.slice())
    const sb = document.getElementsByClassName('sorting-bar') as HTMLCollectionOf<HTMLElement>
    for(let i = 0; i < intData.length; i++){
      setTimeout(() => {
        SetDefaultColors()
        sb[intData[i].iIndex].style.backgroundColor = 'white'
        sb[intData[i].jIndex].style.backgroundColor = 'white'
        sb[intData[i].jIndex].style.height = `${intData[i].Key}px`
        sb[intData[i].jIndex + 1].style.height = `${intData[i].jValue}px`
        sb[intData[i].jIndex + 1].style.backgroundColor = ColorGenerator(parseInt(sb[intData[i].jIndex + 1].style.height))       
        if(i === intData.length-1) FinishAnimation()     
      }, i * speedState)
    }
  }

  const HeapSort = () => {
    const intData = GetHeapSortData(state.slice())
    const sb = document.getElementsByClassName('sorting-bar') as HTMLCollectionOf<HTMLElement>
    for(let i = 0; i < intData.length; i++){
      setTimeout( ()=> {
        SetDefaultColors()
        sb[intData[i].swap1].style.backgroundColor = 'white'
        sb[intData[i].swap2].style.backgroundColor = 'white'
        sb[intData[i].swap1].style.height = `${intData[i].swap2Value}px`
        sb[intData[i].swap2].style.height = `${intData[i].swap1Value}px`
        if(i === intData.length-1) FinishAnimation()
      }, i * speedState)
    }
  }

  const QuickSort = () => {
    const intData = GetQuickSortData(state.slice())
    const sb = document.getElementsByClassName('sorting-bar') as HTMLCollectionOf<HTMLElement>
    for(let i = 0; i < intData.length; i++){
      setTimeout( ()=> {
        SetDefaultColors()
        sb[intData[i].iIndex].style.backgroundColor = 'white'
        sb[intData[i].jIndex].style.backgroundColor = 'white'
        sb[intData[i].pivot].style.backgroundColor = 'white'
        sb[intData[i].iIndex].style.height = `${intData[i].iValue}px`
        sb[intData[i].jIndex].style.height = `${intData[i].jValue}px`
        if(i === intData.length-1) FinishAnimation()
      }, i * speedState)
    }
  }

  return (
    <div className="App">
      <div className='toolbar'>
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <button 
          className='icon-button'
          onClick={HandleHomeClick}>
            <i className="fa fa-home"/>
        </button>
        <button 
          className='icon-button'
          onClick={HandleStart}
          disabled= {sortingState}>
            <i className="fa fa-play"/>
        </button>
        <div className='toolbar-div'>
          <label 
            className='toolbar-label' 
            htmlFor='algo-select'>Algorithm:
          </label>
          <select 
            id='algo-select' 
            onChange={HandleReset} 
            disabled= {sortingState}
            >
            <option value='mergeSort'>Merge</option>
            <option value='quickSort'>Quick</option>
            <option value='heapSort'>Heap</option>
            <option value='bubbleSort'>Bubble</option>
            <option value='insertionSort'>Insertion</option>
          </select>
        </div>
        <div className='toolbar-div'>
          <label 
            className='toolbar-label' 
            htmlFor='elementSlider'>Elements:
          </label>
          <input 
            id='elementSlider'
            className='slider' 
            type='range' 
            onChange={HandleSizeChange}
            min='20'
            max='200'
            value={arraySize}
            disabled={sortingState}/>
            <label>{arraySize}</label>
        </div>
        <div className='toolbar-div'>
          <label 
            className='toolbar-label' 
            htmlFor='speedSlider'>Delay:
          </label>
          <input 
            id='speedSlider'
            className='slider' 
            type='range' 
            onChange={HandleSpeedChange}
            min='1'
            max='100'
            value={speedState}
            disabled={sortingState}/>
            <label>{speedState} ms</label>
        </div>
        <button 
          className='icon-button'
          onClick={HandleReset}
          disabled= {sortingState}>
            <i className="fa fa-random"/>
        </button>
        <button 
          className='button-end icon-button'
          onClick={HandleGitHubClick}>
            <i className="fa fa-github"/>
        </button>
      </div>
      <div className='sorting-area'>
        {state.map((value, index) => (
          <div className='sorting-bar'
          key = {index}
          style={{
            backgroundColor: `${ColorGenerator(value)}`,
            height: `${value}px`
          }}>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
