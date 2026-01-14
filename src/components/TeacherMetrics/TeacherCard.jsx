import './TeacherMetrics.css';

const TeacherCard = ({ teacher }) => {
    return (
        <div className="teacher-card">
            <div className="teacher-info">
                <div className="teacher-name">{teacher.name}</div>
                <div className="progress-bar-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${teacher.progress_percent}%` }}
                    />
                </div>
                <div className="teacher-progress-text">
                    {teacher.progress_percent.toFixed(1)}% completado
                </div>
            </div>
            {teacher.certified && (
                <div className="certified-badge">✓ Certificado</div>
            )}
        </div>
    );
};

export default TeacherCard;
