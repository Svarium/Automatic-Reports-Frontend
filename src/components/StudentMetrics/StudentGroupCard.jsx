import { useReport } from '../../context/ReportContext';
import SemaphoreSelector from '../SemaphoreSelector/SemaphoreSelector';
import { GROUP_FEEDBACK_OPTIONS } from '../../utils/constants';
import './StudentMetrics.css';

const StudentGroupCard = ({ group }) => {
    const { 
        semaphores, 
        groupFeedback, 
        updateGroupFeedback, 
        showGroupMandatoryCourses,
        vitalityTimeWindow,
        setVitalityTimeWindow,
        progressTimeWindow,
        setProgressTimeWindow
    } = useReport();
    const currentSemaphore = semaphores[group.route_name] || 'gray';
    const currentFeedback = groupFeedback[group.route_name] || [];

    const isAlert = currentSemaphore === 'yellow' || currentSemaphore === 'red';
    const toggleFeedback = (option) => {
        const newFeedback = currentFeedback.includes(option)
            ? currentFeedback.filter(f => f !== option)
            : [...currentFeedback, option];
        updateGroupFeedback(group.route_name, newFeedback);
    };

    const renderStylizedMetric = (value, showPercent = false) => {
        if (typeof value !== 'string' || !value.includes(' de ')) {
            return <span>{value}</span>;
        }

        const parts = value.split(' de ');
        const current = parts[0];
        const secondPart = parts[1].split(' ');
        const total = secondPart[0];

        return (
            <div className="stylized-metric">
                <span className="metric-current">{current}{showPercent ? '%' : ''}</span>
                <span className="metric-suffix">
                    {showPercent ? `en ${total} cursos` : `de ${total}`}
                </span>
            </div>
        );
    };

    const parseCoursesStr = (str) => {
        if (!str || typeof str !== 'string') return { current: 0, total: 1, percent: 0, label: '0% de 0 cursos' };
        const parts = str.split(' de ');
        if (parts.length < 2) return { current: 0, total: 1, percent: 0, label: str };
        const current = parseFloat(parts[0]) || 0;
        const totalPart = parts[1].split(' ')[0];
        const total = parseFloat(totalPart) || 1;
        const percent = Math.min(100, Math.max(0, current));
        return { current, total, percent, label: `${current}% de ${total} cursos` };
    };

    const parsedTotalCourses = parseCoursesStr(group.metrics.courses_completion_percent);
    const parsedMandatoryCourses = group.metrics.mandatory_courses_completion_percent !== null 
        ? parseCoursesStr(group.metrics.mandatory_courses_completion_percent) 
        : null;

    const vitalityValue = group.metrics[`digital_vitality_${vitalityTimeWindow}_percent`];
    const progressValue = group.metrics[`recent_progress_${progressTimeWindow}_percent`];
    return (
        <div className={`student-group-card semaphore-${currentSemaphore}`}>
            <div className="group-header">
                <div className="group-info">
                    <h3 className="group-name">{group.route_name}</h3>
                    <p className="group-student-count">
                        {group.students_count} {group.students_count === 1 ? 'alumno' : 'alumnos'}
                    </p>
                </div>
                <SemaphoreSelector
                    routeName={group.route_name}
                    currentColor={currentSemaphore}
                />
            </div>

            <div className="group-metrics">
                <div className="metric-item">
                    <div className="metric-label">Clases completadas</div>
                    <div className="metric-value">{renderStylizedMetric(group.metrics.classes_completion_percent)}</div>
                </div>
                <div className="metric-item">
                    <div className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Vitalidad Digital ({vitalityTimeWindow === '30d' ? '30' : '15'} días)
                        <span 
                            style={{ cursor: 'pointer', fontSize: '12px' }} 
                            onClick={() => setVitalityTimeWindow(prev => prev === '30d' ? '15d' : '30d')}
                            title={`Cambiar a ${vitalityTimeWindow === '30d' ? '15' : '30'} días`}
                        >
                            📅
                        </span>
                    </div>
                    <div className="metric-value">
                        {vitalityValue === 100 ? '100' : vitalityValue?.toFixed(1)}%
                    </div>
                </div>
                <div className="metric-item">
                    <div className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Progreso Reciente ({progressTimeWindow === '15d' ? '15' : '30'} días)
                        <span 
                            style={{ cursor: 'pointer', fontSize: '12px' }} 
                            onClick={() => setProgressTimeWindow(prev => prev === '15d' ? '30d' : '15d')}
                            title={`Cambiar a ${progressTimeWindow === '15d' ? '30' : '15'} días`}
                        >
                            📅
                        </span>
                    </div>
                    <div className="metric-value">
                        {progressValue === 100 ? '100' : progressValue?.toFixed(1)}%
                    </div>
                </div>
            </div>

            {parsedMandatoryCourses !== null && (
                <div className="course-progress-section">
                    <div className="metric-label" style={{ marginBottom: '8px', borderBottom: '1px solid #333', paddingBottom: '4px' }}>Progreso en Cursos</div>
                    
                    <div className="dual-progress-container">
                        {showGroupMandatoryCourses && (
                            <div className="progress-track">
                                <span className="track-label">Obligatorios</span>
                                <div className="progress-bar-container">
                                    <div 
                                        className="progress-bar-fill green-fill" 
                                        style={{ width: `${parsedMandatoryCourses.percent}%` }}
                                    ></div>
                                </div>
                                <span className="track-value">
                                    {parsedMandatoryCourses.label}
                                </span>
                            </div>
                        )}
                        
                        <div className="progress-track">
                            <span className="track-label" style={{ width: showGroupMandatoryCourses ? '75px' : '90px' }}>Total de cursos</span>
                            <div className="progress-bar-container">
                                <div 
                                    className="progress-bar-fill blue-fill" 
                                    style={{ width: `${parsedTotalCourses.percent}%` }}
                                ></div>
                            </div>
                            <span className="track-value">
                                {parsedTotalCourses.label}
                            </span>
                        </div>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '0.65rem', color: '#999', textAlign: 'left' }}>
                        * El total de cursos incluye obligatorios + complementarios
                    </div>
                </div>
            )}

            {isAlert && (
                <div className="group-feedback-selector">
                    <label className="feedback-label">Feedback del estado:</label>
                    <div className="feedback-pills">
                        {GROUP_FEEDBACK_OPTIONS.map((option) => (
                            <button
                                key={option}
                                className={`feedback-pill ${currentFeedback.includes(option) ? 'selected' : ''}`}
                                onClick={() => toggleFeedback(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentGroupCard;
