import { useEffect } from 'react';
import { createWorker } from 'tesseract.js';


const ComprobantesOcrTable = () => {


    const convertirAEscalaDeGrises = (base64Image: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const gris = 0.299 * r + 0.587 * g + 0.114 * b;

        data[i] = gris;     // Rojo
        data[i + 1] = gris; // Verde
        data[i + 2] = gris; // Azul
      }

      ctx.putImageData(imageData, 0, 0);

      resolve(canvas.toDataURL("image/jpeg"));
    };

    img.onerror = reject;
    img.src = base64Image;
  });
};

  (async () => {
    const imagenOriginal = 'https://imgv2-2-f.scribdassets.com/img/document/745240940/original/be98d06396/1?v=1';

    const imagenGris = await convertirAEscalaDeGrises(imagenOriginal);

    const worker = await createWorker('eng');
    const ret = await worker.recognize(imagenGris);

    console.log(ret);
    console.log(ret.data.text);

    await worker.terminate();
  })();




  return (
    <div>ComprobantesOcrTable</div>
  )
}

export default ComprobantesOcrTable