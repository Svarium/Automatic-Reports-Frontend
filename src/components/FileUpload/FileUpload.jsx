import { useState, useRef } from 'react';
import { useReport } from '../../context/ReportContext';
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

    return (
        <div className="landing-split-screen">
            {/* Left side: Branding & Illustration */}
            <div className="landing-left">
                <div className="branding-container">
                    <h2 className="branding-logo">DIGITAL<strong>HOUSE</strong></h2>
                    <img src={landingIllustration} alt="DH Schools Reports Automation" className="landing-img" />
                </div>
            </div>

            {/* Right side: Welcome & File Upload */}
            <div className="landing-right">
                <div className="login-form-box">
                    <div className="welcome-header">
                        <h1>Te damos la bienvenida</h1>
                        <p>Subí el archivo para automatizar tus reportes.</p>
                    </div>

                    <div className="app-title-badge">
                        DH Schools Reports Automation 📊
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
