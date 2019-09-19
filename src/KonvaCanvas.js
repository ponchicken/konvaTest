import React, { useEffect, useState, useRef } from 'react'
import { Stage, Layer, Image, Text } from 'react-konva'
import { getDataUrl, downloadFromUrl } from './helpers'

const cWidth = 600
const cHeight = 500

const calcProportions = ({ width, height }) => {
  return width / height
}

const KonvaCanvas = () => {
  const canvasEl = useRef(null)
  const [image, setImage] = useState(null)
  const [coords, setCoords] = useState({
    width: cWidth,
    height: cHeight
  })

  const [scale, setScale] = useState({
    x: 1,
    y: 1
  })

  const onDownloadClick = () => {
    console.log('onDownloadClick1', canvasEl.current.getStage().toDataURL())
    const url = HTMLCanvasElement.prototype.toDataURL.call(
      canvasEl.current.getStage()
    )
    console.log(url)
    downloadFromUrl({
      url,
      filename: 'image'
    })
  }

  const loadImage = () => {
    const imageUrl = 'https://wallpaperplay.com/walls/full/c/5/3/34778.jpg'
    const imageEl = new window.Image()
    imageEl.src = imageUrl

    imageEl.addEventListener('load', () => {
      const { width, height } = imageEl
      const proportions = calcProportions({ width, height })

      const imageWidth = 600
      const imageHeight = imageWidth / proportions
      const x = 0
      const y = (cHeight - imageHeight) / 2

      setCoords({
        width,
        height
      })

      setScale({
        x: 0.1,
        y: 0.1
      })

      setImage(imageEl)
    })
  }

  useEffect(() => {
    loadImage()
  }, [])

  const text =
    '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus temporibus, sunt alias dignissimos assumenda ab numquam porro quam consectetur doloremque error praesentium hic doloribus, iusto soluta nulla libero dolore non illo, consequuntur quos. Sed repellendus est dolorem, eum necessitatibus, fugit quasi blanditiis libero ipsum, quod fugiat corrupti assumenda voluptates animi!'

  return (
    <>
      <Stage width={cWidth} height={cHeight} ref={canvasEl}>
        <Layer>
          <Image
            image={image}
            width={coords.width}
            height={coords.height}
            x={0}
            y={0}
            scale={scale}
          />
          <Text text={text} width={600} fontSize={20} fill="#fff" />
        </Layer>
      </Stage>

      <button onClick={onDownloadClick}>download</button>
    </>
  )
}

export default KonvaCanvas
