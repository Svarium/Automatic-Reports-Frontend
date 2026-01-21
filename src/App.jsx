import { useReport } from './context/ReportContext';
import FileUpload from './components/FileUpload/FileUpload';
import Loading from './components/Loading/Loading';
import SchoolHeader from './components/SchoolHeader/SchoolHeader';
import StudentMetrics from './components/StudentMetrics/StudentMetrics';
import TeacherMetrics from './components/TeacherMetrics/TeacherMetrics';
import ObservationsInput from './components/ObservationsInput/ObservationsInput';
import MentoringInput from './components/MentoringInput/MentoringInput';
import PDFExport from './components/PDFExport/PDFExport';
import BannerHeader from './components/Common/BannerHeader';
import BannerFooter from './components/Common/BannerFooter';
import './App.css';

function App() {
  const { reportData, loading, error, resetReport } = useReport();

  // Estado de carga
  if (loading) {
    return <Loading />;
  }

  // Estado de error
  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Error al procesar el reporte</h2>
          <p className="error-message">{error}</p>
          <div className="error-actions">
            <button className="btn btn-primary" onClick={resetReport}>
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Estado inicial: sin reporte cargado
  if (!reportData) {
    return (
      <div className="app">
        <FileUpload />
      </div>
    );
  }

  // Estado principal: reporte cargado
  return (
    <div className="app">
      <div className="container">
        {/* Banner Header */}
        <BannerHeader />

        {/* Encabezado con info del colegio y semáforo general */}
        <SchoolHeader />

        {/* Métricas de alumnos */}
        <StudentMetrics />

        {/* Observaciones de alumnos */}
        <ObservationsInput type="students" />

        {/* Acompañamiento Pedagógico (Mentorías) */}
        <MentoringInput />

        <div className="divider"></div>

        {/* Métricas de docentes PLD */}
        <TeacherMetrics />

        {/* Observaciones de docentes */}
        <ObservationsInput type="teachers" />

        <div className="divider"></div>

        {/* Botón de exportación PDF */}
        <PDFExport />

        {/* Acciones adicionales */}
        <div className="report-actions">
          <button className="btn btn-secondary" onClick={resetReport}>
            📤 Subir otro reporte
          </button>
        </div>

        {/* Banner Footer */}
        <BannerFooter />
      </div>
    </div>
  );
}

export default App;
