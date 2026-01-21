import { useReport } from '../../context/ReportContext';
import './MentoringInput.css';

const MentoringInput = () => {
    const {
        scheduledMentorings,
        setScheduledMentorings,
        completedMentorings,
        setCompletedMentorings
    } = useReport();

    const handleIncrementScheduled = () => setScheduledMentorings(prev => prev + 1);
    const handleDecrementScheduled = () => setScheduledMentorings(prev => Math.max(0, prev - 1));

    const handleIncrementCompleted = () => setCompletedMentorings(prev => prev + 1);
    const handleDecrementCompleted = () => setCompletedMentorings(prev => Math.max(0, prev - 1));

    const total = scheduledMentorings;
    const ratio = total > 0 ? (completedMentorings / total) * 100 : 0;

    return (
        <div className="mentoring-container">
            <h3 className="mentoring-title">🤝 Acompañamiento Pedagógico</h3>

            <div className="mentoring-controls">
                {/* Mentorías Agendadas */}
                <div className="mentoring-item">
                    <span className="mentoring-label">Mentorías Agendadas</span>
                    <div className="counter-group">
                        <button
                            className="btn-counter btn-minus"
                            onClick={handleDecrementScheduled}
                            aria-label="Disminuir agendadas"
                        >
                            -
                        </button>
                        <span className="counter-value">{scheduledMentorings}</span>
                        <button
                            className="btn-counter btn-plus"
                            onClick={handleIncrementScheduled}
                            aria-label="Aumentar agendadas"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Mentorías Concretadas */}
                <div className="mentoring-item">
                    <span className="mentoring-label">Mentorías Concretadas</span>
                    <div className="counter-group">
                        <button
                            className="btn-counter btn-minus"
                            onClick={handleDecrementCompleted}
                            aria-label="Disminuir concretadas"
                        >
                            -
                        </button>
                        <span className="counter-value">{completedMentorings}</span>
                        <button
                            className="btn-counter btn-plus"
                            onClick={handleIncrementCompleted}
                            aria-label="Aumentar concretadas"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="mentoring-summary">
                <p className="mentoring-ratio">
                    Tasa de cumplimiento: <span className="ratio-value">{ratio.toFixed(0)}%</span>
                </p>
            </div>
        </div>
    );
};

export default MentoringInput;
