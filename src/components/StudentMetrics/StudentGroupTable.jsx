import { useReport } from '../../context/ReportContext';
import { GROUP_FEEDBACK_OPTIONS } from '../../utils/constants';
import SortableTableRow from './SortableTableRow';
import './StudentGroupTable.css';

const StudentGroupTable = ({ groups }) => {
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
                        <th style={{ width: '40px' }}></th>
                        <th className="th-group">Grupo / Ruta</th>
                        <th className="th-semaphore">Estado</th>
                        <th className="th-metric">Clases Completadas</th>
                        <th className="th-metric" style={{ minWidth: '180px' }}>Progreso en Cursos</th>
                        <th className="th-metric">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                Vitalidad Digital ({vitalityTimeWindow === '30d' ? '30' : '15'} días)
                                <span 
                                    style={{ cursor: 'pointer', fontSize: '12px' }} 
                                    onClick={() => setVitalityTimeWindow(prev => prev === '30d' ? '15d' : '30d')}
                                    title={`Cambiar a ${vitalityTimeWindow === '30d' ? '15' : '30'} días`}
                                >
                                    📅
                                </span>
                            </div>
                        </th>
                        <th className="th-metric">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                Progreso reciente ({progressTimeWindow === '15d' ? '15' : '30'} días)
                                <span 
                                    style={{ cursor: 'pointer', fontSize: '12px' }} 
                                    onClick={() => setProgressTimeWindow(prev => prev === '15d' ? '30d' : '15d')}
                                    title={`Cambiar a ${progressTimeWindow === '15d' ? '30' : '15'} días`}
                                >
                                    📅
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => {
                        const currentSemaphore = semaphores[group.route_name] || 'gray';
                        const currentFeedback = groupFeedback[group.route_name] || [];
                        const isAlert = currentSemaphore === 'yellow' || currentSemaphore === 'red';

                        return (
                            <SortableTableRow
                                key={group.route_name}
                                group={group}
                                currentSemaphore={currentSemaphore}
                                currentFeedback={currentFeedback}
                                isAlert={isAlert}
                                toggleFeedback={toggleFeedback}
                                renderStylizedMetric={renderStylizedMetric}
                                showGroupMandatoryCourses={showGroupMandatoryCourses}
                                vitalityTimeWindow={vitalityTimeWindow}
                                progressTimeWindow={progressTimeWindow}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StudentGroupTable;
