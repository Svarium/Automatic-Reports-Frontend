import { useReport } from '../../context/ReportContext';
import { getSemaphoreLabel } from '../../utils/semaphoreLogic';
import './SemaphoreSelector.css';

const SemaphoreSelector = ({ routeName, currentColor }) => {
    const { setSemaphoreForRoute } = useReport();

    const colors = ['green', 'yellow', 'red'];

    const handleSelect = (color) => {
        setSemaphoreForRoute(routeName, color);
    };

    return (
        <div className="semaphore-selector">
            <span className="semaphore-label">Estado:</span>
            {colors.map(color => (
                <button
                    key={color}
                    className={`semaphore-button ${color} ${currentColor === color ? 'selected' : ''}`}
                    onClick={() => handleSelect(color)}
                    title={getSemaphoreLabel(color)}
                    aria-label={`Marcar como ${getSemaphoreLabel(color)}`}
                />
            ))}
        </div>
    );
};

export default SemaphoreSelector;
