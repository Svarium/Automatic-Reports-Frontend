import { useReport } from '../../context/ReportContext';
import './MentoringInput.css';

const MentoringInput = () => {
    const {
        scheduledMentorings,
        setScheduledMentorings,
        completedMentorings,
        setCompletedMentorings,
        t,
    } = useReport();

    const handleIncrementScheduled = () => setScheduledMentorings(prev => prev + 1);
    const handleDecrementScheduled = () => setScheduledMentorings(prev => Math.max(0, prev - 1));

    const handleIncrementCompleted = () => setCompletedMentorings(prev => prev + 1);
    const handleDecrementCompleted = () => setCompletedMentorings(prev => Math.max(0, prev - 1));

    const total = scheduledMentorings;
    const ratio = total > 0 ? (completedMentorings / total) * 100 : 0;

    return (
        <div className="mentoring-container">
            <h3 className="mentoring-title">
                {t('mentoring.title')} <span className="mentoring-subtitle">{t('mentoring.subtitle')}</span>
            </h3>

            <div className="mentoring-controls">
                <div className="mentoring-item">
                    <span className="mentoring-label">{t('mentoring.scheduled')}</span>
                    <div className="counter-group">
                        <button
                            className="btn-counter btn-minus"
                            onClick={handleDecrementScheduled}
                            aria-label={t('mentoring.decrementScheduled')}
                        >
                            -
                        </button>
                        <span className="counter-value">{scheduledMentorings}</span>
                        <button
                            className="btn-counter btn-plus"
                            onClick={handleIncrementScheduled}
                            aria-label={t('mentoring.incrementScheduled')}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="mentoring-item">
                    <span className="mentoring-label">{t('mentoring.completed')}</span>
                    <div className="counter-group">
                        <button
                            className="btn-counter btn-minus"
                            onClick={handleDecrementCompleted}
                            aria-label={t('mentoring.decrementCompleted')}
                        >
                            -
                        </button>
                        <span className="counter-value">{completedMentorings}</span>
                        <button
                            className="btn-counter btn-plus"
                            onClick={handleIncrementCompleted}
                            aria-label={t('mentoring.incrementCompleted')}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="mentoring-summary">
                <p className="mentoring-ratio">
                    {t('mentoring.participationRate')} <span className="ratio-value">{ratio.toFixed(0)}%</span>
                </p>
            </div>
        </div>
    );
};

export default MentoringInput;
