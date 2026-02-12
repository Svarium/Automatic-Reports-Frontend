import { useReport } from '../../context/ReportContext';
import './SectionSelector.css';

const SectionSelector = () => {
    const {
        reportData,
        includeStudents,
        setIncludeStudents,
        includeTeachers,
        setIncludeTeachers
    } = useReport();

    if (!reportData) return null;

    const hasStudentsData = reportData.students?.groups?.length > 0;
    const hasTeachersData = reportData.teachers_pld?.teachers?.length > 0;

    return (
        <div className="section-selector-container">
            <h3 className="selector-title">Configuración del Reporte</h3>
            <p className="selector-subtitle">Seleccioná las secciones que deseás incluir en el informe final</p>

            <div className="selector-options">
                <div className={`selector-card ${!hasStudentsData ? 'disabled' : ''} ${includeStudents ? 'active' : ''}`}>
                    <label className="selector-label">
                        <input
                            type="checkbox"
                            checked={includeStudents}
                            disabled={!hasStudentsData}
                            onChange={(e) => setIncludeStudents(e.target.checked)}
                        />
                        <div className="selector-info">
                            <span className="section-name">📚 Alumnos</span>
                            {!hasStudentsData && <span className="no-data-hint">(Sin datos disponibles)</span>}
                        </div>
                    </label>
                </div>

                <div className={`selector-card ${!hasTeachersData ? 'disabled' : ''} ${includeTeachers ? 'active' : ''}`}>
                    <label className="selector-label">
                        <input
                            type="checkbox"
                            checked={includeTeachers}
                            disabled={!hasTeachersData}
                            onChange={(e) => setIncludeTeachers(e.target.checked)}
                        />
                        <div className="selector-info">
                            <span className="section-name">👩‍🏫 Docentes</span>
                            {!hasTeachersData && <span className="no-data-hint">(Sin datos disponibles)</span>}
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SectionSelector;
