import { useReport } from '../../context/ReportContext';
import { getSemaphoreLabel } from '../../utils/semaphoreLogic';

const PDFTemplate = ({ contentRef }) => {
    const {
        reportData,
        generalSemaphore,
        semaphores,
        studentObservations,
        teacherObservations
    } = useReport();

    if (!reportData) return null;

    const { school, students, teachers_pld, metadata } = reportData;

    return (
        <div ref={contentRef} className="pdf-template">
            {/* 1. PORTADA */}
            <div className="pdf-section">
                <h1 className="pdf-title">Reporte Educativo - {school.id}</h1>
                <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: generalSemaphore === 'green' ? '#4caf50' : generalSemaphore === 'yellow' ? '#ffc107' : '#f44336',
                        margin: '0 auto 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '30px',
                        color: 'white'
                    }}>
                        {generalSemaphore === 'green' && '✓'}
                        {generalSemaphore === 'yellow' && '!'}
                        {generalSemaphore === 'red' && '✕'}
                    </div>
                    <p className="pdf-subtitle">Estado General: {getSemaphoreLabel(generalSemaphore)}</p>
                </div>
                <div className="pdf-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p><strong>Total de Alumnos:</strong> {school.total_students}</p>
                    <p><strong>Total de Grupos:</strong> {school.total_student_groups}</p>
                </div>
            </div>

            {/* 2. MÉTRICAS DE ALUMNOS */}
            <div className="pdf-section" style={{ pageBreakBefore: 'always' }}>
                <h2 className="pdf-title">📚 Métricas de Alumnos</h2>

                <h3 className="pdf-subtitle">Resumen General</h3>
                <div className="pdf-text">
                    <p><strong>Vitalidad Digital (30 días):</strong> {students.summary.digital_vitality_30d_avg.toFixed(1)}%</p>
                    <p><strong>Progreso Reciente (15 días):</strong> {students.summary.recent_progress_15d_avg.toFixed(1)}%</p>
                </div>

                <h3 className="pdf-subtitle" style={{ marginTop: '20px' }}>Grupos por Ruta</h3>
                {students.groups.map((group, index) => {
                    const semaphore = semaphores[group.route_name] || 'green';
                    return (
                        <div key={index} style={{
                            marginBottom: '15px',
                            padding: '10px',
                            borderLeft: `5px solid ${semaphore === 'green' ? '#4caf50' : semaphore === 'yellow' ? '#ffc107' : '#f44336'}`,
                            backgroundColor: '#f9f9f9'
                        }}>
                            <p className="pdf-text" style={{ fontWeight: '600', marginBottom: '5px' }}>
                                {group.route_name}
                            </p>
                            <p className="pdf-text" style={{ fontSize: '10px', color: '#666', marginBottom: '8px' }}>
                                {group.students_count} {group.students_count === 1 ? 'alumno' : 'alumnos'} | Estado: {getSemaphoreLabel(semaphore)}
                            </p>
                            <div className="pdf-text" style={{ fontSize: '10px' }}>
                                <p>• Progreso Promedio: {group.metrics.avg_progress_percent.toFixed(1)}%</p>
                                <p>• Vitalidad Digital (30d): {group.metrics.digital_vitality_30d_percent.toFixed(1)}%</p>
                                <p>• Cursos Completados: {group.metrics.courses_completion_percent.toFixed(1)}%</p>
                                <p>• Progreso Reciente (15d): {group.metrics.recent_progress_15d_percent.toFixed(1)}%</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. OBSERVACIONES DE ALUMNOS */}
            {studentObservations && (
                <div className="pdf-section">
                    <h3 className="pdf-subtitle">Observaciones Generales - Alumnos</h3>
                    <div className="pdf-text" style={{
                        padding: '10px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '5px',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {studentObservations}
                    </div>
                </div>
            )}

            {/* 4. MÉTRICAS DE DOCENTES PLD */}
            <div className="pdf-section" style={{ pageBreakBefore: 'always' }}>
                <h2 className="pdf-title">👩‍🏫 Métricas de Docentes PLD</h2>

                <h3 className="pdf-subtitle">Resumen General</h3>
                <div className="pdf-text">
                    <p><strong>Total Docentes:</strong> {teachers_pld.summary.total_teachers}</p>
                    <p><strong>Docentes Certificados:</strong> {teachers_pld.summary.certified_teachers}</p>
                    <p><strong>Tasa de Certificación:</strong> {teachers_pld.summary.certification_rate_percent.toFixed(1)}%</p>
                </div>

                <h3 className="pdf-subtitle" style={{ marginTop: '20px' }}>Listado de Docentes</h3>
                {teachers_pld.teachers.map((teacher, index) => (
                    <div key={index} style={{
                        marginBottom: '10px',
                        padding: '8px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '5px'
                    }}>
                        <p className="pdf-text" style={{ fontWeight: '600', marginBottom: '3px' }}>
                            {teacher.name}
                            {teacher.certified && <span style={{
                                marginLeft: '10px',
                                padding: '2px 8px',
                                backgroundColor: '#4caf50',
                                color: 'white',
                                borderRadius: '10px',
                                fontSize: '9px'
                            }}>✓ Certificado</span>}
                        </p>
                        <p className="pdf-text" style={{ fontSize: '10px', color: '#666' }}>
                            Progreso: {teacher.progress_percent.toFixed(1)}%
                        </p>
                    </div>
                ))}
            </div>

            {/* 5. OBSERVACIONES DE DOCENTES */}
            {teacherObservations && (
                <div className="pdf-section">
                    <h3 className="pdf-subtitle">Observaciones Generales - Docentes PLD</h3>
                    <div className="pdf-text" style={{
                        padding: '10px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '5px',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {teacherObservations}
                    </div>
                </div>
            )}

            {/* 6. METADATA */}
            <div className="pdf-metadata">
                <p><strong>Fecha de generación:</strong> {new Date(metadata.generated_at).toLocaleString('es-AR')}</p>
                <p><strong>Ventana de vitalidad digital:</strong> {metadata.vitality_window_days} días</p>
                <p><strong>Ventana de progreso reciente:</strong> {metadata.recent_progress_window_days} días</p>
            </div>
        </div>
    );
};

export default PDFTemplate;
