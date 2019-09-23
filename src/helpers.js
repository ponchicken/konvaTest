function fit(cover) {
  return (parentWidth, parentHeight, childWidth, childHeight) => {
    const doRatio = childWidth / childHeight
    const cRatio = parentWidth / parentHeight
    let width = parentWidth
    let height = parentHeight

    if (cover ? doRatio > cRatio : doRatio < cRatio) {
      height = width / doRatio
    } else {
      width = height * doRatio
    }

    return {
      width,
      height,
      x: (parentWidth - width) / 2,
      y: (parentHeight - height) / 2
    }
  }
}

export const contain = fit(true)
export const cover = fit(false)

export function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' '),
    line = '',
    lineCount = 0,
    i,
    test,
    metrics

  for (i = 0; i < words.length; i++) {
    test = words[i]
    metrics = context.measureText(test)
    while (metrics.width > maxWidth) {
      // Determine how much of the word will fit
      test = test.substring(0, test.length - 1)
      metrics = context.measureText(test)
    }
    if (words[i] !== test) {
      words.splice(i + 1, 0, words[i].substr(test.length))
      words[i] = test
    }

    test = line + words[i] + ' '
    metrics = context.measureText(test)

    if (metrics.width > maxWidth && i > 0) {
      context.fillText(line, x, y)
      line = words[i] + ' '
      y += lineHeight
      lineCount++
    } else {
      line = test
    }
  }

  context.fillText(line, x, y)
}

export const downloadFromUrl = async ({ url, filename = 'file' }) => {
  const response = await fetch(url)
  const blob = await response.blob()
  const blobUrl = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = blobUrl
  link.download = filename
  link.click()
}

export const getDataUrl = ref => {
  return HTMLCanvasElement.prototype.toDataURL.call(ref.current)
}
