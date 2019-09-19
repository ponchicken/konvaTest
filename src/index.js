import React from 'react'
import ReactDOM from 'react-dom'

import Canvas from './Canvas'
import KonvaCanvas from './KonvaCanvas'
import './styles.css'

function App() {
  return (
    <div className="App">
      <KonvaCanvas />
      {/* <Canvas /> */}
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
