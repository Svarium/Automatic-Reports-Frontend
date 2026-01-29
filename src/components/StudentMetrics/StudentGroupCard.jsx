import { useReport } from '../../context/ReportContext';
import SemaphoreSelector from '../SemaphoreSelector/SemaphoreSelector';
import { GROUP_FEEDBACK_OPTIONS } from '../../utils/constants';
import './StudentMetrics.css';

const StudentGroupCard = ({ group }) => {
    const { semaphores, groupFeedback, updateGroupFeedback } = useReport();
    const currentSemaphore = semaphores[group.route_name] || 'gray';
    const currentFeedback = groupFeedback[group.route_name] || [];

    const toggleFeedback = (option) => {
        const newFeedback = currentFeedback.includes(option)
            ? currentFeedback.filter(f => f !== option)
            : [...currentFeedback, option];
        updateGroupFeedback(group.route_name, newFeedback);
    };

    const isAlert = currentSemaphore === 'yellow' || currentSemaphore === 'red';

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
                    <div className="metric-label">Clases Completadas</div>
                    <div className="metric-value">{group.metrics.classes_completion_percent.toFixed(1)}%</div>
                </div>
                <div className="metric-item">
                    <div className="metric-label">Vitalidad Digital (30 días)</div>
                    <div className="metric-value">{group.metrics.digital_vitality_30d_percent.toFixed(1)}%</div>
                </div>
                <div className="metric-item">
                    <div className="metric-label">Cursos Completados</div>
                    <div className="metric-value">{group.metrics.courses_completion_percent.toFixed(1)}%</div>
                </div>
                <div className="metric-item">
                    <div className="metric-label">Progreso Reciente (15 días)</div>
                    <div className="metric-value">{group.metrics.recent_progress_15d_percent.toFixed(1)}%</div>
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
