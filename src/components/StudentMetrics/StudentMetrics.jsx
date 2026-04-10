import { useReport } from '../../context/ReportContext';
import DoughnutChart from '../Charts/DoughnutChart';
import StudentGroupCard from './StudentGroupCard';
import StudentGroupTable from './StudentGroupTable';
import './StudentMetrics.css';

const StudentMetrics = () => {
    const { reportData, studentViewMode, setStudentViewMode } = useReport();

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
                        colors={['#00cc7e', '#ff8d7a']}
                    />
                    <DoughnutChart
                        title="Progreso Reciente (15 días)"
                        data={[summary.recent_progress_15d_avg, 100 - summary.recent_progress_15d_avg]}
                        labels={['Con progreso', 'Sin progreso']}
                        colors={['#00cc7e', '#ff8d7a']}
                    />
                </div>
            </div>

            <div className="groups-header-row">
                <h3 className="groups-title">Grupos por Ruta</h3>
                <div className="view-toggle">
                    <button 
                        className={`toggle-btn ${studentViewMode === 'cards' ? 'active' : ''}`}
                        onClick={() => setStudentViewMode('cards')}
                    >
                        🎴 Cards
                    </button>
                    <button 
                        className={`toggle-btn ${studentViewMode === 'table' ? 'active' : ''}`}
                        onClick={() => setStudentViewMode('table')}
                    >
                        📊 Tabla
                    </button>
                </div>
            </div>

            {studentViewMode === 'cards' ? (
                <div className="groups-container">
                    {groups.map((group, index) => (
                        <StudentGroupCard key={index} group={group} />
                    ))}
                </div>
            ) : (
                <StudentGroupTable groups={groups} />
            )}
        </div>
    );
};

export default StudentMetrics;
