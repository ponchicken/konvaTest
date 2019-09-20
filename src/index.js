import React from 'react'
import ReactDOM from 'react-dom'

import Canvas from './Canvas'
import KonvaCanvas from './KonvaCanvas'
import ReactKonva from './ReactKonva'
import './styles.css'

function App() {
  const images = []
  setTimeout(() => {
    console.log(images)
  }, 1000)

  return (
    <div className="App">
      {
        new Array(1).fill(' ').map((_, i) => (
          <ReactKonva key={i} onReady={image => images.push(image)} />
        ))
      }
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
