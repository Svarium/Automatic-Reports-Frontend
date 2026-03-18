const API_URL = 'https://automatic-report-backend.onrender.com';

/**
 * Sube un archivo de reporte al backend y obtiene el análisis
 * @param {File} file - Archivo CSV o Excel
 * @returns {Promise<Object>} JSON con el análisis del reporte
 */
export const uploadReport = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_URL}/analyze-report`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `Error del servidor: ${response.status}`;
      try {
        const errorData = await response.json();
        // Caso 1: Error detallado de FastAPI (HTTPException)
        if (errorData && typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        }
        // Caso 2: Error de validación de FastAPI (Pydantic)
        else if (errorData && Array.isArray(errorData.detail)) {
          errorMessage = `Error de validación: ${errorData.detail.map(d => d.msg).join(', ')}`;
        }
      } catch (e) {
        // No es JSON o no tiene el formato esperado, usamos el status code
      }
      const error = new Error(errorMessage);
      error.isBackendError = true; // Marca para identificar que el backend sí respondió
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error('Error al subir el reporte:', error);

    // Si es un error que lanzamos nosotros arriba (backend respondió con error)
    if (error.isBackendError) {
      throw error;
    }

    // Si llegó hasta aquí es un error de red o de código (fetch falló)
    throw new Error(`No se pudo conectar con el servidor: ${error.message}. Verificá que el backend esté corriendo.`);
  }
};
