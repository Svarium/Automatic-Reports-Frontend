import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SemaphoreSelector from '../SemaphoreSelector/SemaphoreSelector';
import { GROUP_FEEDBACK_OPTIONS } from '../../utils/constants';

const SortableTableRow = ({ group, currentSemaphore, currentFeedback, isAlert, toggleFeedback, renderStylizedMetric }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: group.route_name });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        zIndex: isDragging ? 1 : 0,
        backgroundColor: isDragging ? '#2a2a2a' : undefined,
    };

    return (
        <tr ref={setNodeRef} style={style} className={`table-row semaphore-${currentSemaphore}`}>
            <td className="td-drag-handle" style={{ width: '40px', textAlign: 'center', verticalAlign: 'middle', padding: '0 10px' }}>
                <div 
                    {...attributes} 
                    {...listeners}
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        borderRadius: '4px'
                    }}
                    title="Arrastrar para ordenar"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                </div>
            </td>
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
                {group.metrics.mandatory_courses_completion_percent !== null && (
                    <div className="table-mandatory-cell">
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '4px', color: 'var(--chart-blue)' }}>
                            {group.metrics.mandatory_courses_completion_percent.toFixed(1)}%
                        </div>
                        <div className="progress-bar-container" style={{ height: '8px', borderRadius: '4px' }}>
                            <div 
                                className="progress-bar-fill" 
                                style={{ width: `${group.metrics.mandatory_courses_completion_percent}%`, borderRadius: '4px' }}
                            ></div>
                        </div>
                    </div>
                )}
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
};

export default SortableTableRow;
