import { useReport } from '../../context/ReportContext';
import DoughnutChart from '../Charts/DoughnutChart';
import StudentGroupCard from './StudentGroupCard';
import StudentGroupTable from './StudentGroupTable';
import './StudentMetrics.css';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import SortableGroupCard from './SortableGroupCard';

const StudentMetrics = () => {
    const { 
        reportData, 
        studentViewMode, 
        setStudentViewMode, 
        reorderStudentGroups,
        showMandatoryCourseMetric,
        setShowMandatoryCourseMetric,
        showGroupMandatoryCourses,
        setShowGroupMandatoryCourses
    } = useReport();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    if (!reportData || !reportData.students) return null;

    const { students } = reportData;
    const { summary, groups } = students;

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = groups.findIndex((item) => item.route_name === active.id);
            const newIndex = groups.findIndex((item) => item.route_name === over.id);
            reorderStudentGroups(oldIndex, newIndex);
        }
    };


    return (
        <div className="student-metrics-container">
            <h2 className="section-title">📚 Métricas de Alumnos</h2>

            <div className="metrics-summary">
                <div className="summary-header">
                    <h3 className="summary-title" style={{ margin: 0 }}>Resumen General</h3>
                    <label className="metric-toggle">
                        <span className="toggle-label">Mostrar Tasa de Cursos Obligatorios</span>
                        <div className={`switch ${showMandatoryCourseMetric ? 'on' : 'off'}`}>
                            <input 
                                type="checkbox" 
                                checked={showMandatoryCourseMetric} 
                                onChange={(e) => setShowMandatoryCourseMetric(e.target.checked)}
                            />
                            <span className="slider"></span>
                        </div>
                    </label>
                </div>
                <div className={`charts-grid ${!showMandatoryCourseMetric ? 'two-columns' : ''}`}>
                    {showMandatoryCourseMetric && (
                        <DoughnutChart
                            title="Tasa de alumnos certificados en cursos obligatorios"
                            data={[summary.mandatory_courses_full_completion_percent || 0, 100 - (summary.mandatory_courses_full_completion_percent || 0)]}
                            labels={['Certificables', 'En proceso']}
                            colors={['#00cc7e', '#333']}
                        />
                    )}
                    <DoughnutChart
                        title="Vitalidad Digital (30 días)"
                        data={[summary.digital_vitality_30d_avg, 100 - summary.digital_vitality_30d_avg]}
                        labels={['Activos', 'Inactivos']}
                        colors={['#2196F3', '#ff8d7a']}
                    />
                    <DoughnutChart
                        title="Progreso Reciente (15 días)"
                        data={[summary.recent_progress_15d_avg, 100 - summary.recent_progress_15d_avg]}
                        labels={['Con progreso', 'Sin progreso']}
                        colors={['#8383fd', '#ff8d7a']}
                    />
                </div>
            </div>

            <div className="groups-header-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <h3 className="groups-title" style={{ margin: 0 }}>Grupos por Ruta</h3>
                    <label className="metric-toggle" style={{ margin: 0 }}>
                        <span className="toggle-label" style={{ fontSize: '0.85rem' }}>Incluir detalle de cursos obligatorios</span>
                        <div className={`switch ${showGroupMandatoryCourses ? 'on' : 'off'}`}>
                            <input 
                                type="checkbox" 
                                checked={showGroupMandatoryCourses} 
                                onChange={(e) => setShowGroupMandatoryCourses(e.target.checked)}
                            />
                            <span className="slider"></span>
                        </div>
                    </label>
                </div>
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

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={groups.map((g) => g.route_name)}
                    strategy={rectSortingStrategy}
                >
                    {studentViewMode === 'cards' ? (
                        <div className="groups-container">
                            {groups.map((group) => (
                                <SortableGroupCard key={group.route_name} group={group} />
                            ))}
                        </div>
                    ) : (
                        <StudentGroupTable groups={groups} />
                    )}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default StudentMetrics;
