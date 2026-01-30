import Swal from 'sweetalert2';
import { useReport } from '../../context/ReportContext';
import './TeacherMetrics.css';

const TeacherCard = ({ teacher }) => {
    const {
        teacherSettings,
        updateTeacherSettings,
        deleteTeacher,
        deletePld,
        togglePldCertification
    } = useReport();

    const settings = teacherSettings[teacher.name] || {
        teaching: true,
        communication: 'Fluida',
        deletedPlds: [],
        isDeleted: false
    };

    if (settings.isDeleted) return null;

    const handleToggleTeaching = () => {
        updateTeacherSettings(teacher.name, { teaching: !settings.teaching });
    };

    const handleCommChange = (status) => {
        updateTeacherSettings(teacher.name, { communication: status });
    };

    const handleDeleteTeacher = () => {
        Swal.fire({
            title: '¿Eliminar docente?',
            text: `¿Estás seguro de que querés eliminar a ${teacher.name} del reporte?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff8d7a',
            cancelButtonColor: '#cbd5e0',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            background: '#ffffff',
            color: '#2d3748'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTeacher(teacher.name);
            }
        });
    };

    const handleDeletePld = (pldName) => {
        Swal.fire({
            title: '¿Eliminar PLD?',
            text: `Se quitará "${pldName}" del reporte para este docente.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#ff8d7a',
            cancelButtonColor: '#cbd5e0',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Volver',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deletePld(teacher.name, pldName);
            }
        });
    };

    const activePlds = teacher.plds.filter(p => !settings.deletedPlds.includes(p.certification_name));

    return (
        <div className={`teacher-list-item ${!settings.teaching ? 'not-teaching' : ''}`}>
            <div className="teacher-item-header">
                <div className="teacher-main-info">
                    <h4 className="teacher-name-list">{teacher.name}</h4>
                    <span className={`teaching-badge ${settings.teaching ? 'active' : 'inactive'}`} onClick={handleToggleTeaching}>
                        {settings.teaching ? 'Da clases' : 'No da clases'}
                    </span>
                </div>
                <button className="delete-teacher-btn" onClick={handleDeleteTeacher} title="Eliminar docente">
                    🗑️
                </button>
            </div>

            <div className="teacher-plds-section">
                {activePlds.map((pld, idx) => (
                    <div key={idx} className="pld-row">
                        <div className="pld-info" onClick={() => togglePldCertification(teacher.name, pld.certification_name)}>
                            <span className="pld-name">{pld.certification_name}</span>
                            <div className="pld-progress-bar-container">
                                <div
                                    className="pld-progress-bar-fill"
                                    style={{
                                        width: `${pld.progress_percent}%`,
                                        backgroundColor: pld.certified ? '#00cc7e' : '#ff8d7a'
                                    }}
                                />
                            </div>
                            <span className="pld-percentage">{pld.progress_percent.toFixed(0)}%</span>
                            {pld.certified && <span className="pld-certified-check">✔</span>}
                        </div>
                        <button className="delete-pld-btn" onClick={() => handleDeletePld(pld.certification_name)} title="Eliminar PLD">
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className="teacher-controls-footer">
                <span className="footer-label">Comunicación:</span>
                <div className="comm-options">
                    {['Fluida', 'A reforzar', 'Con Dificultades', 'Sin comunicación'].map((status) => (
                        <button
                            key={status}
                            className={`comm-chip ${settings.communication === status ? 'selected' : ''}`}
                            data-status={status}
                            onClick={() => handleCommChange(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherCard;
