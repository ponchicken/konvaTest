import React, { useEffect, useState, useMemo } from 'react'
import Konva from 'konva'
import uuid from 'uuid/v1'
import { cover, contain } from './helpers'

const cWidth = 600
const cHeight = 500
const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus temporibus, sunt alias dignissimos assumenda ab numquam porro quam consectetur doloremque error praesentium hic doloribus, iusto soluta nulla libero dolore non illo, consequuntur quos. Sed repellendus est dolorem, eum necessitatibus, fugit quasi blanditiis libero ipsum, quod fugiat corrupti assumenda voluptates animi!'

const calcProportions = ({ width, height }) => {
  return width / height
}

const KonvaCanvas = () => {
  const [stage, setStage] = useState(null)
  const [image, setImage] = useState(null)
  const [coords, setCoords] = useState({
    width: cWidth,
    height: cHeight
  })

  const [scale, setScale] = useState({
    x: 1,
    y: 1
  })

  const id = useMemo(uuid, [])
  const layer = useMemo(() => new Konva.Layer(), [])

  const loadImage = () => {
    console.log('loadImage')
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

      const coverImg =  cover(
        cWidth,
        cHeight,
        imageEl.naturalWidth,
        imageEl.naturalHeight
      )

      console.log(coverImg)

      const konvaImg = new Konva.Image({
        ...coverImg,
        image: imageEl
      })

      console.log(layer)

      // setImage(imageEl)
      layer.add(konvaImg)
      layer.batchDraw()
    })
  }

  useEffect(() => {
    setStage(new Konva.Stage({
      container: id,
      width: cWidth,
      height: cHeight
    }))
  }, [])

  useEffect(() => {
    if (stage && layer) {
      stage.add(layer)
    }
  }, [stage, layer])

  useEffect(() => {
    if (layer) {
      loadImage()
    }
  }, [layer])

  const onDownloadClick = () => {
    console.log(stage.toDataURL({ pixelRatio: 3 }))
  }

  console.log(id)
  return (
    <>
      <div id={id}></div>
    </>
  )
}

export default KonvaCanvas
