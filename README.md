# Reporte Automatico Educativo - Frontend

Frontend web para generar reportes ejecutivos educativos a partir de datos exportados desde plataformas de aprendizaje. La aplicacion permite cargar un archivo, revisar metricas de alumnos y docentes, completar observaciones del mentor, ajustar la configuracion del informe y exportar un PDF final.

## Stack

- React 19
- Vite 7
- Chart.js 4 + `react-chartjs-2`
- `@dnd-kit` para drag and drop
- `html2canvas` + `jsPDF` para exportacion
- `sweetalert2` para modales y confirmaciones
- CSS vanilla con variables globales
- React Context API para estado global

## Flujo principal

1. El usuario sube un archivo CSV o Excel.
2. El frontend envia el archivo al backend FastAPI en `http://127.0.0.1:8000/analyze-report`.
3. El backend devuelve un JSON con datos de escuela, alumnos, docentes PLD y metadata del reporte.
4. El mentor revisa, edita y completa informacion cualitativa.
5. La aplicacion valida los datos requeridos y genera un PDF con las secciones seleccionadas.

## Funcionalidades

### Carga y procesamiento

- Carga de archivos CSV o Excel.
- Estados de carga, error y reinicio del reporte.
- Validacion de que el archivo contenga datos validos de alumnos o docentes.

### Idiomas

- Selector de idioma del reporte.
- Idiomas disponibles: espanol, ingles y portugues.
- Traducciones centralizadas en `src/i18n/translations.js`.
- Banners localizados por idioma desde `src/i18n/assets.js`.
- El idioma elegido afecta la UI, los textos del PDF, fechas/locales y nombres del archivo exportado.

### Configuracion del reporte

- Inclusion o exclusion de secciones de alumnos y docentes.
- Soporte para reportes con solo alumnos, solo docentes o ambos.
- Nombre editable del colegio antes de exportar.
- Nombre del mentor responsable requerido para el PDF.

### Metricas de alumnos

- Resumen general con graficos tipo doughnut configurables de forma independiente.
- Vista de grupos en formato cards o tabla.
- Reordenamiento de grupos por drag and drop.
- Semaforo individual por grupo: verde, amarillo, rojo o gris.
- Calculo automatico del semaforo general del colegio.
- Feedback obligatorio para grupos en amarillo o rojo.
- Observaciones generales de alumnos.
- Configuracion de metricas visibles:
  - Tasa de cursos obligatorios en el resumen general.
  - Vitalidad digital en el resumen general.
  - Progreso reciente en el resumen general.
  - Detalle de cursos obligatorios por grupo.
  - Vitalidad digital con ventana de 15 o 30 dias.
  - Progreso reciente con ventana de 15 o 30 dias.
- Los tres indicadores generales de alumnos se muestran por defecto y pueden ocultarse uno por uno.

### Metricas de docentes PLD

- Resumen de docentes, certificaciones finalizadas y tasa de certificacion.
- Listado de docentes con configuracion manual.
- Edicion del estado de certificacion por PLD.
- Marcado de docentes que dan clases o no dan clases.
- Nivel de comunicacion por docente.
- Eliminacion de docentes o PLDs del reporte final.
- Mentorias agendadas y concretadas.
- Observaciones generales de docentes.

### Exportacion PDF

- Generacion de PDF desde una plantilla dedicada.
- Validaciones previas antes de permitir la descarga.
- Layout adaptado a la vista seleccionada de alumnos.
- El PDF respeta los indicadores generales de alumnos visibles en la UI.
- Si se ocultan los tres indicadores generales de alumnos, el PDF omite ese bloque y pasa directo al detalle por ruta.
- Encabezados y pies institucionales.
- Banners localizados por idioma.
- Nombre de archivo localizado.

## Estructura del proyecto

```text
src/
|-- App.jsx                         # Composicion principal de la app.
|-- App.css                         # Estilos de layout general.
|-- main.jsx                        # Punto de entrada React.
|-- index.css                       # Variables y estilos globales.
|-- assets/                         # Banners, imagenes y recursos estaticos.
|-- components/
|   |-- Charts/                     # Graficos reutilizables.
|   |-- Common/                     # BannerHeader y BannerFooter.
|   |-- FileUpload/                 # Carga de archivos y envio al backend.
|   |-- LanguageSelector/           # Selector de idioma del reporte.
|   |-- Loading/                    # Estado visual de carga.
|   |-- MentoringInput/             # Mentorias agendadas y concretadas.
|   |-- ObservationsInput/          # Observaciones cualitativas.
|   |-- PDFExport/                  # Boton, modal y plantilla de PDF.
|   |-- SchoolHeader/               # Datos del colegio y semaforo general.
|   |-- SectionSelector/            # Inclusion de secciones del reporte.
|   |-- SemaphoreSelector/          # Selector visual de estado.
|   |-- StudentMetrics/             # KPIs, grupos, tabla, cards y ordenamiento.
|   `-- TeacherMetrics/             # Docentes, PLDs, comunicacion y certificaciones.
|-- context/
|   `-- ReportContext.jsx           # Estado global, acciones y validaciones.
|-- i18n/
|   |-- assets.js                   # Mapeo de banners por idioma.
|   `-- translations.js             # Diccionarios y helpers de traduccion.
|-- services/
|   `-- api.js                      # Comunicacion con FastAPI.
`-- utils/
    |-- constants.js                # Constantes compartidas.
    `-- semaphoreLogic.js           # Logica de semaforos.
```

## Scripts disponibles

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Setup local

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Levantar el backend FastAPI en:

   ```text
   http://127.0.0.1:8000
   ```

3. Iniciar el frontend:

   ```bash
   npm run dev
   ```

4. Abrir la URL que informa Vite en la terminal.

## Backend esperado

El frontend consume:

```text
POST http://127.0.0.1:8000/analyze-report
```

El request se envia como `multipart/form-data` con el archivo en el campo `file`.

La respuesta esperada debe incluir, segun el caso:

- `school`
- `students.groups`
- `teachers_pld.teachers`
- `metadata`

La aplicacion puede operar si el reporte trae solo datos de alumnos o solo datos de docentes, siempre que exista al menos una seccion valida.

## Notas de mantenimiento

- Para agregar un idioma, actualizar `LANGUAGES`, el diccionario correspondiente y los banners en `src/i18n/`.
- Para modificar textos visibles o del PDF, editar `src/i18n/translations.js`.
- Para cambiar banners institucionales, reemplazar assets en `src/assets/` y revisar `src/i18n/assets.js`.
- Para ajustar reglas de validacion del reporte, revisar `validateReport` en `src/context/ReportContext.jsx`.
- Para modificar la exportacion, trabajar sobre `src/components/PDFExport/`.
