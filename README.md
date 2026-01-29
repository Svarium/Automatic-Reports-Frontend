# 📊 Reporte Automático Educativo - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-white?style=for-the-badge)

Una aplicación web profesional diseñada para mentores educativos, que transforma datos crudos de plataformas de aprendizaje en reportes ejecutivos listos para presentar en formato PDF.

---

## 🚀 Propósito de la Aplicación

El objetivo principal es agilizar la comunicación entre los mentores y los directivos escolares. La app automatiza el análisis de métricas complejas y ofrece una interfaz amigable para que el mentor agregue su análisis subjetivo (observaciones, semáforos y motivos de alerta), generando un documento final coherente, estético y profesional.

---

## 🔄 Flujo de Información Detallado

1.  **Carga de Datos (Input):** El usuario sube un archivo CSV o Excel exportado de la plataforma educativa.
2.  **Análisis Automático:** El sistema envía el archivo al backend (FastAPI), el cual procesa los datos y devuelve un JSON con métricas de alumnos y docentes.
3.  **Visualización y Edición (Preview):** 
    - **Semáforos Individuales:** El mentor asigna un estado (Verde/Amarillo/Rojo) a cada grupo de alumnos.
    - **Feedback de Alerta:** Si un grupo está en **Amarillo** o **Rojo**, se despliega un selector de **píldoras interactivas** para marcar motivos predefinidos (incidencias, rotación docente, etc.).
    - **Semáforo General:** El sistema calcula el estado del colegio basado en los semáforos de los grupos.
    - **Métricas Docentes:** Seguimiento de capacitación y certificación, con posibilidad de alternar el estado manual de cada docente.
    - **Mentorías:** Registro de acompañamiento pedagógico (agendadas vs. concretadas).
    - **Observaciones:** Espacios de texto libre para análisis cualitativo profundo.
4.  **Generación de Reporte (Output):** Exportación a PDF que integra métricas, gráficos, semáforos y el feedback de grupos en un layout optimizado.

---

## ✨ Características Principales

### 📈 Métricas de Alumnos
- Visualización de **Clases Completadas**, **Vitalidad Digital** y **Progreso Reciente**.
- **Sistema de Justificación:** Píldoras interactivas para indicar por qué un grupo requiere atención, visibles solo en estados de alerta.
- Gráficos comparativos de resumen general.

### 👩‍🏫 Capacitación Docente
- Seguimiento visual de progreso de certificación.
- **Interactividad:** Posibilidad de corregir manualmente el estado de certificación de cada docente.

### 📄 Exportación Profesional a PDF
- **Layout Inteligente:** Los motivos de feedback de los grupos se organizan en **dos columnas** para optimizar el espacio.
- **Banners Institucionales:** Encabezados y pies de página profesionales.
- **Sin cortes de contenido:** Lógica de saltos de página para evitar divisiones de contenido críticas.

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/             # Recursos gráficos, logos y banners.
├── components/         # Componentes modulares de la UI.
│   ├── Charts/         # Gráficos circulares y de progreso (Chart.js).
│   ├── FileUpload/     # Lógica de carga y envío de archivos.
│   ├── PDFExport/      # Plantilla y lógica de generación de PDF.
│   ├── SchoolHeader/   # Encabezado con estado general del colegio.
│   ├── StudentMetrics/ # Detalle de grupos, KPIs y Feedback (píldoras).
│   ├── TeacherMetrics/ # Estado de capacitación y toggle de certificación.
│   └── ...             # Otros inputs (Observaciones, Mentorías).
├── context/            # ReportContext: Estado global (Context API).
├── services/           # api.js: Comunicación con el backend.
├── utils/              # Lógica de semáforos, constantes y helpers.
└── main.jsx / App.jsx  # Punto de entrada y estructura raíz.
```

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 + Vite.
- **Gráficos:** Chart.js con `react-chartjs-2`.
- **Exportación:** `html2canvas` + `jsPDF`.
- **Estilos:** Vanilla CSS con variables globales para diseño premium y Dark Mode.
- **State Management:** React Context API para persistencia en sesión.

---

## 📥 Instalación y Setup

1.  **Instalar dependencias:** `npm install`
2.  **Configurar Backend:** Asegurar que el API esté en `http://127.0.0.1:8000`.
3.  **Desarrollo:** `npm run dev`

---

Desarrollado para optimizar la gestión educativa y facilitar la toma de decisiones basada en datos.
