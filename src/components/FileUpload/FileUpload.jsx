import { useState, useRef } from 'react';
import { useReport } from '../../context/ReportContext';
import Swal from 'sweetalert2';
import landingIllustration from '../../assets/landing-illustration.png';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import './FileUpload.css';

const FileUpload = () => {
    const { uploadFile, t } = useReport();
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
            setValidationError(t('fileUpload.errorExt'));
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
            title: t('fileUpload.tutorialTitle'),
            icon: 'info',
            html: t('fileUpload.tutorialHtml'),
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: t('fileUpload.tutorialBtnOk'),
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
                    {t('fileUpload.tutorialBtn')}
                </button>
            </div>

            {/* Right side: Welcome & File Upload */}
            <div className="landing-right">
                <div className="login-form-box">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                        <LanguageSelector />
                    </div>
                    <div className="welcome-header">
                        <div className="app-title-badge">
                            DH Schools Reports Automation
                        </div>
                        <h2>{t('fileUpload.title')}</h2>
                        <p>{t('fileUpload.subtitle')}</p>
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
                            {selectedFile ? selectedFile.name : t('fileUpload.dragText')}
                        </p>
                        <p className="upload-hint-premium">
                            {t('fileUpload.formats')}
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            className="file-input-hidden"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleInputChange}
                        />

                        <button className="btn-upload-fake">
                            {selectedFile ? t('fileUpload.processing') : t('fileUpload.selectFile')}
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
