import { useReport } from '../../context/ReportContext';
import { getSemaphoreLabel } from '../../utils/semaphoreLogic';
import bannerHeader from '../../assets/banner-header.png';
import bannerFooter from '../../assets/banner-footer.png';
import bannerPortadaFooter from '../../assets/banner-portada-footer.png';

const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

const PDFTemplate = ({ contentRef }) => {
    const {
        reportData,
        generalSemaphore,
        semaphores,
        studentObservations,
        teacherObservations,
        scheduledMentorings,
        completedMentorings,
        hasRedWarning,
        groupFeedback,

        teacherSettings,
        teacherMetrics,
        mentorName
    } = useReport();

    if (!reportData) return null;

    const { school, students, teachers_pld, metadata } = reportData;

    // Alumnos (3 filas x 2 col = 6) - Ajustado para evitar cortes con mucho feedback
    const groupChunks = chunkArray(students.groups, 6);

    // Docentes (6 filas x 2 col = 12)
    const visibleTeachers = teachers_pld.teachers.filter(t => !teacherSettings[t.name]?.isDeleted);
    const teacherChunks = chunkArray(visibleTeachers, 12);

    return (
        <div ref={contentRef} className="pdf-template">
            {/* PAGINA 1: PORTADA */}
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
                        {hasRedWarning && (
                            <div style={{ color: '#ff8d7a', fontSize: '14px', fontWeight: '700', marginTop: '10px' }}>
                                ⚠️ Hay grupos que requieren atención inmediata
                            </div>
                        )}
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

            {/* SECCION ALUMNOS */}
            {groupChunks.map((chunk, chunkIdx) => (
                <div key={`students-page-${chunkIdx}`} className="pdf-page-container">
                    <div className="pdf-page" style={{ height: 'auto', minHeight: '297mm', pageBreakInside: 'auto' }}>
                        <div className="pdf-section" style={{ marginTop: '20px' }}>
                            {chunkIdx === 0 && (
                                <>
                                    <h2 className="pdf-title" style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>📚 Métricas de Alumnos</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '20px 0' }}>
                                        <div style={{ padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', borderLeft: '4px solid #2196F3', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '12px', color: '#555', fontWeight: 'bold' }}>Vitalidad Digital (30 días)</div>
                                                <div style={{ fontSize: '24px', fontWeight: '800', color: '#000' }}>{students.summary.digital_vitality_30d_avg.toFixed(1)}%</div>
                                            </div>
                                            <div style={{ flex: 1, fontSize: '9px', color: '#777', fontStyle: 'italic', lineHeight: '1.2', borderLeft: '1px solid #d1d9e0', paddingLeft: '10px' }}>
                                                Porcentaje de frecuencia de acceso a la plataforma (últimos 30 días).
                                            </div>
                                        </div>
                                        <div style={{ padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', borderLeft: '4px solid #2196F3', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '12px', color: '#555', fontWeight: 'bold' }}>Progreso Reciente (15 días)</div>
                                                <div style={{ fontSize: '24px', fontWeight: '800', color: '#000' }}>{students.summary.recent_progress_15d_avg.toFixed(1)}%</div>
                                            </div>
                                            <div style={{ flex: 1, fontSize: '9px', color: '#777', fontStyle: 'italic', lineHeight: '1.2', borderLeft: '1px solid #d1d9e0', paddingLeft: '10px' }}>
                                                Porcentaje de avance en contenidos y lecciones completadas (últimos 15 días).
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                                <h3 className="pdf-subtitle" style={{ fontSize: '16px', margin: '0' }}>Detalle de Alumnos por Ruta {groupChunks.length > 1 ? `(Parte ${chunkIdx + 1})` : ''}</h3>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#444' }}>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#00cc7e', display: 'inline-block' }}></span> A tiempo
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#444' }}>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffd148', display: 'inline-block' }}></span> A fortalecer
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#444' }}>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff8d7a', display: 'inline-block' }}></span> Requiere atención
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {chunk.map((group, index) => {
                                    const semaphore = semaphores[group.route_name] || 'gray';
                                    const semaphoreColor = semaphore === 'green' ? '#00cc7e' : semaphore === 'yellow' ? '#ffd148' : semaphore === 'red' ? '#ff8d7a' : '#9e9e9e';
                                    return (
                                        <div key={index} style={{
                                            padding: '12px',
                                            borderLeft: `5px solid ${semaphoreColor}`,
                                            backgroundColor: '#fdfdfd',
                                            border: '1px solid #efefef',
                                            borderLeftWidth: '5px',
                                            borderRadius: '8px',
                                            pageBreakInside: 'avoid',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                        }}>
                                            <div style={{ marginBottom: '10px', borderBottom: '1px solid #f5f5f5', paddingBottom: '5px' }}>
                                                <p style={{ fontWeight: '800', fontSize: '12px', margin: '0', color: '#000000' }}>{group.route_name}</p>
                                                <p style={{ fontSize: '10px', color: '#888', margin: '2px 0 0 0' }}>{group.students_count} {group.students_count === 1 ? 'alumno' : 'alumnos'}</p>
                                                <small style={{ fontSize: '7px', color: '#888', margin: '2px 0 0 0' }}>* Los % de avance corresponden al 100% de la certificación.</small>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '10px', color: '#444' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    <div>Clases Completadas: <strong style={{ color: '#000' }}>{group.metrics.classes_completion_percent.toFixed(1)}%</strong></div>
                                                    <div>Cursos Completados: <strong style={{ color: '#000' }}>{group.metrics.courses_completion_percent.toFixed(1)}%</strong></div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    <div>Vitalidad Digital (30 días): <strong style={{ color: '#000' }}>{group.metrics.digital_vitality_30d_percent.toFixed(1)}%</strong></div>
                                                    <div>Progreso Reciente (15 días): <strong style={{ color: '#000' }}>{group.metrics.recent_progress_15d_percent.toFixed(1)}%</strong></div>
                                                </div>
                                            </div>
                                            {(groupFeedback[group.route_name] && groupFeedback[group.route_name].length > 0) && (
                                                <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #ddd' }}>
                                                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#333', marginBottom: '6px' }}>Feedback:</div>
                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr',
                                                        gap: '4px 15px'
                                                    }}>
                                                        {groupFeedback[group.route_name].map((reason, rIndex) => (
                                                            <div key={rIndex} style={{
                                                                fontSize: '9px',
                                                                color: '#555',
                                                                paddingLeft: '6px',
                                                                borderLeft: '2px solid #ddd',
                                                                lineHeight: '1.2'
                                                            }}>
                                                                • {reason}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {chunkIdx === groupChunks.length - 1 && studentObservations && (
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
                        </div>
                    </div>
                </div>
            ))}

            {/* SECCION DOCENTES */}
            {teacherChunks.map((chunk, chunkIdx) => (
                <div key={`teachers-page-${chunkIdx}`} className="pdf-page-container" style={{ pageBreakBefore: 'always' }}>
                    <div className="pdf-page" style={{ height: 'auto', minHeight: '297mm', pageBreakInside: 'auto' }}>
                        <div className="pdf-section" style={{ marginTop: '20px' }}>
                            {chunkIdx === 0 && (
                                <>
                                    <h2 className="pdf-title" style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>👩‍🏫 Métricas de capacitación Docente</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', margin: '20px 0' }}>
                                        <div style={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'center', border: '1px solid #eee' }}>
                                            <div style={{ fontSize: '11px', color: '#666' }}>Total Docentes</div>
                                            <div style={{ fontSize: '20px', fontWeight: '800', color: '#000' }}>{teacherMetrics.totalTeachers}</div>
                                        </div>
                                        <div style={{ padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '8px', textAlign: 'center', border: '1px solid #d4edda' }}>
                                            <div style={{ fontSize: '11px', color: '#666' }}>Certificaciones finalizadas</div>
                                            <div style={{ fontSize: '20px', fontWeight: '800', color: '#2e7d32' }}>{teacherMetrics.finishedCertifications}</div>
                                        </div>
                                        <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', textAlign: 'center', border: '1px solid #cce5ff' }}>
                                            <div style={{ fontSize: '11px', color: '#666' }}>Tasa de Certificación</div>
                                            <div style={{ fontSize: '20px', fontWeight: '800', color: '#1565c0' }}>{teacherMetrics.certificationRate.toFixed(0)}%</div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <h3 className="pdf-subtitle" style={{ fontSize: '16px', marginBottom: '15px' }}>Listado de Docentes {teacherChunks.length > 1 ? `(Parte ${chunkIdx + 1})` : ''}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {chunk.map((teacher, index) => {
                                    const settings = teacherSettings[teacher.name] || { teaching: true, communication: 'Fluida', deletedPlds: [] };
                                    const activePlds = teacher.plds.filter(p => !settings.deletedPlds.includes(p.certification_name));
                                    return (
                                        <div key={index} style={{
                                            padding: '12px',
                                            backgroundColor: '#fdfdfd',
                                            border: '1px solid #efefef',
                                            borderRadius: '8px',
                                            pageBreakInside: 'avoid',
                                            marginBottom: '5px'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#000' }}>{teacher.name}</span>
                                                    <span style={{
                                                        fontSize: '7px',
                                                        padding: '1px 6px',
                                                        borderRadius: '8px',
                                                        backgroundColor: settings.teaching ? '#e6fffa' : '#edf2f7',
                                                        color: settings.teaching ? '#008672' : '#4a5568',
                                                        fontWeight: '700',
                                                        border: `1px solid ${settings.teaching ? '#b2f5ea' : '#e2e8f0'}`,
                                                        alignSelf: 'flex-start'
                                                    }}>
                                                        {settings.teaching ? 'Da clases' : 'No da clases'}
                                                    </span>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '8px', color: '#666', fontWeight: '600' }}>Comunicación:</div>
                                                    <div style={{
                                                        fontSize: '9px',
                                                        fontWeight: '800',
                                                        color: settings.communication === 'Fluida' ? '#00cc7e' :
                                                            settings.communication === 'A reforzar' ? '#ffd148' :
                                                                settings.communication === 'Con Dificultades' ? '#ff8d7a' :
                                                                    settings.communication === 'Sin comunicación' ? '#6b46c1' : '#666'
                                                    }}>
                                                        {settings.communication}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '8px', borderLeft: '2px solid #eee' }}>
                                                {activePlds.map((pld, idx) => (
                                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ fontSize: '8px', color: '#444', flex: 1, lineHeight: '1.1' }}>{pld.certification_name}</span>
                                                        <div style={{ width: '40px', height: '3px', backgroundColor: '#eee', borderRadius: '2px', overflow: 'hidden' }}>
                                                            <div style={{
                                                                width: `${pld.progress_percent}%`,
                                                                height: '100%',
                                                                backgroundColor: pld.certified ? '#00cc7e' : '#ff8d7a'
                                                            }} />
                                                        </div>
                                                        <span style={{ fontSize: '8px', fontWeight: '700', color: '#000', width: '22px' }}>{pld.progress_percent.toFixed(0)}%</span>
                                                        {pld.certified && <span style={{ color: '#00cc7e', fontSize: '8px', fontWeight: 'bold' }}>✔</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* PAGINA FINAL: ACOMPAÑAMIENTO Y OBSERVACIONES */}
            <div className="pdf-page-container" style={{ pageBreakBefore: 'always' }}>
                <div className="pdf-page" style={{ height: 'auto', minHeight: '297mm', position: 'relative', padding: '15mm', backgroundColor: 'white', boxSizing: 'border-box' }}>
                    <div className="pdf-content">
                        {(scheduledMentorings > 0 || completedMentorings > 0) ? (
                            <div className="pdf-section" style={{ marginTop: '20px' }}>
                                <h3 className="pdf-subtitle" style={{ fontSize: '16px' }}>🤝 Acompañamiento Pedagógico Sincrónico<span style={{ fontSize: '10px', fontWeight: '300' }}> (Desde el inicio del presente ciclo lectivo 📅)</span></h3>
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
                                        <div style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>Participación</div>
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
                        ) : (
                            <div style={{ marginTop: '20px' }}>
                                <h4 className="pdf-subtitle" style={{ fontSize: '13px', marginBottom: '15px', color: '#666' }}>No se registran encuentros sincrónicos de acompañamiento pedagógico realizados 📆</h4>
                            </div>
                        )}

                        {teacherObservations && (
                            <div className="pdf-section" style={{ marginTop: '30px' }}>
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

                        <div className="pdf-metadata" style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                            {mentorName && (
                                <p style={{ margin: '0 0 5px 0' }}><strong>Mentor Responsable:</strong> {mentorName}</p>
                            )}
                            <p style={{ margin: '0' }}><strong>Generado por:</strong> Reporte Automático Playground</p>
                            <p style={{ margin: '5px 0 0 0' }}><strong>Fecha:</strong> {new Date(metadata.generated_at).toLocaleString('es-AR')}</p>
                        </div>
                    </div>

                    {/* Banner de Footer fijo al final de esta última hoja */}
                    <div style={{ position: 'absolute', bottom: '5mm', left: '5mm', right: '5mm' }}>
                        <img src={bannerFooter} alt="Footer" style={{ width: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDFTemplate;
