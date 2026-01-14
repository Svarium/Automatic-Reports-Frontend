import { useRef, useState } from 'react';
import { useReport } from '../../context/ReportContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PDFTemplate from './PDFTemplate';
import './PDFExport.css';

const PDFExport = () => {
    const { reportData } = useReport();
    const [generating, setGenerating] = useState(false);
    const pdfContentRef = useRef(null);

    const generatePDF = async () => {
        if (!reportData) return;

        setGenerating(true);

        try {
            // Esperar un momento para que el DOM se renderice
            await new Promise(resolve => setTimeout(resolve, 100));

            const element = pdfContentRef.current;

            // Capturar el contenido como imagen
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');

            // Crear PDF
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            // Agregar primera página
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Agregar páginas adicionales si es necesario
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Generar nombre del archivo
            const schoolName = reportData.school.id.replace(/[^a-z0-9]/gi, '_');
            const date = new Date().toISOString().split('T')[0];
            const fileName = `Reporte_${schoolName}_${date}.pdf`;

            // Descargar
            pdf.save(fileName);
        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Hubo un error al generar el PDF. Por favor, intentá nuevamente.');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <>
            <div className="pdf-export-container">
                <button
                    className="export-button btn btn-primary"
                    onClick={generatePDF}
                    disabled={generating || !reportData}
                >
                    {generating ? '📄 Generando PDF...' : '📄 Generar Informe PDF'}
                </button>
            </div>

            {/* Template oculto para PDF */}
            <PDFTemplate contentRef={pdfContentRef} />
        </>
    );
};

export default PDFExport;
