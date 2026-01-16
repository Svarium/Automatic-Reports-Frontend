import { useReport } from '../../context/ReportContext';
import DoughnutChart from '../Charts/DoughnutChart';
import TeacherCard from './TeacherCard';
import './TeacherMetrics.css';

const TeacherMetrics = () => {
    const { reportData } = useReport();

    if (!reportData || !reportData.teachers_pld) return null;

    const { teachers_pld } = reportData;
    const { summary, teachers } = teachers_pld;

    return (
        <div className="teacher-metrics-container">
            <h2 className="section-title">👩‍🏫 Métricas de Docentes PLD</h2>

            <div className="teacher-summary">
                <h3 className="summary-title">Resumen General</h3>

                <div className="teacher-stats-grid">
                    <div className="teacher-stat-card">
                        <span className="teacher-stat-value">{summary.total_teachers}</span>
                        <span className="teacher-stat-label">Total Docentes</span>
                    </div>
                    <div className="teacher-stat-card">
                        <span className="teacher-stat-value">{summary.certified_teachers}</span>
                        <span className="teacher-stat-label">Certificados</span>
                    </div>
                    <div className="teacher-stat-card">
                        <span className="teacher-stat-value">{summary.certification_rate_percent.toFixed(1)}%</span>
                        <span className="teacher-stat-label">Tasa de Certificación</span>
                    </div>
                </div>

                <DoughnutChart
                    title="Certificación Docente"
                    data={[summary.certified_teachers, summary.total_teachers - summary.certified_teachers]}
                    labels={['Certificados', 'No certificados']}
                    colors={['var(--semaphore-green)', '#e0e0e0']}
                />
            </div>

            <h3 className="teachers-list-title">Listado de Docentes</h3>
            <div className="teachers-list">
                {teachers.map((teacher, index) => (
                    <TeacherCard key={index} teacher={teacher} />
                ))}
            </div>
        </div>
    );
};

export default TeacherMetrics;
