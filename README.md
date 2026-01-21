# 📊 Reporte Automático Educativo - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.standalone.cl/badges/vite.svg)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-white?style=for-the-badge)

Una aplicación web profesional diseñada para mentores educativos, que permite transformar datos crudos de plataformas de aprendizaje en reportes ejecutivos listos para presentar en formato PDF.

---

## 🚀 Propósito de la Aplicación

El objetivo principal es agilizar la comunicación entre los mentores y los directivos escolares. La app automatiza el análisis de métricas complejas y ofrece una interfaz amigable para que el mentor agregue su análisis subjetivo (observaciones y semáforos), generando un documento final coherente, estético y profesional.

---

## 🔄 Flujo de Información

1.  **Carga de Datos (Input):** El usuario sube un archivo CSV o Excel exportado de la plataforma educativa.
2.  **Análisis Automático:** El sistema envía el archivo al backend configurado, el cual procesa los datos y devuelve un JSON estructurado con métricas de alumnos y docentes.
3.  **Visualización y Edición (Preview):** 
    - Se muestran gráficos circulares de vitalidad y progreso.
    - El mentor asigna un **Semáforo** (Verde/Amarillo/Rojo) a cada grupo de alumnos.
    - El sistema calcula un **Semáforo General** del colegio basado en la mayoría.
    - El mentor registra las **Mentorías** agendadas y concretadas.
    - Se redactan **Observaciones** generales para alumnos y para capacitación docente.
4.  **Generación de Reporte (Output):** Se exporta un PDF profesional que integra todos los datos automáticos y manuales con un diseño optimizado para directivos.

---

## ✨ Características Principales

### 📈 Métricas de Alumnos
- Visualización de **Clases Completadas**, **Vitalidad Digital** y **Progreso Reciente**.
- Selector de semáforos individuales por ruta de aprendizaje.
- Gráficos comparativos de resumen.

### 👩‍🏫 Capacitación Docente
- Gráficos de barra y circulares para seguir el progreso de capacitación de los docentes.
- Visualización de estado de certificación.

### 🤝 Acompañamiento Pedagógico
- Registro de mentorías realizadas vs agendadas.
- Cálculo automático de la tasa de cumplimiento del acompañamiento.
- Controles intuitivos (+/-) para una carga rápida.

### 📄 Exportación Profesional a PDF
- Diseño profesional con banners institucionales.
- **Observaciones destacadas** en amarillo para captar la atención.
- **Sin cortes de contenido**: Lógica de saltos de página inteligente para evitar que tablas o gráficos se dividan.
- **Semáforos Visuales**: Inclusión de estados de color en el documento final.

### 🎨 Diseño y UX
- **Dark Mode**: Estética moderna y premium orientada a la concentración.
- **Tipografía Montserrat**: Fuente elegante y legible de Google Fonts.
- **Feedback Inmediato**: Validación de archivos y estados de carga animados.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 + Vite.
- **Gráficos:** Chart.js con `react-chartjs-2`.
- **Exportación:** `html2canvas` + `jsPDF`.
- **Estilos:** Vanilla CSS (CSS Modules approach) con variables globales.
- **State Management:** React Context API (ReportContext).
- **Backend:** Conexión vía API REST (Fetch).

---

## 📥 Instalación y Setup

1.  **Clonar el repositorio.**
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar el Backend:** Asegurarse de que el servidor de análisis (FastAPI/Python) esté corriendo en `http://127.0.0.1:8000`.
4.  **Iniciar en desarrollo:**
    ```bash
    npm run dev
    ```
5.  **Build para producción:**
    ```bash
    npm run build
    ```

---

## 📂 Estructura del Proyecto

- `src/components`: Componentes modulares (UI, Gráficos, Inputs).
- `src/context`: ReportContext para el manejo global de los datos del informe.
- `src/services`: Capa de comunicación con la API.
- `src/utils`: Lógica de semáforos y formateo de datos.
- `src/assets`: Recursos gráficos y banners del colegio.

---

Desarrollado con ❤️ para mejorar la gestión educativa.
