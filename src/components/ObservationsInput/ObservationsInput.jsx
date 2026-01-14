import { useReport } from '../../context/ReportContext';
import './ObservationsInput.css';

const ObservationsInput = ({ type, placeholder }) => {
    const {
        studentObservations,
        teacherObservations,
        updateStudentObservations,
        updateTeacherObservations
    } = useReport();

    const value = type === 'students' ? studentObservations : teacherObservations;
    const updateFunction = type === 'students' ? updateStudentObservations : updateTeacherObservations;

    const label = type === 'students'
        ? 'Observaciones Generales - Alumnos'
        : 'Observaciones Generales - Docentes PLD';

    const defaultPlaceholder = type === 'students'
        ? 'Agregá observaciones generales sobre el desempeño de los alumnos...'
        : 'Agregá observaciones generales sobre el desempeño de los docentes...';

    const handleChange = (e) => {
        updateFunction(e.target.value);
    };

    return (
        <div className="observations-input-container card">
            <label className="observations-label">
                {label}
            </label>
            <textarea
                className="observations-textarea"
                value={value}
                onChange={handleChange}
                placeholder={placeholder || defaultPlaceholder}
            />
            <div className="observations-footer">
                <span className="char-counter">
                    {value.length} caracteres
                </span>
            </div>
        </div>
    );
};

export default ObservationsInput;
