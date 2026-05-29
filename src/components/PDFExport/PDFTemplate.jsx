import { useReport } from '../../context/ReportContext';
import { getLocalizedBanner } from '../../i18n/assets';
import { normalizeCommunicationKey, normalizeFeedbackKey } from '../../utils/constants';
import bannerPortadaFooter from '../../assets/banner-portada-footer.png';

const chunkArray = (array, size) => {
    const result = [];
    if (!array) return result;
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

const semaphoreColor = (value) => {
    if (value === 'green') return '#00cc7e';
    if (value === 'yellow') return '#ffd148';
    if (value === 'red') return '#ff8d7a';
    return '#9e9e9e';
};

const communicationColor = (value) => {
    if (value === 'fluid') return '#00cc7e';
    if (value === 'needs_reinforcement') return '#ffd148';
    if (value === 'difficult') return '#ff8d7a';
    if (value === 'none') return '#6b46c1';
    return '#666';
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
        mentorName,
        includeStudents,
        includeTeachers,
        studentViewMode,
        showMandatoryCourseMetric,
        showVitalityMetric,
        showProgressMetric,
        showGroupMandatoryCourses,
        vitalityTimeWindow,
        progressTimeWindow,
        language,
        locale,
        t,
    } = useReport();

    if (!reportData) return null;

    const { school, students, teachers_pld, metadata } = reportData;
    const bannerHeader = getLocalizedBanner(language, 'header');
    const bannerFooter = getLocalizedBanner(language, 'footer');
    const studentsPerPage = studentViewMode === 'cards' ? 6 : 10;
    const groupChunks = includeStudents ? chunkArray(students?.groups, studentsPerPage) : [];
    const isShortObservations = studentObservations && studentObservations.length <= 700;
    const lastChunkSize = groupChunks[groupChunks.length - 1]?.length || 0;
    const shouldBeInline = isShortObservations && lastChunkSize <= 6;
    const visibleTeachers = includeTeachers ? (teachers_pld?.teachers?.filter(item => !teacherSettings[item.name]?.isDeleted) || []) : [];
    const teacherChunks = chunkArray(visibleTeachers, 12);
    const studentSummaryMetricCount = [showMandatoryCourseMetric, showVitalityMetric, showProgressMetric].filter(Boolean).length;
    const showStudentSummaryBlock = studentSummaryMetricCount > 0;

    const formatCourseMetric = (value) => {
        if (typeof value !== 'string' || !value.includes(' de ')) return value;
        const [percent, rest] = value.split(' de ');
        const total = rest.split(' ')[0];
        return t('courses.percentOfCourses', { percent: parseFloat(percent) || 0, total });
    };

    const parseCoursesStr = (str) => {
        if (!str || typeof str !== 'string') return { percent: 0, label: t('courses.percentOfCourses', { percent: 0, total: 0 }) };
        const parts = str.split(' de ');
        if (parts.length < 2) return { percent: 0, label: str };
        const current = parseFloat(parts[0]) || 0;
        const total = parseFloat(parts[1].split(' ')[0]) || 1;
        return {
            percent: Math.min(100, Math.max(0, current)),
            label: t('courses.percentOfCourses', { percent: current, total }),
        };
    };

    const formatStudentCount = (count) => count === 1
        ? t('students.studentCount', { count })
        : t('students.studentsCount', { count });

    const renderStudentObservationsBlock = () => (
        <div className="pdf-section" style={{ marginTop: '20px' }}>
            <h3 className="pdf-subtitle" style={{ fontSize: '16px' }}>{t('students.observationsTitle')}</h3>
            <div className="observations-container">
                {studentObservations.split('\n').filter(p => p.trim() !== '').map((para, pIdx) => (
                    <div key={pIdx} style={{
                        padding: '12px 15px',
                        backgroundColor: '#8383fd',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '12px',
                        lineHeight: '1.5',
                        border: '1px solid #7171e0',
                        marginBottom: '8px',
                        pageBreakInside: 'avoid'
                    }}>
                        {para}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderTeacherSummary = () => (
        <>
            <h2 className="pdf-title" style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>{t('teachers.title')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', margin: '20px 0' }}>
                <div style={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'center', border: '1px solid #eee' }}>
                    <div style={{ fontSize: '11px', color: '#666' }}>{t('teachers.totalTeachers')}</div>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#000' }}>{teacherMetrics.totalTeachers}</div>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '8px', textAlign: 'center', border: '1px solid #d4edda' }}>
                    <div style={{ fontSize: '11px', color: '#666' }}>{t('teachers.finishedCertifications')}</div>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#2e7d32' }}>{teacherMetrics.finishedCertifications}</div>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', textAlign: 'center', border: '1px solid #cce5ff' }}>
                    <div style={{ fontSize: '11px', color: '#666' }}>{t('teachers.certificationRate')}</div>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#1565c0' }}>{teacherMetrics.certificationRate.toFixed(0)}%</div>
                </div>
            </div>
        </>
    );

    const renderTeacherListChunk = (chunk, chunkIdx) => (
        <>
            <h3 className="pdf-subtitle" style={{ fontSize: '16px', marginBottom: '15px' }}>
                {t('teachers.listTitle')} {teacherChunks.length > 1 ? `(${t('students.part', { number: chunkIdx + 1 })})` : ''}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {chunk.map((teacher, index) => {
                    const rawSettings = teacherSettings[teacher.name] || { teaching: true, communication: 'fluid', deletedPlds: [] };
                    const settings = {
                        ...rawSettings,
                        communication: normalizeCommunicationKey(rawSettings.communication),
                    };
                    const activePlds = teacher.plds.filter(item => !settings.deletedPlds.includes(item.certification_name));
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
                                        {settings.teaching ? t('teachers.teaching') : t('teachers.notTeaching')}
                                    </span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '8px', color: '#666', fontWeight: '600' }}>{t('teachers.communication')}</div>
                                    <div style={{ fontSize: '9px', fontWeight: '800', color: communicationColor(settings.communication) }}>
                                        {t(`communication.${settings.communication}`)}
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
                                        {pld.certified && <span style={{ color: '#00cc7e', fontSize: '8px', fontWeight: 'bold' }}>✓</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );

    const renderStudentCards = (chunk) => (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {chunk.map((group, index) => {
                const currentSemaphore = semaphores[group.route_name] || 'gray';
                const color = semaphoreColor(currentSemaphore);
                const feedbacks = (groupFeedback[group.route_name] || []).map(normalizeFeedbackKey);
                const mandatory = group.metrics.mandatory_courses_completion_percent !== null
                    ? parseCoursesStr(group.metrics.mandatory_courses_completion_percent)
                    : null;
                const total = parseCoursesStr(group.metrics.courses_completion_percent);

                return (
                    <div key={index} style={{ border: `1px solid ${color}`, borderLeft: `5px solid ${color}`, borderRadius: '8px', padding: '10px', pageBreakInside: 'avoid' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                            <div>
                                <div style={{ fontSize: '12px', fontWeight: '800', color: '#000' }}>{group.route_name}</div>
                                <div style={{ fontSize: '8px', color: '#777' }}>{formatStudentCount(group.students_count)}</div>
                            </div>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: color }} />
                        </div>
                        {feedbacks.length > 0 && (
                            <div style={{ fontSize: '7.5px', color: '#555', fontStyle: 'italic', marginBottom: '8px' }}>
                                {t('students.feedbackPdf')}: {feedbacks.map(item => t(`feedback.${item}`)).join(', ')}
                            </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                            <div style={{ fontSize: '7.5px' }}><strong>{t('students.completedClasses')}</strong><br />{formatCourseMetric(group.metrics.classes_completion_percent)}</div>
                            <div style={{ fontSize: '7.5px' }}><strong>{t('students.vitalityTitle')}</strong><br />{group.metrics[`digital_vitality_${vitalityTimeWindow}_percent`]?.toFixed(1)}%</div>
                            <div style={{ fontSize: '7.5px' }}><strong>{t('students.recentProgressTitle')}</strong><br />{group.metrics[`recent_progress_${progressTimeWindow}_percent`]?.toFixed(1)}%</div>
                        </div>
                        {mandatory && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                {showGroupMandatoryCourses && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '58px', fontSize: '7.5px', color: '#666', fontWeight: 'bold' }}>{t('students.mandatory')}</div>
                                        <div style={{ flex: 1, height: '6px', backgroundColor: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: `${mandatory.percent}%`, height: '100%', backgroundColor: '#00cc7e' }} />
                                        </div>
                                        <div style={{ fontSize: '8px', fontWeight: 'bold' }}>{mandatory.label}</div>
                                    </div>
                                )}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: showGroupMandatoryCourses ? '58px' : '75px', fontSize: '7.5px', color: '#666', fontWeight: 'bold' }}>{t('students.totalCourses')}</div>
                                    <div style={{ flex: 1, height: '6px', backgroundColor: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: `${total.percent}%`, height: '100%', backgroundColor: '#2196F3' }} />
                                    </div>
                                    <div style={{ fontSize: '8px', fontWeight: 'bold' }}>{total.label}</div>
                                </div>
                                <div style={{ fontSize: '6px', color: '#888', fontStyle: 'italic' }}>{t('students.totalCoursesNote')}</div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    const renderStudentTable = (chunk) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8.2px' }}>
            <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                    <th style={{ padding: '6px 4px', textAlign: 'left', fontWeight: '800', width: '28%' }}>{t('students.groupRoute')}</th>
                    <th style={{ padding: '6px 2px', textAlign: 'center', fontWeight: '800', width: '8%' }}>{t('students.state')}</th>
                    <th style={{ padding: '6px 2px', textAlign: 'center', fontWeight: '800', width: '15%' }}>{t('students.completedClasses')}</th>
                    <th style={{ padding: '6px 2px', textAlign: 'left', fontWeight: '800', width: '23%', paddingLeft: '10px' }}>{t('students.courseProgress')}</th>
                    <th style={{ padding: '6px 2px', textAlign: 'center', fontWeight: '800', width: '13%' }}>{t('students.vitalityTitle')} ({vitalityTimeWindow === '30d' ? '30' : '15'} {t('common.days')})</th>
                    <th style={{ padding: '6px 2px', textAlign: 'center', fontWeight: '800', width: '13%' }}>{t('students.recentProgressTitle')} ({progressTimeWindow === '15d' ? '15' : '30'} {t('common.days')})</th>
                </tr>
            </thead>
            <tbody>
                {chunk.map((group, index) => {
                    const currentSemaphore = semaphores[group.route_name] || 'gray';
                    const color = semaphoreColor(currentSemaphore);
                    const feedbacks = (groupFeedback[group.route_name] || []).map(normalizeFeedbackKey);
                    const mandatory = group.metrics.mandatory_courses_completion_percent !== null
                        ? parseCoursesStr(group.metrics.mandatory_courses_completion_percent)
                        : null;
                    const total = parseCoursesStr(group.metrics.courses_completion_percent);

                    return (
                        <tr key={index} style={{ borderBottom: '1px solid #f0f0f0', pageBreakInside: 'avoid' }}>
                            <td style={{ padding: '6px 4px', borderLeft: `4px solid ${color}` }}>
                                <div style={{ fontWeight: '700', color: '#000', fontSize: '8.5px' }}>{group.route_name}</div>
                                <div style={{ fontSize: '7.5px', color: '#888' }}>{formatStudentCount(group.students_count)}</div>
                                {feedbacks.length > 0 && (
                                    <div style={{ marginTop: '4px', fontSize: '7.5px', color: '#555', fontStyle: 'italic' }}>
                                        {t('students.feedbackPdf')}: {feedbacks.map(item => t(`feedback.${item}`)).join(', ')}
                                    </div>
                                )}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color, margin: '0 auto' }} />
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center', fontWeight: '700' }}>{formatCourseMetric(group.metrics.classes_completion_percent)}</td>
                            <td style={{ padding: '8px 10px', textAlign: 'left' }}>
                                {mandatory && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                                        {showGroupMandatoryCourses && (
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ fontSize: '7px', color: '#666', fontWeight: 'bold' }}>{t('students.mandatory')}</div>
                                                    <div style={{ fontSize: '7px', fontWeight: 'bold' }}>{mandatory.label}</div>
                                                </div>
                                                <div style={{ width: '100%', height: '5px', backgroundColor: '#eee', borderRadius: '2.5px', overflow: 'hidden' }}>
                                                    <div style={{ width: `${mandatory.percent}%`, height: '100%', backgroundColor: '#00cc7e' }} />
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div style={{ fontSize: '7px', color: '#666', fontWeight: 'bold' }}>{t('students.totalCourses')}</div>
                                                <div style={{ fontSize: '7px', fontWeight: 'bold' }}>{total.label}</div>
                                            </div>
                                            <div style={{ width: '100%', height: '5px', backgroundColor: '#eee', borderRadius: '2.5px', overflow: 'hidden' }}>
                                                <div style={{ width: `${total.percent}%`, height: '100%', backgroundColor: '#2196F3' }} />
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '2px', fontSize: '5px', color: '#888', fontStyle: 'italic' }}>{t('students.totalCoursesNote')}</div>
                                    </div>
                                )}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center', fontWeight: '700' }}>
                                {group.metrics[`digital_vitality_${vitalityTimeWindow}_percent`] === 100 ? '100' : group.metrics[`digital_vitality_${vitalityTimeWindow}_percent`]?.toFixed(1)}%
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center', fontWeight: '700' }}>
                                {group.metrics[`recent_progress_${progressTimeWindow}_percent`] === 100 ? '100' : group.metrics[`recent_progress_${progressTimeWindow}_percent`]?.toFixed(1)}%
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    return (
        <div ref={contentRef} className="pdf-template">
            <div className="pdf-page" style={{ display: 'flex', flexDirection: 'column' }}>
                <img src={bannerHeader} alt="Header" style={{ width: '100%', marginBottom: '40px' }} />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '32px', marginBottom: '40px', fontWeight: '800', color: '#000000' }}>{school.id}</h1>

                    <div style={{ marginBottom: '40px' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: semaphoreColor(generalSemaphore),
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
                        <h2 style={{ fontSize: '24px', margin: '0', color: '#000000' }}>{t('school.generalStatus')}: {t(`semaphores.${generalSemaphore}`)}</h2>
                        {hasRedWarning && (
                            <div style={{ color: '#ff8d7a', fontSize: '14px', fontWeight: '700', marginTop: '10px' }}>
                                {t('school.redWarningPdf')}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '500px', width: '100%', marginTop: '20px' }}>
                        <div style={{ padding: '20px', background: '#f8f8f8', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '28px', fontWeight: '800', color: '#000000' }}>{school.total_students}</div>
                            <div style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>{t('school.totalStudents')}</div>
                        </div>
                        <div style={{ padding: '20px', background: '#f8f8f8', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '28px', fontWeight: '800', color: '#000000' }}>{school.total_student_groups}</div>
                            <div style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>{t('school.totalGroups')}</div>
                        </div>
                    </div>
                </div>

                <img src={bannerPortadaFooter} alt="Cover Footer" style={{ width: '100%', marginTop: '40px' }} />
            </div>

            {includeStudents && groupChunks.map((chunk, chunkIdx) => (
                <div key={`students-page-${chunkIdx}`} className="pdf-page-container">
                    <div className="pdf-page" style={{ height: 'auto', minHeight: '297mm', pageBreakInside: 'auto' }}>
                        <div className="pdf-section" style={{ marginTop: '20px' }}>
                            {chunkIdx === 0 && showStudentSummaryBlock && (
                                <>
                                    <h2 className="pdf-title" style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>{t('students.title')}</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${studentSummaryMetricCount}, 1fr)`, gap: '15px', margin: '20px 0' }}>
                                        {showMandatoryCourseMetric && (
                                            <div style={{ padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', borderLeft: '4px solid #00cc7e', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '11px', color: '#555', fontWeight: 'bold' }}>{t('students.mandatoryRateTitle')}</div>
                                                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#000' }}>{(students.summary.mandatory_courses_full_completion_percent || 0).toFixed(1)}%</div>
                                                </div>
                                                <div style={{ flex: 1, fontSize: '8px', color: '#777', fontStyle: 'italic', lineHeight: '1.2', borderLeft: '1px solid #d1d9e0', paddingLeft: '8px' }}>
                                                    {t('students.mandatoryRateDescription')}
                                                </div>
                                            </div>
                                        )}
                                        {showVitalityMetric && (
                                            <div style={{ padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', borderLeft: '4px solid #2196F3', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '11px', color: '#555', fontWeight: 'bold' }}>{t('students.vitalityTitle')} (30 {t('common.days')})</div>
                                                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#000' }}>{students.summary.digital_vitality_30d_avg.toFixed(1)}%</div>
                                                </div>
                                                <div style={{ flex: 1, fontSize: '8px', color: '#777', fontStyle: 'italic', lineHeight: '1.2', borderLeft: '1px solid #d1d9e0', paddingLeft: '8px' }}>
                                                    {t('students.vitalityDescription', { days: 30 })}
                                                </div>
                                            </div>
                                        )}
                                        {showProgressMetric && (
                                            <div style={{ padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', borderLeft: '4px solid #8383fd', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '11px', color: '#555', fontWeight: 'bold' }}>{t('students.recentProgressTitle')} (15 {t('common.days')})</div>
                                                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#000' }}>{students.summary.recent_progress_15d_avg.toFixed(1)}%</div>
                                                </div>
                                                <div style={{ flex: 1, fontSize: '8px', color: '#777', fontStyle: 'italic', lineHeight: '1.2', borderLeft: '1px solid #d1d9e0', paddingLeft: '8px' }}>
                                                    {t('students.recentProgressDescription', { days: 15 })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                                <h3 className="pdf-subtitle" style={{ fontSize: '16px', margin: '0' }}>
                                    {t('students.detailByRoute')} {groupChunks.length > 1 ? `(${t('students.part', { number: chunkIdx + 1 })})` : ''}
                                </h3>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    {['green', 'yellow', 'red'].map(item => (
                                        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#444' }}>
                                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: semaphoreColor(item), display: 'inline-block' }}></span> {t(`semaphores.${item}`)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {studentViewMode === 'cards' ? renderStudentCards(chunk) : renderStudentTable(chunk)}

                            {chunkIdx === groupChunks.length - 1 && shouldBeInline && (
                                <div style={{ marginTop: '20px' }}>
                                    {renderStudentObservationsBlock()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {includeStudents && studentObservations && !shouldBeInline && (
                <div className="pdf-page-container" style={{ pageBreakBefore: 'always' }}>
                    <div className="pdf-page" style={{ height: 'auto', minHeight: '297mm', pageBreakInside: 'auto' }}>
                        <div className="pdf-section" style={{ marginTop: '20px' }}>
                            {renderStudentObservationsBlock()}
                        </div>
                    </div>
                </div>
            )}

            {includeTeachers && teacherChunks.map((chunk, chunkIdx) => (
                <div key={`teachers-page-${chunkIdx}`} className="pdf-page-container" style={{ pageBreakBefore: 'always' }}>
                    <div className="pdf-page" style={{ height: 'auto', minHeight: '297mm', pageBreakInside: 'auto' }}>
                        <div className="pdf-section" style={{ marginTop: '20px' }}>
                            {chunkIdx === 0 && renderTeacherSummary()}
                            {renderTeacherListChunk(chunk, chunkIdx)}
                        </div>
                    </div>
                </div>
            ))}

            <div className="pdf-page-container" style={{ pageBreakBefore: 'always' }}>
                <div className="pdf-page" style={{ height: 'auto', minHeight: '297mm', position: 'relative', padding: '15mm', backgroundColor: 'white', boxSizing: 'border-box' }}>
                    <div className="pdf-content">
                        {includeTeachers && ((scheduledMentorings > 0 || completedMentorings > 0) ? (
                            <div className="pdf-section" style={{ marginTop: '20px' }}>
                                <h3 className="pdf-subtitle" style={{ fontSize: '16px' }}>{t('mentoring.title')} <span style={{ fontSize: '10px', fontWeight: '300' }}>{t('mentoring.subtitle')}</span></h3>
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
                                        <div style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>{t('mentoring.scheduledShort')}</div>
                                        <div style={{ fontSize: '24px', fontWeight: '800', color: '#000', marginTop: '5px' }}>{scheduledMentorings}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>{t('mentoring.completedShort')}</div>
                                        <div style={{ fontSize: '24px', fontWeight: '800', color: '#00cc7e', marginTop: '5px' }}>{completedMentorings}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>{t('mentoring.participation')}</div>
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
                                <h4 className="pdf-subtitle" style={{ fontSize: '13px', marginBottom: '15px', color: '#666' }}>{t('mentoring.noMeetings')}</h4>
                            </div>
                        ))}

                        {includeTeachers && teacherObservations && (
                            <div className="pdf-section" style={{ marginTop: '30px' }}>
                                <h3 className="pdf-subtitle" style={{ fontSize: '16px' }}>{t('teachers.observationsTitle')}</h3>
                                <div className="observations-container">
                                    {teacherObservations.split('\n').filter(p => p.trim() !== '').map((para, pIdx) => (
                                        <div key={pIdx} style={{
                                            padding: '12px 15px',
                                            backgroundColor: '#8383fd',
                                            color: 'white',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            lineHeight: '1.5',
                                            border: '1px solid #7171e0',
                                            marginBottom: '8px',
                                            pageBreakInside: 'avoid'
                                        }}>
                                            {para}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pdf-metadata" style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                            {mentorName && (
                                <p style={{ margin: '0 0 5px 0' }}><strong>{t('pdf.mentorResponsible')}</strong> {mentorName}</p>
                            )}
                            <p style={{ margin: '0' }}><strong>{t('pdf.generatedBy')}</strong> {t('pdf.generatedByValue')}</p>
                            <p style={{ margin: '5px 0 0 0' }}><strong>{t('pdf.date')}</strong> {new Date(metadata.generated_at).toLocaleString(locale)}</p>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: '5mm', left: '5mm', right: '5mm' }}>
                        <img src={bannerFooter} alt="Footer" style={{ width: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDFTemplate;
