import { useReport } from '../../context/ReportContext';
import { normalizeFeedbackKey } from '../../utils/constants';
import SortableTableRow from './SortableTableRow';
import './StudentGroupTable.css';

const StudentGroupTable = ({ groups }) => {
    const {
        groupFeedback,
        updateGroupFeedback,
        showGroupMandatoryCourses,
        vitalityTimeWindow,
        setVitalityTimeWindow,
        progressTimeWindow,
        setProgressTimeWindow,
        t,
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
                    {showPercent ? t('courses.percentOfCourses', { percent: current, total }) : t('courses.ofTotal', { total })}
                </span>
            </div>
        );
    };

    const toggleFeedback = (routeName, option) => {
        const currentFeedback = (groupFeedback[routeName] || []).map(normalizeFeedbackKey);
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
                        <th className="th-group">{t('students.groupRoute')}</th>
                        <th className="th-semaphore">{t('students.state')}</th>
                        <th className="th-metric">{t('students.completedClasses')}</th>
                        <th className="th-metric" style={{ minWidth: '180px' }}>{t('students.courseProgress')}</th>
                        <th className="th-metric">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                {t('students.vitalityTitle')} ({vitalityTimeWindow === '30d' ? '30' : '15'} {t('common.days')})
                                <span
                                    style={{ cursor: 'pointer', fontSize: '12px' }}
                                    onClick={() => setVitalityTimeWindow(prev => prev === '30d' ? '15d' : '30d')}
                                    title={t('students.changeDays', { days: vitalityTimeWindow === '30d' ? '15' : '30' })}
                                >
                                    📅
                                </span>
                            </div>
                        </th>
                        <th className="th-metric">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                {t('students.recentProgressTitle')} ({progressTimeWindow === '15d' ? '15' : '30'} {t('common.days')})
                                <span
                                    style={{ cursor: 'pointer', fontSize: '12px' }}
                                    onClick={() => setProgressTimeWindow(prev => prev === '15d' ? '30d' : '15d')}
                                    title={t('students.changeDays', { days: progressTimeWindow === '15d' ? '30' : '15' })}
                                >
                                    📅
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <SortableTableRow
                            key={group.route_name}
                            group={group}
                            toggleFeedback={toggleFeedback}
                            renderStylizedMetric={renderStylizedMetric}
                            showGroupMandatoryCourses={showGroupMandatoryCourses}
                            vitalityTimeWindow={vitalityTimeWindow}
                            progressTimeWindow={progressTimeWindow}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentGroupTable;
