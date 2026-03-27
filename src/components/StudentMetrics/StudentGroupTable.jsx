import { useReport } from '../../context/ReportContext';
import SemaphoreSelector from '../SemaphoreSelector/SemaphoreSelector';
import { GROUP_FEEDBACK_OPTIONS } from '../../utils/constants';
import './StudentGroupTable.css';

const StudentGroupTable = ({ groups }) => {
    const { semaphores, groupFeedback, updateGroupFeedback } = useReport();

    const renderStylizedMetric = (value, showPercent = false) => {
        if (typeof value !== 'string' || !value.includes(' de ')) {
            return <span className="table-metric-value">{value}</span>;
        }

        const parts = value.split(' de ');
        const current = parts[0];
        const secondPart = parts[1].split(' ');
        const total = secondPart[0];

        return (
            <div className="table-stylized-metric">
                <span className="table-metric-current">{current}{showPercent ? '%' : ''}</span>
                <span className="table-metric-total">
                    {showPercent ? `en ${total} curs.` : `de ${total}`}
                </span>
            </div>
        );
    };

    const toggleFeedback = (routeName, option) => {
        const currentFeedback = groupFeedback[routeName] || [];
        const newFeedback = currentFeedback.includes(option)
            ? currentFeedback.filter(f => f !== option)
            : [...currentFeedback, option];
        updateGroupFeedback(routeName, newFeedback);
    };

    return (
        <div className="student-table-container">
            <table className="student-groups-table">
                <thead>
                    <tr>
                        <th className="th-group">Grupo / Ruta</th>
                        <th className="th-semaphore">Estado</th>
                        <th className="th-metric">Clases Completadas</th>
                        <th className="th-metric">Cursos Completados</th>
                        <th className="th-metric">Vitalidad Digital (30 días)</th>
                        <th className="th-metric">Progreso reciente (15 días)</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group, index) => {
                        const currentSemaphore = semaphores[group.route_name] || 'gray';
                        const currentFeedback = groupFeedback[group.route_name] || [];
                        const isAlert = currentSemaphore === 'yellow' || currentSemaphore === 'red';

                        return (
                            <tr key={index} className={`table-row semaphore-${currentSemaphore}`}>
                                <td className="td-group">
                                    <div className="group-name-cell">
                                        <div className="name-main">{group.route_name}</div>
                                        <div className="name-sub">{group.students_count} alumnos</div>
                                        {isAlert && (
                                            <div className="table-feedback-pills">
                                                {GROUP_FEEDBACK_OPTIONS.map((option) => (
                                                    <button
                                                        key={option}
                                                        className={`table-feedback-pill ${currentFeedback.includes(option) ? 'selected' : ''}`}
                                                        onClick={() => toggleFeedback(group.route_name, option)}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="td-semaphore">
                                    <SemaphoreSelector
                                        routeName={group.route_name}
                                        currentColor={currentSemaphore}
                                        compact={true}
                                    />
                                </td>
                                <td className="td-metric">
                                    {renderStylizedMetric(group.metrics.classes_completion_percent)}
                                </td>
                                <td className="td-metric">
                                    {renderStylizedMetric(group.metrics.courses_completion_percent, true)}
                                </td>
                                <td className="td-metric">
                                    <span className="table-simple-metric">
                                        {group.metrics.digital_vitality_30d_percent === 100 ? '100' : group.metrics.digital_vitality_30d_percent.toFixed(1)}%
                                    </span>
                                </td>
                                <td className="td-metric">
                                    <span className="table-simple-metric">
                                        {group.metrics.recent_progress_15d_percent === 100 ? '100' : group.metrics.recent_progress_15d_percent.toFixed(1)}%
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StudentGroupTable;
