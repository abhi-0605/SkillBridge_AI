import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';

pdfjsLib.GlobalWorkerOptions.workerSrc= new URL(
    'pdfjs-dist/build/pdf.worker.min.js', 
    import.meta.url
).toString();

export const extractTextviaOCR = async (file,OnProgress) =>{
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;

    let fullText = '';

    for(let i = 1; i <= pdf.numPages; i++){
        const page = await pdf.getPage(i);
        const viewport= page.getViewport({scale: 2});

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');

        await page.render({canvasContext: context, viewport}).promise;

        const imageDataUrl = canvas.toDataURL('image/png');

        const result = await Tesseract.recognize(imageDataUrl, 'eng', {
            logger: (info) => {
                if(info.status === 'recognizing text' && OnProgress){
                    const pageProgress = (i-1+info.progress)/pdf.numPages;
                    OnProgress(info);
                }
            },
        });
        fullText += result.data.text+'\n';
    }
    return fullText.trim();
} 