import './TeacherMetrics.css';

const TeacherCard = ({ teacher }) => {
    const progress = teacher.progress_percent;
    const radius = 60;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="teacher-card-circular">
            <div className="progress-circle-container">
                <svg width="140" height="140" className="progress-circle">
                    {/* Background circle */}
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="var(--white)"
                        stroke="#333"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress circle */}
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="none"
                        stroke={teacher.certified ? 'var(--semaphore-green)' : 'var(--chart-blue)'}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform="rotate(-90 70 70)"
                    />
                </svg>
                <div className="teacher-name-centered">
                    {teacher.name}
                </div>
            </div>
            {teacher.certified && (
                <div className="certified-badge-mini">✓</div>
            )}
            <div className="teacher-progress-percentage">
                {progress.toFixed(0)}%
            </div>
        </div>
    );
};

export default TeacherCard;
