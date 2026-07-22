import { extractTextFromPdf } from './pdfParser.js'
import { extractTextFromDocx } from './docxParser.js'

export const extractResumeText = async (file) => {
    const ext = file.name.split('.').pop().toLowerCase()

    if(ext === 'pdf'){
        return {text: await extractTextFromPdf(file),fileType:'pdf'}
    }

    if(ext==='docx'){
        return {text: await extractTextFromDocx(file),fileType:'docx'}
    }

    throw new Error('Unsupported file type. Please upload a PDF or DOCX file.')
}

