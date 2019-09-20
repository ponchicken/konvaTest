import React, { useEffect, useState, useRef } from 'react'
import { Stage, Layer, Text, Image, Rect, Group, Label, Tag } from 'react-konva'
import useImage from 'use-image'
import { cover, contain, downloadFromUrl } from './helpers'

const bg = require('./assets/bg.jpg')

const cWidth = 1200
const cHeight = 800
// const padding = 
const vCenter = cHeight / 2
const previewWidth = 600
const substrateColor = '#000a'
const textColor = '#eee'
const fontSize = 40

const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus temporibus, sunt alias dignissimos assumenda ab numquam porro quam consectetur doloremque error praesentium hic doloribus, iusto soluta nulla libero dolore non illo, consequuntur quos. Sed repellendus est dolorem, eum necessitatibus, fugit quasi blanditiis libero ipsum, quod fugiat corrupti assumenda voluptates animi!'

const inVino = 'In vino veritas!'

const ReactConva = ({
  onReady
}) => {
  const stageRef = useRef(null)
  const tagRef = useRef(null)

  const [image, imageStatus] = useImage(`${bg}`)
  const [imageParams, setImageParams] = useState({})

  const [labeOffsetY, setLabeOffsetY] = useState(null)
  const [scale, setScale] = useState(0)

  const [ready, setReady] = useState({
    image: false,
    text: false
  })

  const isReady = Object.values(ready).every(Boolean)

  useEffect(() => {
    const calcScale = previewWidth / cWidth
    setScale(calcScale)
  }, [])

  // crop and cover image
  useEffect(() => {
    if (imageStatus === 'loaded') {
      setImageParams(cover(
        cWidth,
        cHeight,
        image.naturalWidth,
        image.naturalHeight
      ))
      setReady({
        ...ready, image: true
      })
    }
  }, [image, imageStatus])

  // vertical centering text with its background
  useEffect(() => {
    if (tagRef.current) {
      setLabeOffsetY(tagRef.current.attrs.height / 2)
      setReady({
        ...ready, text: true
      })
    }
  }, [tagRef])

  // downloda as image
  const onDownloadClick = () => {
    if (stageRef.current) {
      const url = stageRef.current.toDataURL({
        pixelRatio: 1 / scale
      })
      downloadFromUrl({
        url,
        filename: 'image.png'
      })
    }
  }

  useEffect(() => {
    if(isReady) {
      if (stageRef.current) {
        const url = stageRef.current.toDataURL({
          pixelRatio: 1 / scale
        })
        onReady(url)
      }
    }
  }, [isReady])



  return (
    <>
      <Stage
        width={cWidth * scale}
        height={cHeight * scale}
        ref={stageRef}
        scale={{
          x: scale,
          y: scale
        }}
        visible={isReady}
      >
        <Layer>
          <Image
            image={image}
            {...imageParams}
          />
          <Label
            x={0}
            y={vCenter}
            offsetY={labeOffsetY}
            visible={labeOffsetY !== null}
          >
            <Tag
              ref={tagRef}
              width={cWidth}
              height={200}
              fill={substrateColor}
            />
            <Text
              text={text}
              fontSize={fontSize}
              lineHeight={1.2}
              width={cWidth}
              fill={textColor}
              padding={20}
            />
          </Label>
        </Layer>
      </Stage>
      <button onClick={onDownloadClick}>download</button>
    </>
  )
}

export default ReactConva
