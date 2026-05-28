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
2.  **Análisis Automático:** El sistema envía el archivo al backend (FastAPI), el cual procesa los datos basándose en rutas (separando Docentes PLD de Alumnos regulares) y devuelve un JSON con métricas estructuradas:
    - **Escuela:** Datos generales (total de alumnos, total de grupos).
    - **Alumnos:** Resúmenes y detalles calculados por grupo/ruta (vitalidad, progreso reciente, cursos obligatorios).
    - **Docentes (PLD):** Resúmenes y progreso de certificaciones individuales.
    - **Metadata:** Ventanas de tiempo utilizadas (ej. 15 y 30 días) y fecha de generación.
3.  **Visualización y Edición (Preview):** 
    - **Alternancia de Vistas de Alumnos:** Permite elegir entre formato **Cards** (visual) o **Tabla** (ejecutivo y compacto) según la preferencia.
    - **Reordenamiento Dinámico (Drag & Drop):** Posibilidad de reordenar las tarjetas o filas de grupos de alumnos.
    - **Toggles de Métricas:** Activar o desactivar métricas específicas (Tasa de obligatorios, Vitalidad, Progreso) para personalizar el reporte.
    - **Semáforos Individuales:** El mentor asigna un estado (Verde/Amarillo/Rojo/Gris) a cada grupo de alumnos.
    - **Feedback de Alerta:** Si un grupo está en **Amarillo** o **Rojo**, se despliega un selector de **píldoras interactivas** para marcar motivos predefinidos.
    - **Semáforo General:** El sistema calcula automáticamente el estado del colegio basado en los semáforos de los grupos.
    - **Métricas Docentes:** Seguimiento de capacitación y certificación, con posibilidad de alternar el estado manual de cada docente, indicar si dan clases o no, evaluar nivel de comunicación (Fluida, A reforzar, Con Dificultades, Nula), y omitir certificaciones abandonadas.
    - **Mentorías y Observaciones:** Registro de acompañamiento pedagógico (agendadas vs. concretadas) y espacios de texto libre para análisis cualitativo profundo.    
4.  **Generación de Reporte (Output):** Exportación a PDF que integra métricas, gráficos y feedback en un layout adaptativo.

---

## ✨ Características Principales

### 📈 Métricas de Alumnos
- **Vista Dual:** Switch instantáneo entre modo Tarjetas y modo Tabla.
- **KPIs Ajustables:** Visualización de **Cursos Obligatorios**, **Vitalidad Digital (15/30 días)** y **Progreso Reciente (15/30 días)** con soporte para ocultar métricas no deseadas.
- **Sistema de Justificación:** Píldoras interactivas para indicar por qué un grupo requiere atención, visibles solo en estados de alerta.
- **Reordenamiento:** Capacidad de arrastrar y soltar grupos de alumnos usando `@dnd-kit`.
- Gráficos comparativos de resumen general (Doughnut charts) usando Chart.js.

### 👩‍🏫 Capacitación Docente
- Seguimiento visual de progreso de certificación y certificaciones activas/abandonadas.
- **Interactividad Avanzada:** Posibilidad de corregir manualmente el estado de certificación, evaluar comunicación y gestionar el estado "Dando Clases".

### 📄 Exportación Profesional a PDF
- **Layout Adaptativo:** El documento final refleja la vista seleccionada (Cards o Tabla), optimizando el espacio disponible.
- **Paginación Inteligente:** Lógica avanzada de saltos de página que organiza las observaciones del mentor y las listas para evitar cortes de texto indeseados.
- **Banners Institucionales:** Encabezados y pies de página profesionales.

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/             # Recursos gráficos, logos y banners.
├── components/         # Componentes modulares de la UI.
│   ├── Charts/         # Gráficos circulares y de progreso (Chart.js).
│   ├── Common/         # Componentes reutilizables.
│   ├── FileUpload/     # Lógica de carga y envío de archivos.
│   ├── Loading/        # Componentes de estado de carga.
│   ├── MentoringInput/ # Inputs para mentorías agendadas/realizadas.
│   ├── ObservationsInput/# Cajas de texto para observaciones cualitativas.
│   ├── PDFExport/      # Plantilla y lógica de generación de PDF.
│   ├── SchoolHeader/   # Encabezado con estado general del colegio.
│   ├── SectionSelector/# Control para incluir/excluir secciones (Alumnos/Docentes).
│   ├── SemaphoreSelector/# Lógica y UI para los semáforos individuales.
│   ├── StudentMetrics/ # Detalle de grupos, KPIs, Drag & Drop y Feedback.
│   └── TeacherMetrics/ # Estado de capacitación, comunicación y certificaciones de docentes.
├── context/            # ReportContext.jsx: Estado global (Context API).
├── services/           # api.js: Comunicación con el backend (FastAPI).
├── utils/              # Lógica de semáforos, traducciones y constantes.
└── main.jsx / App.jsx  # Punto de entrada y estructura raíz.
```

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 19 + Vite 7.
- **Gráficos:** Chart.js 4 con `react-chartjs-2`.
- **Interacción Avanzada:** `@dnd-kit/core` y `@dnd-kit/sortable` para Drag & Drop interactivo.
- **Exportación:** `html2canvas` + `jsPDF`.
- **Notificaciones/Modales:** `sweetalert2`.
- **Estilos:** Vanilla CSS con variables globales para diseño premium.
- **State Management:** React Context API (`ReportContext.jsx`).

---

## 📥 Instalación y Setup

1.  **Instalar dependencias:** `npm install`
2.  **Configurar Backend:** Asegurar que el API (FastAPI) esté en `http://127.0.0.1:8000`.
3.  **Desarrollo:** `npm run dev`

---

Desarrollado para optimizar la gestión educativa y facilitar la toma de decisiones basada en datos.
