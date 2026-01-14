const API_URL = 'http://127.0.0.1:8000';

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
      throw new Error(`Error del servidor: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al subir el reporte:', error);
    throw new Error('No se pudo conectar con el servidor. Verificá que el backend esté corriendo.');
  }
};
