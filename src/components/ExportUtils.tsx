
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';

export const exportAsImage = async (htmlCode: string, cssCode: string) => {
  try {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.width = '1200px';
    container.style.height = 'auto';
    container.style.background = 'white';
    
    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode.replace(/<!DOCTYPE.*?<body[^>]*>/is, '').replace(/<\/body>.*$/is, '')}
      </body>
      </html>
    `;
    
    container.innerHTML = htmlCode.includes('<html') ? 
      htmlCode.replace(/<!DOCTYPE.*?<body[^>]*>/is, '').replace(/<\/body>.*$/is, '') : 
      htmlCode;
    
    const style = document.createElement('style');
    style.textContent = cssCode;
    container.appendChild(style);
    
    document.body.appendChild(container);
    
    const canvas = await html2canvas(container, {
      width: 1200,
      height: container.scrollHeight,
      backgroundColor: '#ffffff',
      scale: 1,
      useCORS: true,
      allowTaint: true
    });
    
    document.body.removeChild(container);
    
    const link = document.createElement('a');
    link.download = 'website-preview.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    return true;
  } catch (error) {
    console.error('Error exporting image:', error);
    throw new Error('Failed to export image. Please try again.');
  }
};

export const exportAsPDF = async (htmlCode: string, cssCode: string) => {
  try {
    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode.includes('<html') ? 
          htmlCode.replace(/<!DOCTYPE.*?<body[^>]*>/is, '').replace(/<\/body>.*$/is, '') : 
          htmlCode}
      </body>
      </html>
    `;
    
    const element = document.createElement('div');
    element.innerHTML = fullHTML;
    
    const options = {
      margin: 1,
      filename: 'website-preview.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    await html2pdf().set(options).from(element).save();
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Failed to export PDF. Please try again.');
  }
};
