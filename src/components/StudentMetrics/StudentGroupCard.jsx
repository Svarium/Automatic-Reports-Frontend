import { useReport } from '../../context/ReportContext';
import SemaphoreSelector from '../SemaphoreSelector/SemaphoreSelector';
import { GROUP_FEEDBACK_OPTIONS } from '../../utils/constants';
import './StudentMetrics.css';

const StudentGroupCard = ({ group }) => {
    const { semaphores, groupFeedback, updateGroupFeedback } = useReport();
    const currentSemaphore = semaphores[group.route_name] || 'gray';
    const currentFeedback = groupFeedback[group.route_name] || [];

    const isAlert = currentSemaphore === 'yellow' || currentSemaphore === 'red';
    const toggleFeedback = (option) => {
        const newFeedback = currentFeedback.includes(option)
            ? currentFeedback.filter(f => f !== option)
            : [...currentFeedback, option];
        updateGroupFeedback(group.route_name, newFeedback);
    };

    const renderStylizedMetric = (value) => {
        if (typeof value !== 'string' || !value.includes(' de ')) {
            return <span>{value}</span>;
        }

        const parts = value.split(' de ');
        const current = parts[0];
        const secondPart = parts[1].split(' ');
        const total = secondPart[0];
        const label = secondPart[1]; // "clases" o "cursos"

        return (
            <div className="stylized-metric">
                <span className="metric-current">{current}</span>
                <span className="metric-suffix">de {total}</span>
            </div>
        );
    };

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
                    <div className="metric-label">Vitalidad Digital (30 días)</div>
                    <div className="metric-value">
                        {group.metrics.digital_vitality_30d_percent === 100 ? '100' : group.metrics.digital_vitality_30d_percent.toFixed(1)}%
                    </div>
                </div>
                <div className="metric-item">
                    <div className="metric-label">Cursos completados</div>
                    <div className="metric-value">{renderStylizedMetric(group.metrics.courses_completion_percent)}</div>
                </div>
                <div className="metric-item">
                    <div className="metric-label">Progreso Reciente (15 días)</div>
                    <div className="metric-value">
                        {group.metrics.recent_progress_15d_percent === 100 ? '100' : group.metrics.recent_progress_15d_percent.toFixed(1)}%
                    </div>
                </div>
            </div>

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
