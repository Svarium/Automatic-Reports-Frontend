import { useReport } from '../../context/ReportContext';
import { getSemaphoreLabel } from '../../utils/semaphoreLogic';
import './SchoolHeader.css';

const SchoolHeader = () => {
    const { reportData, generalSemaphore, hasRedWarning } = useReport();

    if (!reportData || !reportData.school) return null;

    const { school } = reportData;

    return (
        <div className="school-header">
            <h1 className="school-name">{school.id}</h1>

            <div className="school-stats">
                <div className="stat-item">
                    <span className="stat-value">{school.total_students}</span>
                    <span className="stat-label">Total de alumnos en Playground</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{school.total_student_groups}</span>
                    <span className="stat-label">Grupos</span>
                </div>
            </div>

            <div className="general-semaphore-container">
                <h3 className="general-semaphore-title">Estado General del Colegio</h3>
                <div className={`general-semaphore ${generalSemaphore}`}>
                    {generalSemaphore === 'green' && '✓'}
                    {generalSemaphore === 'yellow' && '!'}
                    {generalSemaphore === 'red' && '✕'}
                </div>
                <p className="semaphore-status-text">
                    {getSemaphoreLabel(generalSemaphore)}
                </p>
                {hasRedWarning && (
                    <p className="red-warning-legend">
                        ⚠️ Hay al menos un grupo que requiere atención inmediata.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SchoolHeader;
