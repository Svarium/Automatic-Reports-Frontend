import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { uploadReport as uploadReportAPI } from '../services/api';
import { calculateGeneralSemaphore } from '../utils/semaphoreLogic';

const ReportContext = createContext();

export const useReport = () => {
    const context = useContext(ReportContext);
    if (!context) {
        throw new Error('useReport debe usarse dentro de un ReportProvider');
    }
    return context;
};

export const ReportProvider = ({ children }) => {
    // Estado principal
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estado manual del mentor
    const [semaphores, setSemaphores] = useState({});
    const [generalSemaphore, setGeneralSemaphore] = useState('gray');
    const [studentObservations, setStudentObservations] = useState('');
    const [teacherObservations, setTeacherObservations] = useState('');
    const [scheduledMentorings, setScheduledMentorings] = useState(0);
    const [completedMentorings, setCompletedMentorings] = useState(0);
    const [hasRedWarning, setHasRedWarning] = useState(false);
    const [groupFeedback, setGroupFeedback] = useState({}); // { routeName: [feedbacks] }
    const [mentorName, setMentorName] = useState(''); // Nuevo estado para nombre del mentor

    // Estado de configuración de docentes (eliminados, da clases, comunicación, PLDs eliminados)
    const [teacherSettings, setTeacherSettings] = useState({});

    // Filtros de sección (Alumnos / Docentes)
    const [includeStudents, setIncludeStudents] = useState(true);
    const [includeTeachers, setIncludeTeachers] = useState(true);
    // { [teacherName]: { teaching: bool, communication: string, deletedPlds: string[], isDeleted: bool } }

    // Recalcular semáforo general cuando cambian los individuales
    useEffect(() => {
        if (Object.keys(semaphores).length > 0) {
            const calculated = calculateGeneralSemaphore(semaphores);
            setGeneralSemaphore(calculated);

            // Verificar si hay algún grupo en rojo
            const hasRed = Object.values(semaphores).some(s => s === 'red');
            setHasRedWarning(hasRed);
        }
    }, [semaphores]);

    // Calcular métricas de docentes dinámicamente
    const teacherMetrics = useMemo(() => {
        if (!reportData || !reportData.teachers_pld) {
            return {
                totalTeachers: 0,
                totalActivePLDs: 0,
                finishedCertifications: 0,
                certificationRate: 0
            };
        }

        const visibleTeachers = reportData.teachers_pld.teachers.filter(
            t => !teacherSettings[t.name]?.isDeleted
        );

        let totalActivePLDs = 0;
        let finishedCertifications = 0;

        visibleTeachers.forEach(teacher => {
            const settings = teacherSettings[teacher.name] || {};
            const deletedPlds = settings.deletedPlds || [];

            teacher.plds.forEach(pld => {
                if (!deletedPlds.includes(pld.certification_name)) {
                    totalActivePLDs++;
                    if (pld.certified) {
                        finishedCertifications++;
                    }
                }
            });
        });

        const certificationRate = totalActivePLDs > 0
            ? (finishedCertifications / totalActivePLDs) * 100
            : 0;

        return {
            totalTeachers: visibleTeachers.length,
            totalActivePLDs,
            finishedCertifications,
            certificationRate
        };
    }, [reportData, teacherSettings]);

    /**
     * Sube un archivo y obtiene el análisis del backend
     */
    const uploadFile = async (file) => {
        setLoading(true);
        setError(null);

        try {
            const data = await uploadReportAPI(file);
            setReportData(data);

            const hasStudents = data.students && data.students.groups && data.students.groups.length > 0;
            const hasTeachers = data.teachers_pld && data.teachers_pld.teachers && data.teachers_pld.teachers.length > 0;

            if (!hasStudents && !hasTeachers) {
                throw new Error('El archivo no contiene información válida de alumnos ni de docentes.');
            }

            setIncludeStudents(hasStudents);
            setIncludeTeachers(hasTeachers);

            // Inicializar alumnos de forma independiente
            if (hasStudents) {
                const initialSemaphores = {};
                const initialFeedback = {};
                data.students.groups.forEach(group => {
                    initialSemaphores[group.route_name] = 'gray';
                    initialFeedback[group.route_name] = [];
                });
                setSemaphores(initialSemaphores);
                setGroupFeedback(initialFeedback);
            } else {
                setSemaphores({});
                setGroupFeedback({});
            }

            // Inicializar docentes de forma independiente
            if (hasTeachers) {
                const initialSettings = {};
                data.teachers_pld.teachers.forEach(t => {
                    initialSettings[t.name] = {
                        teaching: true,
                        communication: 'Fluida',
                        deletedPlds: [],
                        isDeleted: false
                    };
                });
                setTeacherSettings(initialSettings);
            } else {
                setTeacherSettings({});
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Actualiza el semáforo de una ruta específica
     */
    const setSemaphoreForRoute = (routeName, color) => {
        setSemaphores(prev => ({
            ...prev,
            [routeName]: color
        }));
    };

    /**
     * Actualiza el feedback de una ruta específica
     */
    const updateGroupFeedback = (routeName, feedbacks) => {
        setGroupFeedback(prev => ({
            ...prev,
            [routeName]: feedbacks
        }));
    };

    /**
     * Actualiza las observaciones de alumnos
     */
    const updateStudentObservations = (text) => {
        setStudentObservations(text);
    };

    /**
     * Actualiza las observaciones de docentes
     */
    const updateTeacherObservations = (text) => {
        setTeacherObservations(text);
    };

    /**
     * Actualiza la configuración de un docente (da clases, comunicación, plds borrados, etc)
     */
    const updateTeacherSettings = (teacherName, updates) => {
        setTeacherSettings(prev => {
            const current = prev[teacherName] || {
                teaching: true,
                communication: 'Fluida',
                deletedPlds: [],
                isDeleted: false
            };
            return {
                ...prev,
                [teacherName]: {
                    ...current,
                    ...updates
                }
            };
        });
    };

    /**
     * Marca un docente como eliminado para el reporte
     */
    const deleteTeacher = (teacherName) => {
        updateTeacherSettings(teacherName, { isDeleted: true });
    };

    /**
     * Marca un PLD de un docente como eliminado para el reporte
     */
    const deletePld = (teacherName, pldName) => {
        const currentDeleted = teacherSettings[teacherName]?.deletedPlds || [];
        if (!currentDeleted.includes(pldName)) {
            updateTeacherSettings(teacherName, {
                deletedPlds: [...currentDeleted, pldName]
            });
        }
    };

    /**
     * Alterna el estado de certificación de un docente para un PLD específico
     */
    const togglePldCertification = (teacherName, pldName) => {
        setReportData(prevData => {
            if (!prevData || !prevData.teachers_pld) return prevData;

            const updatedTeachers = prevData.teachers_pld.teachers.map(t => {
                if (t.name === teacherName) {
                    const updatedPlds = t.plds.map(p => {
                        if (p.certification_name === pldName) {
                            return { ...p, certified: !p.certified };
                        }
                        return p;
                    });
                    return { ...t, plds: updatedPlds };
                }
                return t;
            });

            // Recalcular el resumen de docentes basado en los plds certificados
            const totalTeachers = updatedTeachers.length;
            const anyCertified = (teacher) => teacher.plds.some(p => p.certified);
            const certifiedCount = updatedTeachers.filter(anyCertified).length;
            const rate = totalTeachers > 0 ? (certifiedCount / totalTeachers) * 100 : 0;

            return {
                ...prevData,
                teachers_pld: {
                    ...prevData.teachers_pld,
                    teachers: updatedTeachers,
                    summary: {
                        ...prevData.teachers_pld.summary,
                        certified_teachers: certifiedCount,
                        certification_rate_percent: rate
                    }
                }
            };
        });
    };

    /**
     * Resetea todo el estado
     */
    const resetReport = () => {
        setReportData(null);
        setLoading(false);
        setError(null);
        setSemaphores({});
        setGeneralSemaphore('gray');
        setStudentObservations('');
        setTeacherObservations('');
        setScheduledMentorings(0);
        setCompletedMentorings(0);
        setGroupFeedback({});
        setTeacherSettings({});
        setMentorName('');
        setIncludeStudents(true);
        setIncludeTeachers(true);
    };

    /**
     * Actualiza el nombre del colegio
     */
    const setSchoolName = (name) => {
        if (reportData && reportData.school) {
            setReportData(prev => ({
                ...prev,
                school: { ...prev.school, id: name }
            }));
        }
    };

    /**
     * Valida que toda la información necesaria para el reporte esté completa
     * @returns {Object} { valid: boolean, errors: string[] }
     */
    const validateReport = () => {
        const errors = [];

        // 1. Validar Alumnos (solo si está incluido)
        if (includeStudents && reportData?.students?.groups) {
            const groups = reportData.students.groups;
            const groupsWithoutSemaphore = groups.filter(g =>
                !semaphores[g.route_name] || semaphores[g.route_name] === 'gray'
            );

            if (groupsWithoutSemaphore.length > 0) {
                errors.push(`Faltan definir semáforos para ${groupsWithoutSemaphore.length} grupos.`);
            }

            groups.forEach(g => {
                const color = semaphores[g.route_name];
                if (color === 'yellow' || color === 'red') {
                    const feedbacks = groupFeedback[g.route_name] || [];
                    if (feedbacks.length === 0) {
                        errors.push(`El grupo "${g.route_name}" tiene alerta pero no tiene motivos seleccionados.`);
                    }
                }
            });

            if (!studentObservations || studentObservations.trim().length === 0) {
                errors.push('Las observaciones generales de alumnos son obligatorias.');
            }
        }

        // 2. Validar Docentes (solo si está incluido)
        if (includeTeachers && reportData?.teachers_pld) {
            if (!teacherObservations || teacherObservations.trim().length === 0) {
                errors.push('Las observaciones generales de docentes son obligatorias.');
            }
        }

        return {
            valid: errors.length === 0,
            errors
        };
    };

    // Agregar nuevos estados y función al value
    const value = {
        // Estado
        reportData,
        loading,
        error,
        semaphores,
        generalSemaphore,
        studentObservations,
        teacherObservations,
        scheduledMentorings,
        completedMentorings,
        hasRedWarning,
        groupFeedback,
        teacherSettings,
        teacherMetrics,
        mentorName,
        schoolName: reportData?.school?.id || '',
        includeStudents,
        includeTeachers,

        // Acciones
        uploadFile,
        setSemaphoreForRoute,
        updateStudentObservations,
        updateTeacherObservations,
        updateTeacherSettings,
        deleteTeacher,
        deletePld,
        togglePldCertification,
        setScheduledMentorings,
        setCompletedMentorings,
        updateGroupFeedback,
        resetReport,
        setMentorName,
        setSchoolName,
        validateReport,
        setIncludeStudents,
        setIncludeTeachers,
    };

    return (
        <ReportContext.Provider value={value}>
            {children}
        </ReportContext.Provider>
    );
};
