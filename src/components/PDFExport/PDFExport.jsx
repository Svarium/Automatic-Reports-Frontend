import { useRef, useState } from 'react';
import { useReport } from '../../context/ReportContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import PDFTemplate from './PDFTemplate';
import './PDFExport.css';

const PDFExport = () => {
    const { reportData, validateReport, setSchoolName, setMentorName, t } = useReport();
    const [generating, setGenerating] = useState(false);
    const pdfContentRef = useRef(null);

    const executePDFGeneration = async () => {
        setGenerating(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const element = pdfContentRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const schoolNameSafe = reportData.school.id.replace(/[^a-z0-9]/gi, '_');
            const date = new Date().toISOString().split('T')[0];
            const fileName = `${t('pdf.filePrefix')}_${schoolNameSafe}_${date}.pdf`;

            pdf.save(fileName);

            Swal.fire({
                icon: 'success',
                title: t('pdf.successTitle'),
                text: t('pdf.successText'),
                timer: 3000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error al generar PDF:', error);
            Swal.fire({
                icon: 'error',
                title: t('pdf.errorTitle'),
                text: t('pdf.errorText')
            });
        } finally {
            setGenerating(false);
        }
    };

    const handleGenerateClick = async () => {
        if (!reportData) return;

        const validation = validateReport();
        if (!validation.valid) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'warning',
                title: t('pdf.missingTitle'),
                html: `<div style="text-align: left; font-size: 0.9em;">${validation.errors.map(e => `• ${e}`).join('<br>')}</div>`,
                showConfirmButton: false,
                timer: 6000,
                timerProgressBar: true,
                background: '#fff',
                iconColor: '#ff8d7a'
            });
            return;
        }

        const { value: formValues } = await Swal.fire({
            title: t('pdf.modalTitle'),
            html:
                '<div style="text-align: left; padding: 0 10px;">' +
                `<label style="display:block; margin-bottom:5px; font-weight:600; color:#444; font-size:14px;">${t('pdf.schoolName')}</label>` +
                `<input id="swal-input-school" class="swal2-input" style="margin:0 0 20px 0; width:100%; box-sizing:border-box;" value="${reportData.school.id}">` +
                `<label style="display:block; margin-bottom:5px; font-weight:600; color:#444; font-size:14px;">${t('pdf.mentor')}</label>` +
                `<input id="swal-input-mentor" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box;" placeholder="${t('pdf.mentorPlaceholder')}">` +
                `<div style="font-size: 12px; color: #888; margin-top: 5px;">${t('pdf.mentorHint')}</div>` +
                '</div>',
            focusConfirm: false,
            confirmButtonText: t('pdf.download'),
            confirmButtonColor: '#00cc7e',
            showCancelButton: true,
            cancelButtonText: t('pdf.cancel'),
            preConfirm: () => {
                const school = document.getElementById('swal-input-school').value;
                const mentor = document.getElementById('swal-input-mentor').value;

                if (!school.trim()) {
                    Swal.showValidationMessage(t('pdf.schoolRequired'));
                    return false;
                }
                if (!mentor.trim()) {
                    Swal.showValidationMessage(t('pdf.mentorRequired'));
                    return false;
                }

                return { school, mentor };
            }
        });

        if (formValues) {
            setSchoolName(formValues.school);
            setMentorName(formValues.mentor);
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
                    {generating ? t('pdf.processing') : t('pdf.generate')}
                </button>
            </div>

            <PDFTemplate contentRef={pdfContentRef} />
        </>
    );
};

export default PDFExport;
