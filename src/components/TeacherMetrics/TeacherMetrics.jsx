import { useReport } from '../../context/ReportContext';
import DoughnutChart from '../Charts/DoughnutChart';
import TeacherCard from './TeacherCard';
import './TeacherMetrics.css';

const TeacherMetrics = () => {
    const { reportData, teacherSettings, teacherMetrics } = useReport();

    if (!reportData || !reportData.teachers_pld) return null;

    const { teachers_pld } = reportData;
    const { teachers } = teachers_pld;

    // Filtrar docentes eliminados
    const visibleTeachers = teachers.filter(t => !teacherSettings[t.name]?.isDeleted);

    return (
        <div className="teacher-metrics-container">
            <h2 className="section-title">👩‍🏫 Métricas de capacitación Docente</h2>

            <div className="teacher-summary">
                <h3 className="summary-title">Resumen General</h3>

                <div className="teacher-stats-grid">
                    <div className="teacher-stat-card">
                        <span className="teacher-stat-value">{teacherMetrics.totalTeachers}</span>
                        <span className="teacher-stat-label">Total Docentes</span>
                    </div>
                    <div className="teacher-stat-card">
                        <span className="teacher-stat-value">{teacherMetrics.finishedCertifications}</span>
                        <span className="teacher-stat-label">Certificaciones finalizadas</span>
                    </div>
                    <div className="teacher-stat-card">
                        <span className="teacher-stat-value">
                            {teacherMetrics.certificationRate === 100 ? '100' : teacherMetrics.certificationRate.toFixed(1)}%
                        </span>
                        <span className="teacher-stat-label">Tasa de Certificación</span>
                    </div>
                </div>

                <DoughnutChart
                    title="Estado de Certificaciones"
                    data={[
                        teacherMetrics.finishedCertifications,
                        teacherMetrics.totalActivePLDs - teacherMetrics.finishedCertifications
                    ]}
                    labels={['Finalizadas', 'Pendientes']}
                    colors={['#00cc7e', '#ff8d7a']}
                />
            </div>

            <h3 className="teachers-list-title">Listado de Docentes</h3>
            <div className="teachers-list">
                {visibleTeachers.map((teacher, index) => (
                    <TeacherCard key={index} teacher={teacher} />
                ))}
            </div>
        </div>
    );
};

export default TeacherMetrics;
