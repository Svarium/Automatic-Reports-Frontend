import { useReport } from '../../context/ReportContext';
import DoughnutChart from '../Charts/DoughnutChart';
import StudentGroupCard from './StudentGroupCard';
import './StudentMetrics.css';

const StudentMetrics = () => {
    const { reportData } = useReport();

    if (!reportData || !reportData.students) return null;

    const { students } = reportData;
    const { summary, groups } = students;

    return (
        <div className="student-metrics-container">
            <h2 className="section-title">📚 Métricas de Alumnos</h2>

            <div className="metrics-summary">
                <h3 className="summary-title">Resumen General</h3>
                <div className="charts-grid">
                    <DoughnutChart
                        title="Vitalidad Digital (30 días)"
                        data={[summary.digital_vitality_30d_avg, 100 - summary.digital_vitality_30d_avg]}
                        labels={['Activos', 'Inactivos']}
                        colors={['var(--chart-green)', '#e0e0e0']}
                    />
                    <DoughnutChart
                        title="Progreso Reciente (15 días)"
                        data={[summary.recent_progress_15d_avg, 100 - summary.recent_progress_15d_avg]}
                        labels={['Con progreso', 'Sin progreso']}
                        colors={['var(--chart-blue)', '#e0e0e0']}
                    />
                </div>
            </div>

            <h3 className="groups-title">Grupos por Ruta</h3>
            <div className="groups-container">
                {groups.map((group, index) => (
                    <StudentGroupCard key={index} group={group} />
                ))}
            </div>
        </div>
    );
};

export default StudentMetrics;
