import mammoth from 'mammoth';

export const extractTextFromDocx=async(file) =>{
    const arrayBuffer=await file.arrayBuffer()

    const result=await mammoth.extractRawText({arrayBuffer})
    return result.value.trim()
}