/**
 * Calcula el semáforo general del colegio basado en los semáforos individuales
 * Lógica: Promedio ponderado (Rojo: 2, Amarillo: 1.5, Verde: 1)
 * @param {Object} semaphores - Objeto con semáforos por ruta { routeName: 'green'|'yellow'|'red'|'gray' }
 * @returns {string} Color del semáforo general ('green', 'yellow', 'red', 'gray')
 */
export const calculateGeneralSemaphore = (semaphores) => {
    const values = Object.values(semaphores);

    if (values.length === 0) {
        return 'gray';
    }

    // Si todos están en gris, el estado es pendiente
    if (values.every(v => v === 'gray')) {
        return 'gray';
    }

    // Solo calculamos el promedio de los que ya tienen un color asignado
    const coloredValues = values.filter(v => v !== 'gray');

    const weights = {
        red: 2,
        yellow: 1.5,
        green: 1
    };

    const totalWeight = coloredValues.reduce((acc, curr) => acc + (weights[curr] || 1), 0);
    const average = totalWeight / coloredValues.length;

    // Umbrales ajustados para mayor precisión
    // Permite al menos 1 rojo entre 4 verdes sin pasar a amarillo de inmediato (Promedio 1.2)
    if (average >= 1.6) return 'red';
    if (average >= 1.3) return 'yellow';
    return 'green';
};

/**
 * Verifica si existe al menos un grupo en rojo
 * @param {Object} semaphores 
 * @returns {boolean}
 */
export const hasRedSemaphore = (semaphores) => {
    return Object.values(semaphores).some(s => s === 'red');
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
        gray: '#9e9e9e',
    };
    return colors[color] || colors.gray;
};

/**
 * Obtiene el texto en español del semáforo
 * @param {string} color - 'green', 'yellow', 'red'
 * @returns {string} Texto descriptivo
 */
export const getSemaphoreLabel = (color) => {
    const labels = {
        green: 'A tiempo',
        yellow: 'A fortalecer',
        red: 'Requiere atención',
        gray: 'Pendiente de análisis',
    };
    return labels[color] || labels.gray;
};
