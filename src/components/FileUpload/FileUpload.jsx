import { useState, useRef } from 'react';
import { useReport } from '../../context/ReportContext';
import Swal from 'sweetalert2';
import landingIllustration from '../../assets/landing-illustration.png';
import './FileUpload.css';

const FileUpload = () => {
    const { uploadFile } = useReport();
    const [dragOver, setDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [validationError, setValidationError] = useState('');
    const fileInputRef = useRef(null);

    const VALID_EXTENSIONS = ['.csv', '.xlsx', '.xls'];

    const validateFile = (file) => {
        if (!file) return false;

        const fileName = file.name.toLowerCase();
        const isValid = VALID_EXTENSIONS.some(ext => fileName.endsWith(ext));

        if (!isValid) {
            setValidationError('Por favor, seleccioná un archivo CSV o Excel (.csv, .xlsx, .xls)');
            return false;
        }

        setValidationError('');
        return true;
    };

    const handleFileSelect = (file) => {
        if (validateFile(file)) {
            setSelectedFile(file);
            uploadFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const showTutorial = () => {
        Swal.fire({
            title: '<strong>Guía rápida de uso 🚀</strong>',
            icon: 'info',
            html: `
                <div style="text-align: left; font-size: 0.95em; line-height: 1.6; color: #444;">
                    <p>Esta herramienta automatiza la creación de reportes ejecutivos a partir de los datos crudos.</p>
                    
                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">1. Carga de Datos 📂</h4>
                    <p style="margin: 0;">Subí tu archivo <strong>.csv</strong> o <strong>.xlsx</strong>. El sistema procesará las métricas automáticamente.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">2. Análisis y Semáforos 🚦</h4>
                    <p style="margin: 0;">Revisá los grupos y asignales un estado:</p>
                    <ul style="margin: 5px 0 10px 20px; padding: 0;">
                        <li><span style="color: #00cc7e; font-weight: bold;">Verde:</span> Todo en orden.</li>
                        <li><span style="color: #ffd148; font-weight: bold;">Amarillo:</span> Requiere seguimiento.</li>
                        <li><span style="color: #ff8d7a; font-weight: bold;">Rojo:</span> Alerta crítica.</li>
                    </ul>
                    <p style="font-size: 0.9em; font-style: italic;">⚠️ Si marcás Amarillo o Rojo, <strong>es obligatorio</strong> seleccionar los motivos (feedback).</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">3. Observaciones 📝</h4>
                    <p style="margin: 0;">Completá los campos de texto libre para <strong>Alumnos</strong> y <strong>Docentes</strong>. ¡Son obligatorios para dar contexto al reporte!</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">4. Exportación 📄</h4>
                    <p style="margin: 0;">Al finalizar, hacé clic en generar PDF. Podrás editar el nombre del colegio y firmar el reporte con tu nombre.</p>
                </div>
            `,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: '¡Entendido!',
            confirmButtonColor: '#00cc7e',
            width: '800px',
            padding: '2em',
            background: '#fff',
            backdrop: `
                rgba(0,0,0,0.4)
                left top
                no-repeat
            `
        });
    };

    return (
        <div className="landing-split-screen">
            {/* Left side: Branding & Illustration */}
            <div className="landing-left">
                <div className="branding-container">
                    <h2 className="branding-logo">DIGITAL<strong>HOUSE</strong></h2>
                    <img src={landingIllustration} alt="DH Schools Reports Automation" className="landing-img" />
                </div>
                <button onClick={showTutorial} className="tutorial-btn">
                    ℹ️ ¿Cómo funciona? - Guía paso a paso
                </button>
            </div>

            {/* Right side: Welcome & File Upload */}
            <div className="landing-right">
                <div className="login-form-box">
                    <div className="welcome-header">
                        <div className="app-title-badge">
                            DH Schools Reports Automation
                        </div>
                        <h2>Te damos la bienvenida</h2>
                        <p>Subí el archivo para automatizar tus reportes.</p>
                    </div>


                    <div
                        className={`file-upload-area-premium ${dragOver ? 'drag-over' : ''} ${validationError ? 'has-error' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleClick}
                    >
                        <div className="upload-icon-premium">🤖</div>
                        <p className="upload-text-premium">
                            {selectedFile ? selectedFile.name : 'Arrastrá tu archivo o hacé click'}
                        </p>
                        <p className="upload-hint-premium">
                            Formatos: CSV, Excel (.csv, .xlsx, .xls)
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            className="file-input-hidden"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleInputChange}
                        />

                        <button className="btn-upload-fake">
                            {selectedFile ? 'Procesando...' : 'Seleccionar Archivo'}
                        </button>
                    </div>

                    {validationError && (
                        <div className="error-message-premium">
                            {validationError}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
