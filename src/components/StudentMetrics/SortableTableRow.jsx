import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SemaphoreSelector from '../SemaphoreSelector/SemaphoreSelector';
import { GROUP_FEEDBACK_OPTIONS, normalizeFeedbackKey } from '../../utils/constants';
import { useReport } from '../../context/ReportContext';

const SortableTableRow = ({ group, toggleFeedback, renderStylizedMetric, showGroupMandatoryCourses, vitalityTimeWindow, progressTimeWindow }) => {
    const { semaphores, groupFeedback, t } = useReport();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: group.route_name });

    const currentSemaphore = semaphores[group.route_name] || 'gray';
    const currentFeedback = (groupFeedback[group.route_name] || []).map(normalizeFeedbackKey);
    const isAlert = currentSemaphore === 'yellow' || currentSemaphore === 'red';

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        zIndex: isDragging ? 1 : 0,
        backgroundColor: isDragging ? '#2a2a2a' : undefined,
    };

    const parseCoursesStr = (str) => {
        if (!str || typeof str !== 'string') return { current: 0, total: 1, percent: 0, label: t('courses.percentOfCourses', { percent: 0, total: 0 }) };
        const parts = str.split(' de ');
        if (parts.length < 2) return { current: 0, total: 1, percent: 0, label: str };
        const current = parseFloat(parts[0]) || 0;
        const totalPart = parts[1].split(' ')[0];
        const total = parseFloat(totalPart) || 1;
        const percent = Math.min(100, Math.max(0, current));
        return { current, total, percent, label: t('courses.percentOfCourses', { percent: current, total }) };
    };

    const parsedTotalCourses = parseCoursesStr(group.metrics.courses_completion_percent);
    const parsedMandatoryCourses = group.metrics.mandatory_courses_completion_percent !== null
        ? parseCoursesStr(group.metrics.mandatory_courses_completion_percent)
        : null;

    const vitalityValue = group.metrics[`digital_vitality_${vitalityTimeWindow}_percent`];
    const progressValue = group.metrics[`recent_progress_${progressTimeWindow}_percent`];
    const studentsLabel = group.students_count === 1
        ? t('students.studentCount', { count: group.students_count })
        : t('students.studentsCount', { count: group.students_count });

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
                    title={t('students.dragToSort')}
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
                    <div className="name-sub">{studentsLabel}</div>
                    {isAlert && (
                        <div className="table-feedback-pills">
                            {GROUP_FEEDBACK_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    className={`table-feedback-pill ${currentFeedback.includes(option) ? 'selected' : ''}`}
                                    onClick={() => toggleFeedback(group.route_name, option)}
                                >
                                    {t(`feedback.${option}`)}
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
            <td className="td-metric" style={{ minWidth: '180px' }}>
                {group.metrics.mandatory_courses_completion_percent !== null && (
                    <div className="table-dual-progress">
                        {showGroupMandatoryCourses && parsedMandatoryCourses && (
                            <div className="table-progress-track">
                                <div className="table-track-header">
                                    <span className="table-track-label">{t('students.mandatory')}</span>
                                    <span className="table-track-value">{parsedMandatoryCourses.label}</span>
                                </div>
                                <div className="table-progress-bar-container">
                                    <div
                                        className="table-progress-bar-fill green-fill"
                                        style={{ width: `${parsedMandatoryCourses.percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        <div className="table-progress-track">
                            <div className="table-track-header">
                                <span className="table-track-label">{t('students.totalCourses')}</span>
                                <span className="table-track-value" style={{ fontSize: '0.75rem' }}>{parsedTotalCourses.label}</span>
                            </div>
                            <div className="table-progress-bar-container">
                                <div
                                    className="table-progress-bar-fill blue-fill"
                                    style={{ width: `${parsedTotalCourses.percent}%` }}
                                ></div>
                            </div>
                        </div>
                        <div style={{ marginTop: '4px', fontSize: '0.65rem', color: '#999', textAlign: 'left' }}>
                            {t('students.totalCoursesNote')}
                        </div>
                    </div>
                )}
            </td>
            <td className="td-metric">
                <span className="table-simple-metric">
                    {vitalityValue === 100 ? '100' : vitalityValue?.toFixed(1)}%
                </span>
            </td>
            <td className="td-metric">
                <span className="table-simple-metric">
                    {progressValue === 100 ? '100' : progressValue?.toFixed(1)}%
                </span>
            </td>
        </tr>
    );
};

export default SortableTableRow;
