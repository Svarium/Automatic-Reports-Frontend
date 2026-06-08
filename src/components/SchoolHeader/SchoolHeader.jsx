import { useReport } from '../../context/ReportContext';
import './SchoolHeader.css';

const SchoolHeader = () => {
    const { reportData, generalSemaphore, hasRedWarning, t } = useReport();

    if (!reportData || !reportData.school) return null;

    const { school } = reportData;

    return (
        <div className="school-header">
            <h1 className="school-name">{school.id}</h1>

            <div className="school-stats">
                <div className="stat-item">
                    <span className="stat-value">{school.total_students}</span>
                    <span className="stat-label">{t('school.totalStudents')}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{school.total_student_groups}</span>
                    <span className="stat-label">{t('school.groups')}</span>
                </div>
            </div>

            <div className="general-semaphore-container">
                <h3 className="general-semaphore-title">{t('school.generalStatusTitle')}</h3>
                <div className={`general-semaphore ${generalSemaphore}`}>
                    {generalSemaphore === 'green' && '✓'}
                    {generalSemaphore === 'yellow' && '!'}
                    {generalSemaphore === 'red' && '✕'}
                </div>
                <p className="semaphore-status-text">
                    {t(`semaphores.${generalSemaphore}`)}
                </p>
                {hasRedWarning && (
                    <p className="red-warning-legend">
                        {t('school.redWarning')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SchoolHeader;
