import { createContext, useContext, useState, useEffect } from 'react';
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

    /**
     * Sube un archivo y obtiene el análisis del backend
     */
    const uploadFile = async (file) => {
        setLoading(true);
        setError(null);

        try {
            const data = await uploadReportAPI(file);
            setReportData(data);

            // Inicializar semáforos en verde para todas las rutas de alumnos
            if (data.students && data.students.groups) {
                const initialSemaphores = {};
                data.students.groups.forEach(group => {
                    initialSemaphores[group.route_name] = 'gray';
                });
                setSemaphores(initialSemaphores);
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
     * Alterna el estado de certificación de un docente
     */
    const toggleTeacherCertification = (teacherName) => {
        setReportData(prevData => {
            if (!prevData || !prevData.teachers_pld) return prevData;

            const updatedTeachers = prevData.teachers_pld.teachers.map(t => {
                if (t.name === teacherName) {
                    const newCertified = !t.certified;
                    return { ...t, certified: newCertified };
                }
                return t;
            });

            // Recalcular el resumen de docentes
            const total = updatedTeachers.length;
            const certifiedCount = updatedTeachers.filter(t => t.certified).length;
            const rate = total > 0 ? (certifiedCount / total) * 100 : 0;

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
    };

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

        // Acciones
        uploadFile,
        setSemaphoreForRoute,
        updateStudentObservations,
        updateTeacherObservations,
        toggleTeacherCertification,
        setScheduledMentorings,
        setCompletedMentorings,
        resetReport,
    };

    return (
        <ReportContext.Provider value={value}>
            {children}
        </ReportContext.Provider>
    );
};
