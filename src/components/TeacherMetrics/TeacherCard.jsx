import { useReport } from '../../context/ReportContext';
import './TeacherMetrics.css';

const TeacherCard = ({ teacher }) => {
    const { toggleTeacherCertification } = useReport();

    const ringColor = teacher.certified ? '#00cc7e' : '#ff8d7a';

    const handleToggle = () => {
        toggleTeacherCertification(teacher.name);
    };

    return (
        <div
            className={`teacher-card-circular ${teacher.certified ? 'is-certified' : 'not-certified'}`}
            onClick={handleToggle}
            style={{ cursor: 'pointer' }}
            title="Click para cambiar estado de certificación"
        >
            <div className="progress-circle-container">
                <svg width="140" height="140" className="progress-circle">
                    <circle
                        cx="70"
                        cy="70"
                        r="60"
                        fill="var(--white)"
                        stroke={ringColor}
                        strokeWidth="8"
                    />
                </svg>
                <div className="teacher-name-centered">
                    {teacher.name}
                </div>
            </div>
            {teacher.certified ? (
                <div className="certified-badge-mini" style={{ color: '#00cc7e', fontWeight: 'bold' }}>
                    Certificado ✔
                </div>
            ) : (
                <div className="certified-badge-mini" style={{ color: '#ff8d7a', fontWeight: 'bold' }}>
                    No certificado ✕
                </div>
            )}
        </div>
    );
};

export default TeacherCard;
