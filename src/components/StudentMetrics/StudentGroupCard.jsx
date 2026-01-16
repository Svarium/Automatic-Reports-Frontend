import { useReport } from '../../context/ReportContext';
import SemaphoreSelector from '../SemaphoreSelector/SemaphoreSelector';
import './StudentMetrics.css';

const StudentGroupCard = ({ group }) => {
    const { semaphores } = useReport();
    const currentSemaphore = semaphores[group.route_name] || 'gray';

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
                    <div className="metric-label">Progreso Promedio</div>
                    <div className="metric-value">{group.metrics.avg_progress_percent.toFixed(1)}%</div>
                </div>
                <div className="metric-item">
                    <div className="metric-label">Vitalidad Digital (30d)</div>
                    <div className="metric-value">{group.metrics.digital_vitality_30d_percent.toFixed(1)}%</div>
                </div>
                <div className="metric-item">
                    <div className="metric-label">Cursos Completados</div>
                    <div className="metric-value">{group.metrics.courses_completion_percent.toFixed(1)}%</div>
                </div>
                <div className="metric-item">
                    <div className="metric-label">Progreso Reciente (15d)</div>
                    <div className="metric-value">{group.metrics.recent_progress_15d_percent.toFixed(1)}%</div>
                </div>
            </div>
        </div>
    );
};

export default StudentGroupCard;
