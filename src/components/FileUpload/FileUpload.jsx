import { useState, useRef } from 'react';
import { useReport } from '../../context/ReportContext';
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
        <div className="file-upload-container">
            <h1 className="file-upload-title">Reporte Automático Educativo</h1>

            <div
                className={`file-upload-area ${dragOver ? 'drag-over' : ''} ${validationError ? 'has-error' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <div className="upload-icon">📊</div>
                <p className="upload-text">
                    Arrastrá tu archivo o hacé click para seleccionar
                </p>
                <p className="upload-hint">
                    Archivos soportados: CSV, Excel (.csv, .xlsx, .xls)
                </p>

                <input
                    ref={fileInputRef}
                    type="file"
                    className="file-input"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleInputChange}
                />
            </div>

            {selectedFile && !validationError && (
                <div className="selected-file">
                    <span className="selected-file-icon">✓</span>
                    <span>{selectedFile.name}</span>
                </div>
            )}

            {validationError && (
                <div className="error-message">
                    {validationError}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
