import React, { useEffect, useState, useRef } from 'react'
import { Stage, Layer, Text, Image, Rect, Group, Label, Tag } from 'react-konva'
import useImage from 'use-image'
import { cover, contain, downloadFromUrl } from './helpers'

const bg = require('./assets/bg.jpg')

const cWidth = 1200
const cHeight = 500
const vCenter = cHeight / 2
const previewWidth = 600

const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus temporibus, sunt alias dignissimos assumenda ab numquam porro quam consectetur doloremque error praesentium hic doloribus, iusto soluta nulla libero dolore non illo, consequuntur quos. Sed repellendus est dolorem, eum necessitatibus, fugit quasi blanditiis libero ipsum, quod fugiat corrupti assumenda voluptates animi!'

const inVino = 'In vino veritas!'

const ReactConva = () => {
  const stageRef = useRef(null)
  const tagRef = useRef(null)

  const [image, imageStatus] = useImage(`${bg}`)
  const [imageParams, setImageParams] = useState({})

  const [labeOffsetY, setLabeOffsetY] = useState(null)
  const [scale, setScale] = useState(1)

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
    }
  }, [image, imageStatus])

  // vertical centering text with its background
  useEffect(() => {
    if (tagRef.current) {
      setLabeOffsetY(tagRef.current.attrs.height / 2)
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
              opacity={0.5}
              fill='#000'
            />
            <Text
              text={text}
              fontSize={30}
              lineHeight={1.2}
              width={cWidth}
              fill='#eee'
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
