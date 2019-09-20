import React from 'react'
import ReactDOM from 'react-dom'

import Canvas from './Canvas'
import KonvaCanvas from './KonvaCanvas'
import ReactKonva from './ReactKonva'
import './styles.css'

function App() {
  return (
    <div className="App">
      <ReactKonva
        onReady={image => console.log(image)}
      />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
