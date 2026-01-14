/**
 * Calcula el semáforo general del colegio basado en los semáforos individuales
 * Lógica: por mayoría (el color con más ocurrencias gana)
 * @param {Object} semaphores - Objeto con semáforos por ruta { routeName: 'green'|'yellow'|'red' }
 * @returns {string} Color del semáforo general ('green', 'yellow', 'red')
 */
export const calculateGeneralSemaphore = (semaphores) => {
    const values = Object.values(semaphores);

    if (values.length === 0) {
        return 'green'; // Default si no hay semáforos
    }

    const counts = {
        green: values.filter(s => s === 'green').length,
        yellow: values.filter(s => s === 'yellow').length,
        red: values.filter(s => s === 'red').length,
    };

    // Retorna el color con mayor cantidad
    // En caso de empate, prioridad: green > yellow > red
    if (counts.green >= counts.yellow && counts.green >= counts.red) {
        return 'green';
    }
    if (counts.yellow >= counts.red) {
        return 'yellow';
    }
    return 'red';
};

/**
 * Obtiene el color CSS de un semáforo
 * @param {string} color - 'green', 'yellow', 'red'
 * @returns {string} Variable CSS del color
 */
export const getSemaphoreColor = (color) => {
    const colors = {
        green: 'var(--semaphore-green)',
        yellow: 'var(--semaphore-yellow)',
        red: 'var(--semaphore-red)',
    };
    return colors[color] || colors.green;
};

/**
 * Obtiene el texto en español del semáforo
 * @param {string} color - 'green', 'yellow', 'red'
 * @returns {string} Texto descriptivo
 */
export const getSemaphoreLabel = (color) => {
    const labels = {
        green: 'Bueno',
        yellow: 'Regular',
        red: 'Requiere atención',
    };
    return labels[color] || labels.green;
};
