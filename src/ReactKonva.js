import React, { useEffect, useState, useRef } from 'react'
import { Stage, Layer, Text, Image, Rect, Group, Label, Tag } from 'react-konva'
import useImage from 'use-image'
import { cover, contain, downloadFromUrl } from './helpers'

const bg = require('./assets/bg.jpg')

const cWidth = 700
const cHeight = 500
const vCenter = cHeight / 2

const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus temporibus, sunt alias dignissimos assumenda ab numquam porro quam consectetur doloremque error praesentium hic doloribus, iusto soluta nulla libero dolore non illo, consequuntur quos. Sed repellendus est dolorem, eum necessitatibus, fugit quasi blanditiis libero ipsum, quod fugiat corrupti assumenda voluptates animi!'

const ReactConva = () => {
  const stageRef = useRef(null)
  const tagRef = useRef(null)

  const [image, imageStatus] = useImage(`${bg}`)
  const [imageParams, setImageParams] = useState({})

  const [labeOffsetY, setLabeOffsetY] = useState(null)

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

  useEffect(() => {
    if (tagRef.current) {
      // vertical centering text with its background
      setLabeOffsetY(tagRef.current.attrs.height / 2)
    }
  }, [tagRef])

  const onDownloadClick = () => {
    if (stageRef.current) {
      const url = stageRef.current.toDataURL()
      downloadFromUrl({
        url,
        filename: 'image.png'
      })
    }
  }

  return (
    <>
      <Stage width={cWidth} height={cHeight} ref={stageRef}>
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
            draggable
          >
            <Tag
              ref={tagRef}
              width={cWidth}
              height={200}
              opacity={0.5}
              fill='#000'
            />
            <Text
              text="In vino veritas"
              fontSize={50}
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
