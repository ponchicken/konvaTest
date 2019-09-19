import React, { useEffect, useState, useMemo } from 'react'
import Konva from 'konva'
import uuid from 'uuid/v1'
import { cover, contain, downloadFromUrl } from './helpers'

const bg = require('./assets/bg.jpg')

const cWidth = 700
const cHeight = 500
const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus temporibus, sunt alias dignissimos assumenda ab numquam porro quam consectetur doloremque error praesentium hic doloribus, iusto soluta nulla libero dolore non illo, consequuntur quos. Sed repellendus est dolorem, eum necessitatibus, fugit quasi blanditiis libero ipsum, quod fugiat corrupti assumenda voluptates animi!'

const KonvaCanvas = () => {
  const [stage, setStage] = useState(null)
  const id = useMemo(uuid, [])

  const loadImage = async () => {
    const layer = new Konva.Layer()
    const imageUrl = bg
    const imageEl = new window.Image()
    imageEl.src = `${imageUrl}`

    imageEl.addEventListener('load', () => {
      const coverImg =  cover(
        cWidth,
        cHeight,
        imageEl.naturalWidth,
        imageEl.naturalHeight
      )

      const konvaImg = new Konva.Image({
        ...coverImg,
        image: imageEl
      })

      // setImage(imageEl)
      layer.add(konvaImg)
      layer.batchDraw()
    })

    return layer
  }

  const loadText = () => {
    const layer = new Konva.Layer()
    var complexText = new Konva.Text({
      x: 0,
      y: 60,
      text:
        "All the world's a stage, and all the men and women merely players. They have their exits and their entrances.",
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#eee',
      width: cWidth,
      padding: 20,
      align: 'left'
    });

    var rect = new Konva.Rect({
      x: 0,
      y: 60,
      fill: '#000',
      width: cWidth,
      height: complexText.height(),
      opacity: 0.8
    });

    // add the shapes to the layer
    layer.add(rect)
    layer.add(complexText)
    stage.add(layer)
  }

  useEffect(() => {
    setStage(new Konva.Stage({
      container: id,
      width: cWidth,
      height: cHeight
    }))
  }, [])

  useEffect(() => {
    if (stage) {
      loadImage()
        .then((layer) => {
          stage.add(layer)
          loadText()
        })
    }
  }, [stage])

  const onDownloadClick = () => {
    const url = stage.toDataURL()
    downloadFromUrl({
      url,
      filename: 'image.png'
    })
  }

  return (
    <>
      <div id={id}></div>
      <button onClick={onDownloadClick}>download</button>
    </>
  )
}

export default KonvaCanvas
