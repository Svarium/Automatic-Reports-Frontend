import { useReport } from '../../context/ReportContext';
import './SemaphoreSelector.css';

const SemaphoreSelector = ({ routeName, currentColor }) => {
    const { setSemaphoreForRoute, t } = useReport();

    const colors = ['green', 'yellow', 'red'];

    const handleSelect = (color) => {
        setSemaphoreForRoute(routeName, color);
    };

    return (
        <div className="semaphore-selector">
            <span className="semaphore-label">{t('semaphores.label')}</span>
            {colors.map(color => (
                <button
                    key={color}
                    className={`semaphore-button ${color} ${currentColor === color ? 'selected' : ''}`}
                    onClick={() => handleSelect(color)}
                    title={t(`semaphores.${color}`)}
                    aria-label={t('semaphores.markAs', { label: t(`semaphores.${color}`) })}
                />
            ))}
        </div>
    );
};

export default SemaphoreSelector;
