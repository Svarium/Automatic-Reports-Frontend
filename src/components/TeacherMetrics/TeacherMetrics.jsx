import { useReport } from '../../context/ReportContext';
import DoughnutChart from '../Charts/DoughnutChart';
import TeacherCard from './TeacherCard';
import './TeacherMetrics.css';

const TeacherMetrics = () => {
    const { reportData, teacherSettings, teacherMetrics, t } = useReport();

    if (!reportData || !reportData.teachers_pld) return null;

    const { teachers_pld } = reportData;
    const { teachers } = teachers_pld;
    const visibleTeachers = teachers.filter(item => !teacherSettings[item.name]?.isDeleted);

    return (
        <div className="teacher-metrics-container">
            <h2 className="section-title">{t('teachers.title')}</h2>

            <div className="teacher-summary">
                <h3 className="summary-title">{t('students.summary')}</h3>

                <div className="teacher-stats-grid">
                    <div className="teacher-stat-card">
                        <span className="teacher-stat-value">{teacherMetrics.totalTeachers}</span>
                        <span className="teacher-stat-label">{t('teachers.totalTeachers')}</span>
                    </div>
                    <div className="teacher-stat-card">
                        <span className="teacher-stat-value">{teacherMetrics.finishedCertifications}</span>
                        <span className="teacher-stat-label">{t('teachers.finishedCertifications')}</span>
                    </div>
                    <div className="teacher-stat-card">
                        <span className="teacher-stat-value">
                            {teacherMetrics.certificationRate === 100 ? '100' : teacherMetrics.certificationRate.toFixed(1)}%
                        </span>
                        <span className="teacher-stat-label">{t('teachers.certificationRate')}</span>
                    </div>
                </div>

                <DoughnutChart
                    title={t('teachers.certificationStatus')}
                    data={[
                        teacherMetrics.finishedCertifications,
                        teacherMetrics.totalActivePLDs - teacherMetrics.finishedCertifications
                    ]}
                    labels={[t('teachers.finished'), t('teachers.pending')]}
                    colors={['#00cc7e', '#ff8d7a']}
                />
            </div>

            <h3 className="teachers-list-title">{t('teachers.listTitle')}</h3>
            <div className="teachers-list">
                {visibleTeachers.map((teacher, index) => (
                    <TeacherCard key={index} teacher={teacher} />
                ))}
            </div>
        </div>
    );
};

export default TeacherMetrics;
