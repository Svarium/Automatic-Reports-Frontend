import { useRef, useState } from 'react';
import { useReport } from '../../context/ReportContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import PDFTemplate from './PDFTemplate';
import './PDFExport.css';

const PDFExport = () => {
    const { reportData, validateReport, setSchoolName, setMentorName } = useReport();
    const [generating, setGenerating] = useState(false);
    const pdfContentRef = useRef(null);

    const executePDFGeneration = async () => {
        setGenerating(true);

        try {
            // Esperar un momento para que el DOM se renderice con los nuevos datos (nombre mentor/colegio)
            await new Promise(resolve => setTimeout(resolve, 500));

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
            const schoolNameSafe = reportData.school.id.replace(/[^a-z0-9]/gi, '_');
            const date = new Date().toISOString().split('T')[0];
            const fileName = `Reporte_${schoolNameSafe}_${date}.pdf`;

            // Descargar
            pdf.save(fileName);

            // Éxito
            Swal.fire({
                icon: 'success',
                title: '¡Reporte Generado!',
                text: 'El PDF se ha descargado correctamente.',
                timer: 3000,
                showConfirmButton: false
            });

        } catch (error) {
            console.error('Error al generar PDF:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al generar el PDF. Por favor, intentá nuevamente.'
            });
        } finally {
            setGenerating(false);
        }
    };

    const handleGenerateClick = async () => {
        if (!reportData) return;

        // 1. Validar
        const validation = validateReport();
        if (!validation.valid) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'warning', // Usamos warning o error según preferencia, warning es menos agresivo
                title: 'Faltan completar datos',
                html: `<div style="text-align: left; font-size: 0.9em;">${validation.errors.map(e => `• ${e}`).join('<br>')}</div>`,
                showConfirmButton: false,
                timer: 6000,
                timerProgressBar: true,
                background: '#fff',
                iconColor: '#ff8d7a'
            });
            return;
        }

        // 2. Modal de Confirmación y Datos Finales
        const { value: formValues } = await Swal.fire({
            title: 'Preparando Reporte',
            html:
                '<div style="text-align: left; padding: 0 10px;">' +
                '<label style="display:block; margin-bottom:5px; font-weight:600; color:#444; font-size:14px;">Nombre del Colegio</label>' +
                `<input id="swal-input-school" class="swal2-input" style="margin:0 0 20px 0; width:100%; box-sizing:border-box;" value="${reportData.school.id}">` +
                '<label style="display:block; margin-bottom:5px; font-weight:600; color:#444; font-size:14px;">Mentor responsable</label>' +
                '<input id="swal-input-mentor" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box;" placeholder="Nombre y Apellido">' +
                '<div style="font-size: 12px; color: #888; margin-top: 5px;">Este nombre aparecerá en el pie de página del reporte.</div>' +
                '</div>',
            focusConfirm: false,
            confirmButtonText: 'Descargar PDF',
            confirmButtonColor: '#00cc7e',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const school = document.getElementById('swal-input-school').value;
                const mentor = document.getElementById('swal-input-mentor').value;

                if (!school.trim()) {
                    Swal.showValidationMessage('El nombre del colegio es obligatorio');
                    return false;
                }
                if (!mentor.trim()) {
                    Swal.showValidationMessage('Debes ingresar el nombre del mentor');
                    return false;
                }

                return { school, mentor };
            }
        });

        if (formValues) {
            // Actualizar contexto
            setSchoolName(formValues.school);
            setMentorName(formValues.mentor);

            // Proceder a generar
            executePDFGeneration();
        }
    };

    return (
        <>
            <div className="pdf-export-container">
                <button
                    className="export-button btn btn-primary"
                    onClick={handleGenerateClick}
                    disabled={generating || !reportData}
                >
                    {generating ? '📄 Procesando...' : '📄 Generar Informe PDF'}
                </button>
            </div>

            {/* Template oculto para PDF */}
            <PDFTemplate contentRef={pdfContentRef} />
        </>
    );
};

export default PDFExport;
