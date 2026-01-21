import { useReport } from '../../context/ReportContext';
import { getSemaphoreLabel } from '../../utils/semaphoreLogic';
import bannerHeader from '../../assets/banner-header.png';
import bannerFooter from '../../assets/banner-footer.png';
import bannerPortadaFooter from '../../assets/banner-portada-footer.png';

const PDFTemplate = ({ contentRef }) => {
    const {
        reportData,
        generalSemaphore,
        semaphores,
        studentObservations,
        teacherObservations,
        scheduledMentorings,
        completedMentorings
    } = useReport();

    if (!reportData) return null;

    const { school, students, teachers_pld, metadata } = reportData;

    return (
        <div ref={contentRef} className="pdf-template">
            {/* PAGINA 1: PORTADA EXCLUSIVA */}
            <div className="pdf-page" style={{ display: 'flex', flexDirection: 'column' }}>
                <img src={bannerHeader} alt="Header" style={{ width: '100%', marginBottom: '40px' }} />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '32px', marginBottom: '40px', fontWeight: '800', color: '#000000' }}>{school.id}</h1>

                    <div style={{ marginBottom: '40px' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: generalSemaphore === 'green' ? '#00cc7e' : generalSemaphore === 'yellow' ? '#ffd148' : generalSemaphore === 'red' ? '#ff8d7a' : '#9e9e9e',
                            margin: '0 auto 15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '40px',
                            color: 'white',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}>
                            {generalSemaphore === 'green' && '✓'}
                            {generalSemaphore === 'yellow' && '!'}
                            {generalSemaphore === 'red' && '✕'}
                        </div>
                        <h2 style={{ fontSize: '24px', margin: '0', color: '#000000' }}>Estado General: {getSemaphoreLabel(generalSemaphore)}</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '500px', width: '100%', marginTop: '20px' }}>
                        <div style={{ padding: '20px', background: '#f8f8f8', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '28px', fontWeight: '800', color: '#000000' }}>{school.total_students}</div>
                            <div style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>Total de alumnos en Playground</div>
                        </div>
                        <div style={{ padding: '20px', background: '#f8f8f8', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '28px', fontWeight: '800', color: '#000000' }}>{school.total_student_groups}</div>
                            <div style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>Total de Grupos</div>
                        </div>
                    </div>
                </div>

                <img src={bannerPortadaFooter} alt="Cover Footer" style={{ width: '100%', marginTop: '40px' }} />
            </div>

            {/* SECCION ALUMNOS - Puede ocupar varias paginas */}
            <div className="pdf-page-container">
                <div className="pdf-page" style={{ height: 'auto', minHeight: '297mm', pageBreakInside: 'auto' }}>
                    <div className="pdf-section" style={{ marginTop: '20px' }}>
                        <h2 className="pdf-title" style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>📚 Métricas de Alumnos</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '20px 0' }}>
                            <div style={{ padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', borderLeft: '4px solid #2196F3' }}>
                                <div style={{ fontSize: '12px', color: '#555' }}>Vitalidad Digital (30 días)</div>
                                <div style={{ fontSize: '20px', fontWeight: '700' }}>{students.summary.digital_vitality_30d_avg.toFixed(1)}%</div>
                            </div>
                            <div style={{ padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', borderLeft: '4px solid #2196F3' }}>
                                <div style={{ fontSize: '12px', color: '#555' }}>Progreso Reciente (15 días)</div>
                                <div style={{ fontSize: '20px', fontWeight: '700' }}>{students.summary.recent_progress_15d_avg.toFixed(1)}%</div>
                            </div>
                        </div>

                        <h3 className="pdf-subtitle" style={{ fontSize: '16px', marginBottom: '15px' }}>Detalle de Alumnos por Ruta</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {students.groups.map((group, index) => {
                                const semaphore = semaphores[group.route_name] || 'gray';
                                const semaphoreColor = semaphore === 'green' ? '#00cc7e' : semaphore === 'yellow' ? '#ffd148' : semaphore === 'red' ? '#ff8d7a' : '#9e9e9e';

                                return (
                                    <div key={index} style={{
                                        padding: '10px',
                                        borderLeft: `5px solid ${semaphoreColor}`,
                                        backgroundColor: '#fdfdfd',
                                        border: '1px solid #efefef',
                                        borderLeftWidth: '5px',
                                        borderRadius: '4px',
                                        pageBreakInside: 'avoid'
                                    }}>
                                        <p style={{ fontWeight: '700', fontSize: '12px', margin: '0 0 5px 0', color: '#000000' }}>{group.route_name}</p>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '10px', color: '#444' }}>
                                            <div>Alumnos: <strong style={{ color: '#000' }}>{group.students_count}</strong></div>
                                            <div>Clases Completadas: <strong style={{ color: '#000' }}>{group.metrics.classes_completion_percent.toFixed(1)}%</strong></div>
                                            <div>Vitalidad Digital (30 días): <strong style={{ color: '#000' }}>{group.metrics.digital_vitality_30d_percent.toFixed(1)}%</strong></div>
                                            <div>Progreso Reciente (15 días): <strong style={{ color: '#000' }}>{group.metrics.recent_progress_15d_percent.toFixed(1)}%</strong></div>
                                            <div style={{ gridColumn: 'span 2' }}>Cursos Completados: <strong style={{ color: '#000' }}>{group.metrics.courses_completion_percent.toFixed(1)}%</strong></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {studentObservations && (
                        <div className="pdf-section" style={{ marginTop: '20px', pageBreakInside: 'avoid' }}>
                            <h3 className="pdf-subtitle" style={{ fontSize: '16px' }}>Observaciones del Mentor - Alumnos</h3>
                            <div style={{
                                padding: '15px',
                                backgroundColor: '#8383fd',
                                color: 'white',
                                borderRadius: '8px',
                                whiteSpace: 'pre-wrap',
                                fontSize: '12px',
                                lineHeight: '1.5',
                                border: '1px solid #7171e0'
                            }}>
                                {studentObservations}
                            </div>
                        </div>
                    )}

                    {/* ACOMPAÑAMIENTO PEDAGÓGICO */}
                    {(scheduledMentorings > 0 || completedMentorings > 0) && (
                        <div className="pdf-section" style={{ marginTop: '20px', pageBreakInside: 'avoid' }}>
                            <h3 className="pdf-subtitle" style={{ fontSize: '16px' }}>🤝 Acompañamiento Pedagógico</h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                gap: '15px',
                                padding: '20px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '12px',
                                border: '1px solid #eee',
                                textAlign: 'center'
                            }}>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>Agendadas</div>
                                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#000', marginTop: '5px' }}>{scheduledMentorings}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>Concretadas</div>
                                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#00cc7e', marginTop: '5px' }}>{completedMentorings}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>Cumplimiento</div>
                                    <div style={{
                                        fontSize: '24px',
                                        fontWeight: '800',
                                        color: scheduledMentorings > 0 && (completedMentorings / scheduledMentorings) >= 0.8 ? '#00cc7e' : '#ff8d7a',
                                        marginTop: '5px'
                                    }}>
                                        {scheduledMentorings > 0 ? ((completedMentorings / scheduledMentorings) * 100).toFixed(0) : 0}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* SECCION DOCENTES - Nueva pagina */}
            <div className="pdf-page-container">
                <div className="pdf-page" style={{ height: 'auto', minHeight: '297mm', pageBreakInside: 'auto' }}>
                    <div className="pdf-section" style={{ marginTop: '20px' }}>
                        <h2 className="pdf-title" style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>👩‍🏫 Métricas de capacitación Docente</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', margin: '20px 0' }}>
                            <div style={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'center', border: '1px solid #eee' }}>
                                <div style={{ fontSize: '11px', color: '#666' }}>Total Docentes</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#000' }}>{teachers_pld.summary.total_teachers}</div>
                            </div>
                            <div style={{ padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '8px', textAlign: 'center', border: '1px solid #d4edda' }}>
                                <div style={{ fontSize: '11px', color: '#666' }}>Certificados</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#2e7d32' }}>{teachers_pld.summary.certified_teachers}</div>
                            </div>
                            <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', textAlign: 'center', border: '1px solid #cce5ff' }}>
                                <div style={{ fontSize: '11px', color: '#666' }}>Tasa de Certificación</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#1565c0' }}>{teachers_pld.summary.certification_rate_percent.toFixed(0)}%</div>
                            </div>
                        </div>

                        <h3 className="pdf-subtitle" style={{ fontSize: '16px', marginBottom: '15px' }}>Listado de Docentes</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                            {teachers_pld.teachers.map((teacher, index) => {
                                const progress = teacher.progress_percent;
                                const radius = 30;
                                const circumference = 2 * Math.PI * radius;
                                const offset = circumference - (progress / 100) * circumference;

                                return (
                                    <div key={index} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '10px',
                                        backgroundColor: '#fdfdfd',
                                        border: '1px solid #efefef',
                                        borderRadius: '8px',
                                        pageBreakInside: 'avoid'
                                    }}>
                                        <svg width="70" height="70">
                                            <circle cx="35" cy="35" r={radius} fill="white" stroke={teacher.certified ? '#00cc7e' : '#ff8d7a'} strokeWidth="5" />
                                        </svg>
                                        <p style={{ fontSize: '9px', fontWeight: '700', textAlign: 'center', margin: '8px 0 0 0', lineHeight: '1.2', color: '#333' }}>{teacher.name}</p>
                                        <div style={{ fontSize: '8px', color: teacher.certified ? '#00cc7e' : '#ff8d7a', fontWeight: '800', marginTop: '2px' }}>
                                            {teacher.certified ? 'Certificado ✔' : 'No certificado ✕'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {teacherObservations && (
                        <div className="pdf-section" style={{ marginTop: '30px', pageBreakInside: 'avoid' }}>
                            <h3 className="pdf-subtitle" style={{ fontSize: '16px' }}>Observaciones del Mentor - Docentes</h3>
                            <div style={{
                                padding: '15px',
                                backgroundColor: '#8383fd',
                                color: 'white',
                                borderRadius: '8px',
                                whiteSpace: 'pre-wrap',
                                fontSize: '12px',
                                lineHeight: '1.5',
                                border: '1px solid #7171e0'
                            }}>
                                {teacherObservations}
                            </div>
                        </div>
                    )}

                    <div className="pdf-metadata" style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                        <p style={{ margin: '0' }}><strong>Generado por:</strong> Reporte Automático Playground</p>
                        <p style={{ margin: '5px 0 0 0' }}><strong>Fecha:</strong> {new Date(metadata.generated_at).toLocaleString('es-AR')}</p>
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: '5mm', left: '5mm', right: '5mm' }}>
                    <img src={bannerFooter} alt="Footer" style={{ width: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default PDFTemplate;

