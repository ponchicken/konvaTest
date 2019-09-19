import React, { useEffect, useState, useRef } from 'react'
import { Stage, Layer, Text, Image, Rect } from 'react-konva'
import useImage from 'use-image'
import { cover, contain, downloadFromUrl } from './helpers'

const bg = require('./assets/bg.jpg')

const cWidth = 700
const cHeight = 500
const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus temporibus, sunt alias dignissimos assumenda ab numquam porro quam consectetur doloremque error praesentium hic doloribus, iusto soluta nulla libero dolore non illo, consequuntur quos. Sed repellendus est dolorem, eum necessitatibus, fugit quasi blanditiis libero ipsum, quod fugiat corrupti assumenda voluptates animi!'

const KonvaCanvas = () => {
  const stageRef = useRef()
  const [image, imageStatus] = useImage(`${bg}`)
  const [imageParams, setImageParams] = useState({})

  useEffect(() => {
    if (imageStatus === 'loaded') {
      setImageParams(cover(
        cWidth,
        cHeight,
        image.naturalWidth,
        image.naturalHeight
      ))
    }
  }, [image, imageStatus])

  const onDownloadClick = () => {
    const url = stageRef.current.toDataURL()
    downloadFromUrl({
      url,
      filename: 'image.png'
    })
  }

  return (
    <>
      <Stage width={cWidth} height={cHeight} ref={stageRef}>
        <Layer>
          <Image
            image={image}
            {...imageParams}
          />
          <Rect
            width={cWidth}
            height={200}
            x={0}
            y={100}
            opacity={0.5}
            fill='#000'
          />
          <Text
            text="In vino veritas"
            fontSize={50}
            width={cWidth}
            x={100}
            y={200}
            fill='#eee'
          />
        </Layer>
      </Stage>
      <button onClick={onDownloadClick}>download</button>
    </>
  )
}

export default KonvaCanvas
