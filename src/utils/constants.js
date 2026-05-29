export const GROUP_FEEDBACK_OPTIONS = [
    'pending_corrections',
    'incomplete_classes',
    'user_incidents',
    'student_count_mismatch',
    'learning_pace_difficulties',
    'technical_difficulties',
    'low_certification_time',
    'teacher_turnover',
    'empty_course',
    'see_observations',
];

export const LEGACY_FEEDBACK_LABELS = {
    'Correcciones pendientes.': 'pending_corrections',
    'Clases incompletas.': 'incomplete_classes',
    'Incidencias con usuarios.': 'user_incidents',
    'Diferencia entre cantidad de alumnos en curso y en plataforma.': 'student_count_mismatch',
    'Dificultades en ritmo de aprendizaje.': 'learning_pace_difficulties',
    'Dificultades técnicas en colegio.': 'technical_difficulties',
    'Dificultades tÃ©cnicas en colegio.': 'technical_difficulties',
    'Poco tiempo dedicado a la certificación.': 'low_certification_time',
    'Poco tiempo dedicado a la certificaciÃ³n.': 'low_certification_time',
    'Rotación docente.': 'teacher_turnover',
    'RotaciÃ³n docente.': 'teacher_turnover',
    'Curso vacío.': 'empty_course',
    'Curso vacÃ­o.': 'empty_course',
    'Ver Observaciones del Mentor': 'see_observations',
};

export const COMMUNICATION_OPTIONS = [
    'fluid',
    'needs_reinforcement',
    'difficult',
    'none',
];

export const LEGACY_COMMUNICATION_LABELS = {
    Fluida: 'fluid',
    'A reforzar': 'needs_reinforcement',
    'Con Dificultades': 'difficult',
    'Sin comunicación': 'none',
    'Sin comunicaciÃ³n': 'none',
};

export const normalizeFeedbackKey = (value) => LEGACY_FEEDBACK_LABELS[value] || value;

export const normalizeCommunicationKey = (value) => LEGACY_COMMUNICATION_LABELS[value] || value || 'fluid';
