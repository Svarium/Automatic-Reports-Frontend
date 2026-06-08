import { useReport } from '../../context/ReportContext';
import './ObservationsInput.css';

const ObservationsInput = ({ type, placeholder }) => {
    const {
        studentObservations,
        teacherObservations,
        updateStudentObservations,
        updateTeacherObservations,
        t,
    } = useReport();

    const value = type === 'students' ? studentObservations : teacherObservations;
    const updateFunction = type === 'students' ? updateStudentObservations : updateTeacherObservations;

    const label = type === 'students'
        ? t('observations.studentsLabel')
        : t('teachers.observationsLabel');

    const defaultPlaceholder = type === 'students'
        ? t('observations.studentsPlaceholder')
        : t('teachers.observationsPlaceholder');

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
                    {t('observations.characters', { count: value.length })}
                </span>
            </div>
        </div>
    );
};

export default ObservationsInput;
