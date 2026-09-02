import * as pdfjsLib from 'pdfjs-dist'
import Tesseract from 'tesseract.js'

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@6.3.289/build/pdf.worker.min.mjs`

export const extractTextViaOCR = async (file, onProgress) => {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  let fullText = ''

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const viewport = page.getViewport({ scale: 2 })

    const canvas = document.createElement('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    const context = canvas.getContext('2d')

    await page.render({ canvasContext: context, viewport }).promise

    const imageDataUrl = canvas.toDataURL('image/png')

    const result = await Tesseract.recognize(imageDataUrl, 'eng', {
      logger: (info) => {
        if (info.status === 'recognizing text' && onProgress) {
          const pageProgress = (i - 1 + info.progress) / pdf.numPages
          onProgress(pageProgress)
        }
      },
    })

    fullText += result.data.text + '\n'
  }

  return fullText.trim()
}