import React, { useRef, useState, useEffect } from 'react'

import { cover, wrapText } from './helpers'

const cWidth = 600
const cHeight = 500

const loadImg = ctx => {
  return new Promise(resolve => {
    const imageEl = new Image()
    imageEl.src = 'https://wallpaperplay.com/walls/full/c/5/3/34778.jpg'

    imageEl.addEventListener('load', () => {
      const { x, y, width, height } = cover(
        imageEl.naturalWidth,
        imageEl.naturalHeight,
        cWidth,
        cHeight
      )

      ctx.drawImage(imageEl, x, y, width, height, 0, 0, cWidth, cHeight)
      resolve()
    })
  })
}

const drawSubstrate = ctx => {
  ctx.fillStyle = 'rgba(30, 40, 20, 0.9)'
  ctx.fillRect(0, 140, 600, 200)
}

function drawText(ctx) {
  ctx.fillStyle = '#fff'
  ctx.font = '48px sans-serif'
  const text = 'Hello world Hello world Hello world Hello world fsdf  sdf sd f'

  ctx.strokeText(text, 10, 50, cWidth)
  wrapText(ctx, text, 20, 200, 500, 50)

  return {}
}

const draw = async ctx => {
  await loadImg(ctx)
  await drawSubstrate(ctx)
  await drawText(ctx)
}

const Canvas = () => {
  const canvasEl = useRef(null)
  const [ctx, setCtx] = useState(null)

  useEffect(() => {
    if (canvasEl) {
      setCtx(canvasEl.current.getContext('2d'))
    }
  }, [canvasEl])

  useEffect(() => {
    if (ctx) {
      draw(ctx)
    }
  }, [ctx])

  return (
    <>
      <canvas ref={canvasEl} width={cWidth} height={cHeight} />
    </>
  )
}

export default Canvas
