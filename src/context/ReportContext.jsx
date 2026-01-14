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
    const [generalSemaphore, setGeneralSemaphore] = useState('green');
    const [studentObservations, setStudentObservations] = useState('');
    const [teacherObservations, setTeacherObservations] = useState('');

    // Recalcular semáforo general cuando cambian los individuales
    useEffect(() => {
        if (Object.keys(semaphores).length > 0) {
            const calculated = calculateGeneralSemaphore(semaphores);
            setGeneralSemaphore(calculated);
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
                    initialSemaphores[group.route_name] = 'green';
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
     * Resetea todo el estado
     */
    const resetReport = () => {
        setReportData(null);
        setLoading(false);
        setError(null);
        setSemaphores({});
        setGeneralSemaphore('green');
        setStudentObservations('');
        setTeacherObservations('');
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

        // Acciones
        uploadFile,
        setSemaphoreForRoute,
        updateStudentObservations,
        updateTeacherObservations,
        resetReport,
    };

    return (
        <ReportContext.Provider value={value}>
            {children}
        </ReportContext.Provider>
    );
};
