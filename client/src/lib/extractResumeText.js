import { extractTextFromPdf } from './pdfParser.js'
import { extractTextFromDocx } from './docxParser.js'
import { extractTextviaOCR } from './ocrParser.js'

export const extractResumeText = async (file, onProgress) => {
    const ext = file.name.split('.').pop().toLowerCase()

    if(ext === 'pdf'){
        const text = await extractTextFromPdf(file)

        // If the extracted text is empty, fallback to OCR
        if(text.trim().length <50){
            const ocrText = await extractTextviaOCR(file, onProgress)
            return {text: ocrText, fileType:'pdf',usedOCR:true}
        }

        return {text, fileType:'pdf',usedOCR:false}
    }

    if(ext==='docx'){
        return {text: await extractTextFromDocx(file),fileType:'docx',usedOCR:false}
    }

    throw new Error('Unsupported file type. Please upload a PDF or DOCX file.')
}

