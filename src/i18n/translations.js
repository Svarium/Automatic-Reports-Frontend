export const LANGUAGES = [
    { code: 'es', locale: 'es-AR', label: 'Español' },
    { code: 'en', locale: 'en-US', label: 'English' },
    { code: 'pt', locale: 'pt-BR', label: 'Português' },
];

const dictionaries = {
    es: {
        common: { days: 'días' },
        language: { label: 'Idioma del reporte' },
        fileUpload: {
            title: 'Te damos la bienvenida',
            subtitle: 'Subí el archivo para automatizar tus reportes.',
            dragText: 'Arrastrá tu archivo o hacé click',
            formats: 'Formatos: CSV, Excel (.csv, .xlsx, .xls)',
            processing: 'Procesando...',
            selectFile: 'Seleccionar Archivo',
            errorExt: 'Por favor, seleccioná un archivo CSV o Excel (.csv, .xlsx, .xls)',
            tutorialBtn: 'ℹ️ ¿Cómo funciona? - Guía paso a paso',
            tutorialTitle: '<strong>Guía rápida de uso 🚀</strong>',
            tutorialBtnOk: '¡Entendido!',
            tutorialHtml: `
                <div style="text-align: left; font-size: 0.95em; line-height: 1.6; color: #444;">
                    <p>Esta herramienta automatiza la creación de reportes ejecutivos a partir de los datos crudos.</p>
                    
                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">1. Carga de Datos 📂</h4>
                    <p style="margin: 0;">Subí tu archivo <strong>.csv</strong> o <strong>.xlsx</strong>. El sistema procesará las métricas automáticamente y detectará si hay información de alumnos, docentes o ambos.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">2. Configuración Dinámica ⚙️</h4>
                    <p style="margin: 0;">Elegí incluir o excluir las secciones de <strong>Alumnos</strong> o <strong>Docentes</strong> del reporte general.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">3. Gestión de Alumnos y Semáforos 🚦</h4>
                    <p style="margin: 0;">Revisá los grupos en vista de <strong>Cards</strong> o <strong>Tabla</strong>, ordenalos arrastrándolos, y asignales un estado. Si elegís estado <span style="color: #ffd148; font-weight: bold;">Amarillo</span> o <span style="color: #ff8d7a; font-weight: bold;">Rojo</span>, es obligatorio seleccionar los motivos (feedback).</p>
                    <p style="margin: 5px 0 0 0;">Además, podés seleccionar si querés mostrar u ocultar la información de <strong>Cursos Obligatorios</strong>, y podés cambiar las ventanas de tiempo de <strong>Vitalidad Digital</strong> y <strong>Progreso Reciente</strong> entre 15 o 30 días según lo necesites.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">4. Gestión de Docentes PLD 👩‍🏫</h4>
                    <p style="margin: 0;">Editá el estado de certificación manualmente, indicá su nivel de comunicación y registrá mentorías. Podés excluir docentes o certificaciones específicas del reporte final.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">5. Observaciones y Exportación 📄</h4>
                    <p style="margin: 0;">Completá las observaciones de cada área para dar contexto. Al generar el PDF, este respetará exactamente la configuración visible en pantalla y el idioma seleccionado de forma profesional.</p>
                </div>
            `
        },
        app: {
            retry: 'Intentar nuevamente',
            uploadAnother: '📤 Subir otro reporte',
            processingErrorTitle: 'Error al procesar el reporte',
        },
        school: {
            totalStudents: 'Total de alumnos en Playground',
            groups: 'Grupos',
            totalGroups: 'Total de Grupos',
            generalStatusTitle: 'Estado General del Colegio',
            generalStatus: 'Estado General',
            redWarning: '⚠️ Hay al menos un grupo que requiere atención inmediata.',
            redWarningPdf: '⚠️ Hay grupos que requieren atención inmediata',
        },
        sectionSelector: {
            title: 'Configuración del Reporte',
            subtitle: 'Seleccioná las secciones que deseás incluir en el informe final',
            students: '📚 Alumnos',
            teachers: '👩‍🏫 Docentes',
            noData: '(Sin datos disponibles)',
        },
        students: {
            title: '📚 Métricas de Alumnos',
            summary: 'Resumen General',
            showMandatoryRate: 'Mostrar Tasa de Cursos Obligatorios',
            showVitalityMetric: 'Mostrar Vitalidad Digital',
            showProgressMetric: 'Mostrar Progreso Reciente',
            mandatoryRateTitle: 'Tasa de alumnos certificados en cursos obligatorios',
            mandatoryRateDescription: 'Porcentaje de estudiantes que completaron la totalidad de los cursos obligatorios.',
            certified: 'Certificables',
            inProgress: 'En proceso',
            vitalityTitle: 'Vitalidad Digital',
            vitalityDescription: 'Ingresos a la plataforma durante los últimos {days} días.',
            active: 'Activos',
            inactive: 'Inactivos',
            recentProgressTitle: 'Progreso Reciente',
            recentProgressDescription: 'Avance en actividades y lecciones en los últimos {days} días.',
            withProgress: 'Con progreso',
            withoutProgress: 'Sin progreso',
            groupsByRoute: 'Grupos por Ruta',
            includeMandatoryDetail: 'Incluir detalle de cursos obligatorios',
            cards: '🎴 Cards',
            table: '📊 Tabla',
            groupRoute: 'Grupo / Ruta',
            state: 'Estado',
            completedClasses: 'Clases Completadas',
            courseProgress: 'Progreso en Cursos',
            mandatory: 'Obligatorios',
            totalCourses: 'Total de cursos',
            totalCoursesNote: '* El total de cursos incluye obligatorios + complementarios',
            studentsCount: '{count} alumnos',
            studentCount: '{count} alumno',
            feedback: 'Feedback del estado:',
            feedbackPdf: 'Feedback',
            changeDays: 'Cambiar a {days} días',
            dragToSort: 'Arrastrar para ordenar',
            detailByRoute: 'Detalle de Alumnos por Ruta',
            part: 'Parte {number}',
            observationsTitle: 'Observaciones del Mentor - Alumnos',
        },
        teachers: {
            title: '👩‍🏫 Métricas de capacitación Docente',
            totalTeachers: 'Total Docentes',
            finishedCertifications: 'Certificaciones finalizadas',
            certificationRate: 'Tasa de Certificación',
            certificationStatus: 'Estado de Certificaciones',
            finished: 'Finalizadas',
            pending: 'Pendientes',
            listTitle: 'Listado de Docentes',
            teaching: 'Da clases',
            notTeaching: 'No da clases',
            communication: 'Comunicación:',
            deleteTeacherTitle: '¿Eliminar docente?',
            deleteTeacherText: '¿Estás seguro de que querés eliminar a {name} del reporte?',
            deleteTeacherConfirm: 'Sí, eliminar',
            deleteTeacherCancel: 'Cancelar',
            deleteTeacherButton: 'Eliminar docente',
            deletePldTitle: '¿Eliminar PLD?',
            deletePldText: 'Se quitará "{name}" del reporte para este docente.',
            deletePldConfirm: 'Eliminar',
            deletePldCancel: 'Volver',
            deletePldButton: 'Eliminar PLD',
            observationsTitle: 'Observaciones del Mentor - Docentes',
            observationsLabel: 'Observaciones Generales - Docentes PLD',
            observationsPlaceholder: 'Agregá observaciones generales sobre el desempeño de los docentes...',
        },
        mentoring: {
            title: '🤝 Acompañamiento Pedagógico Sincrónico',
            subtitle: '(Desde el inicio del presente ciclo lectivo 📅)',
            scheduled: 'Mentorías Agendadas',
            completed: 'Mentorías Concretadas',
            scheduledShort: 'Agendadas',
            completedShort: 'Concretadas',
            participation: 'Participación',
            participationRate: 'Tasa de participación:',
            noMeetings: 'No se registran encuentros sincrónicos de acompañamiento pedagógico realizados 📆',
            decrementScheduled: 'Disminuir agendadas',
            incrementScheduled: 'Aumentar agendadas',
            decrementCompleted: 'Disminuir concretadas',
            incrementCompleted: 'Aumentar concretadas',
        },
        observations: {
            studentsLabel: 'Observaciones Generales - Alumnos',
            studentsPlaceholder: 'Agregá observaciones generales sobre el desempeño de los alumnos...',
            characters: '{count} caracteres',
        },
        pdf: {
            generate: '📄 Generar Informe PDF',
            processing: '📄 Procesando...',
            successTitle: '¡Reporte Generado!',
            successText: 'El PDF se ha descargado correctamente.',
            errorTitle: 'Error',
            errorText: 'Hubo un error al generar el PDF. Por favor, intentá nuevamente.',
            missingTitle: 'Faltan completar datos',
            modalTitle: 'Preparando Reporte',
            schoolName: 'Nombre del Colegio',
            mentor: 'Mentor responsable',
            mentorPlaceholder: 'Nombre y Apellido',
            mentorHint: 'Este nombre aparecerá en el pie de página del reporte.',
            download: 'Descargar PDF',
            cancel: 'Cancelar',
            schoolRequired: 'El nombre del colegio es obligatorio',
            mentorRequired: 'Debes ingresar el nombre del mentor',
            mentorResponsible: 'Mentor Responsable:',
            generatedBy: 'Generado por:',
            generatedByValue: 'Reporte Automático Playground',
            date: 'Fecha:',
            filePrefix: 'Reporte',
        },
        validation: {
            missingSemaphores: 'Faltan definir semáforos para {count} grupos.',
            alertWithoutFeedback: 'El grupo "{name}" tiene alerta pero no tiene motivos seleccionados.',
            studentObservationsRequired: 'Las observaciones generales de alumnos son obligatorias.',
            teacherObservationsRequired: 'Las observaciones generales de docentes son obligatorias.',
            invalidFileData: 'El archivo no contiene información válida de alumnos ni de docentes.',
        },
        semaphores: {
            label: 'Estado:',
            markAs: 'Marcar como {label}',
            green: 'A tiempo',
            yellow: 'A fortalecer',
            red: 'Requiere atención',
            gray: 'Pendiente de análisis',
        },
        feedback: {
            pending_corrections: 'Correcciones pendientes.',
            incomplete_classes: 'Clases incompletas.',
            user_incidents: 'Incidencias con usuarios.',
            student_count_mismatch: 'Diferencia entre cantidad de alumnos en curso y en plataforma.',
            learning_pace_difficulties: 'Dificultades en ritmo de aprendizaje.',
            technical_difficulties: 'Dificultades técnicas en colegio.',
            low_certification_time: 'Poco tiempo dedicado a la certificación.',
            teacher_turnover: 'Rotación docente.',
            empty_course: 'Curso vacío.',
            see_observations: 'Ver Observaciones del Mentor',
        },
        communication: {
            fluid: 'Fluida',
            needs_reinforcement: 'A reforzar',
            difficult: 'Con Dificultades',
            none: 'Sin comunicación',
        },
        courses: {
            percentOfCourses: '{percent}% de {total} cursos',
            ofTotal: 'de {total}',
        },
    },
    en: {
        common: { days: 'days' },
        language: { label: 'Report language' },
        fileUpload: {
            title: 'Welcome',
            subtitle: 'Upload the file to automate your reports.',
            dragText: 'Drag your file here or click',
            formats: 'Formats: CSV, Excel (.csv, .xlsx, .xls)',
            processing: 'Processing...',
            selectFile: 'Select File',
            errorExt: 'Please select a CSV or Excel file (.csv, .xlsx, .xls)',
            tutorialBtn: 'ℹ️ How it works? - Step by step guide',
            tutorialTitle: '<strong>Quick Guide 🚀</strong>',
            tutorialBtnOk: 'Got it!',
            tutorialHtml: `
                <div style="text-align: left; font-size: 0.95em; line-height: 1.6; color: #444;">
                    <p>This tool automates the creation of executive reports from raw data.</p>
                    
                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">1. Data Upload 📂</h4>
                    <p style="margin: 0;">Upload your <strong>.csv</strong> or <strong>.xlsx</strong> file. The system will automatically process the metrics and detect if there is student, teacher, or both information.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">2. Dynamic Configuration ⚙️</h4>
                    <p style="margin: 0;">Choose to include or exclude the <strong>Students</strong> or <strong>Teachers</strong> sections from the general report.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">3. Students Management & Semaphores 🚦</h4>
                    <p style="margin: 0;">Review the groups in <strong>Cards</strong> or <strong>Table</strong> view, order them by dragging, and assign them a status. If you choose <span style="color: #ffd148; font-weight: bold;">Yellow</span> or <span style="color: #ff8d7a; font-weight: bold;">Red</span> status, selecting reasons (feedback) is mandatory.</p>
                    <p style="margin: 5px 0 0 0;">Additionally, you can choose whether to show or hide the <strong>Mandatory Courses</strong> information, and you can switch the time windows for <strong>Digital Vitality</strong> and <strong>Recent Progress</strong> between 15 or 30 days as needed.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">4. PLD Teachers Management 👩‍🏫</h4>
                    <p style="margin: 0;">Edit the certification status manually, indicate their communication level, and register mentorings. You can exclude specific teachers or certifications from the final report.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">5. Observations and Export 📄</h4>
                    <p style="margin: 0;">Complete the observations for each area to provide context. When generating the PDF, it will accurately respect the configuration visible on screen and the selected language in a professional format.</p>
                </div>
            `
        },
        app: {
            retry: 'Try again',
            uploadAnother: '📤 Upload another report',
            processingErrorTitle: 'Error processing report',
        },
        school: {
            totalStudents: 'Total students in Playground',
            groups: 'Groups',
            totalGroups: 'Total Groups',
            generalStatusTitle: 'Overall School Status',
            generalStatus: 'Overall Status',
            redWarning: '⚠️ At least one group requires immediate attention.',
            redWarningPdf: '⚠️ Some groups require immediate attention',
        },
        sectionSelector: {
            title: 'Report Configuration',
            subtitle: 'Select the sections you want to include in the final report',
            students: '📚 Students',
            teachers: '👩‍🏫 Teachers',
            noData: '(No data available)',
        },
        students: {
            title: '📚 Student Metrics',
            summary: 'General Summary',
            showMandatoryRate: 'Show Mandatory Courses Rate',
            showVitalityMetric: 'Show Digital Vitality',
            showProgressMetric: 'Show Recent Progress',
            mandatoryRateTitle: 'Students certified in mandatory courses rate',
            mandatoryRateDescription: 'Percentage of students who completed all mandatory courses.',
            certified: 'Certified',
            inProgress: 'In progress',
            vitalityTitle: 'Digital Vitality',
            vitalityDescription: 'Platform logins during the last {days} days.',
            active: 'Active',
            inactive: 'Inactive',
            recentProgressTitle: 'Recent Progress',
            recentProgressDescription: 'Progress in activities and lessons during the last {days} days.',
            withProgress: 'With progress',
            withoutProgress: 'No progress',
            groupsByRoute: 'Groups by Route',
            includeMandatoryDetail: 'Include mandatory course detail',
            cards: '🎴 Cards',
            table: '📊 Table',
            groupRoute: 'Group / Route',
            state: 'Status',
            completedClasses: 'Completed Classes',
            courseProgress: 'Course Progress',
            mandatory: 'Mandatory',
            totalCourses: 'Total courses',
            totalCoursesNote: '* Total courses include mandatory + complementary courses',
            studentsCount: '{count} students',
            studentCount: '{count} student',
            feedback: 'Status feedback:',
            feedbackPdf: 'Feedback',
            changeDays: 'Switch to {days} days',
            dragToSort: 'Drag to sort',
            detailByRoute: 'Student Detail by Route',
            part: 'Part {number}',
            observationsTitle: 'Mentor Observations - Students',
        },
        teachers: {
            title: '👩‍🏫 Teacher Training Metrics',
            totalTeachers: 'Total Teachers',
            finishedCertifications: 'Completed certifications',
            certificationRate: 'Certification Rate',
            certificationStatus: 'Certification Status',
            finished: 'Completed',
            pending: 'Pending',
            listTitle: 'Teacher List',
            teaching: 'Teaching',
            notTeaching: 'Not teaching',
            communication: 'Communication:',
            deleteTeacherTitle: 'Remove teacher?',
            deleteTeacherText: 'Are you sure you want to remove {name} from the report?',
            deleteTeacherConfirm: 'Yes, remove',
            deleteTeacherCancel: 'Cancel',
            deleteTeacherButton: 'Remove teacher',
            deletePldTitle: 'Remove PLD?',
            deletePldText: '"{name}" will be removed from the report for this teacher.',
            deletePldConfirm: 'Remove',
            deletePldCancel: 'Back',
            deletePldButton: 'Remove PLD',
            observationsTitle: 'Mentor Observations - Teachers',
            observationsLabel: 'General Observations - PLD Teachers',
            observationsPlaceholder: 'Add general observations about teacher performance...',
        },
        mentoring: {
            title: '🤝 Synchronous Pedagogical Support',
            subtitle: '(Since the start of the current school year 📅)',
            scheduled: 'Scheduled Mentorings',
            completed: 'Completed Mentorings',
            scheduledShort: 'Scheduled',
            completedShort: 'Completed',
            participation: 'Participation',
            participationRate: 'Participation rate:',
            noMeetings: 'No synchronous pedagogical support meetings were recorded 📆',
            decrementScheduled: 'Decrease scheduled',
            incrementScheduled: 'Increase scheduled',
            decrementCompleted: 'Decrease completed',
            incrementCompleted: 'Increase completed',
        },
        observations: {
            studentsLabel: 'General Observations - Students',
            studentsPlaceholder: 'Add general observations about student performance...',
            characters: '{count} characters',
        },
        pdf: {
            generate: '📄 Generate PDF Report',
            processing: '📄 Processing...',
            successTitle: 'Report Generated!',
            successText: 'The PDF was downloaded successfully.',
            errorTitle: 'Error',
            errorText: 'There was an error generating the PDF. Please try again.',
            missingTitle: 'Missing required information',
            modalTitle: 'Preparing Report',
            schoolName: 'School Name',
            mentor: 'Responsible mentor',
            mentorPlaceholder: 'First and last name',
            mentorHint: 'This name will appear in the report footer.',
            download: 'Download PDF',
            cancel: 'Cancel',
            schoolRequired: 'School name is required',
            mentorRequired: 'You must enter the mentor name',
            mentorResponsible: 'Responsible Mentor:',
            generatedBy: 'Generated by:',
            generatedByValue: 'Playground Automatic Report',
            date: 'Date:',
            filePrefix: 'Report',
        },
        validation: {
            missingSemaphores: 'Semaphores are missing for {count} groups.',
            alertWithoutFeedback: 'The group "{name}" has an alert but no reasons selected.',
            studentObservationsRequired: 'General student observations are required.',
            teacherObservationsRequired: 'General teacher observations are required.',
            invalidFileData: 'The file does not contain valid student or teacher information.',
        },
        semaphores: {
            label: 'Status:',
            markAs: 'Mark as {label}',
            green: 'On track',
            yellow: 'Needs reinforcement',
            red: 'Requires attention',
            gray: 'Pending analysis',
        },
        feedback: {
            pending_corrections: 'Pending corrections.',
            incomplete_classes: 'Incomplete classes.',
            user_incidents: 'User incidents.',
            student_count_mismatch: 'Mismatch between students in course and platform.',
            learning_pace_difficulties: 'Learning pace difficulties.',
            technical_difficulties: 'Technical difficulties at school.',
            low_certification_time: 'Limited time dedicated to certification.',
            teacher_turnover: 'Teacher turnover.',
            empty_course: 'Empty course.',
            see_observations: 'See Mentor Observations',
        },
        communication: {
            fluid: 'Fluid',
            needs_reinforcement: 'Needs reinforcement',
            difficult: 'Difficulties',
            none: 'No communication',
        },
        courses: {
            percentOfCourses: '{percent}% of {total} courses',
            ofTotal: 'of {total}',
        },
    },
    pt: {
        common: { days: 'dias' },
        language: { label: 'Idioma do relatório' },
        fileUpload: {
            title: 'Bem-vindo',
            subtitle: 'Faça o upload do arquivo para automatizar seus relatórios.',
            dragText: 'Arraste seu arquivo ou clique',
            formats: 'Formatos: CSV, Excel (.csv, .xlsx, .xls)',
            processing: 'Processando...',
            selectFile: 'Selecionar Arquivo',
            errorExt: 'Por favor, selecione um arquivo CSV ou Excel (.csv, .xlsx, .xls)',
            tutorialBtn: 'ℹ️ Como funciona? - Guia passo a passo',
            tutorialTitle: '<strong>Guia Rápido 🚀</strong>',
            tutorialBtnOk: 'Entendi!',
            tutorialHtml: `
                <div style="text-align: left; font-size: 0.95em; line-height: 1.6; color: #444;">
                    <p>Esta ferramenta automatiza a criação de relatórios executivos a partir de dados brutos.</p>
                    
                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">1. Carregamento de Dados 📂</h4>
                    <p style="margin: 0;">Faça upload do seu arquivo <strong>.csv</strong> ou <strong>.xlsx</strong>. O sistema processará as métricas automaticamente e detectará se há informações de alunos, professores ou ambos.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">2. Configuração Dinâmica ⚙️</h4>
                    <p style="margin: 0;">Escolha incluir ou excluir as seções de <strong>Alunos</strong> ou <strong>Professores</strong> do relatório geral.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">3. Gestão de Alunos e Semáforos 🚦</h4>
                    <p style="margin: 0;">Revise os grupos na exibição de <strong>Cards</strong> ou <strong>Tabela</strong>, ordene-os arrastando e atribua um status. Se escolher o status <span style="color: #ffd148; font-weight: bold;">Amarelo</span> ou <span style="color: #ff8d7a; font-weight: bold;">Vermelho</span>, selecionar os motivos (feedback) é obrigatório.</p>
                    <p style="margin: 5px 0 0 0;">Além disso, você pode selecionar se deseja mostrar ou ocultar as informações de <strong>Cursos Obrigatórios</strong> e pode alterar as janelas de tempo de <strong>Vitalidade Digital</strong> e <strong>Progresso Recente</strong> entre 15 ou 30 dias conforme sua necessidade.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">4. Gestão de Professores PLD 👩‍🏫</h4>
                    <p style="margin: 0;">Edite o status de certificação manualmente, indique seu nível de comunicação e registre mentorias. Você pode excluir professores ou certificações específicas do relatório final.</p>

                    <h4 style="color: #2196F3; margin-top: 15px; margin-bottom: 5px;">5. Observações e Exportação 📄</h4>
                    <p style="margin: 0;">Preencha as observações de cada área para fornecer contexto. Ao gerar o PDF, ele respeitará exatamente a configuração visível na tela e o idioma selecionado de forma profissional.</p>
                </div>
            `
        },
        app: {
            retry: 'Tentar novamente',
            uploadAnother: '📤 Enviar outro relatório',
            processingErrorTitle: 'Erro ao processar o relatório',
        },
        school: {
            totalStudents: 'Total de alunos no Playground',
            groups: 'Grupos',
            totalGroups: 'Total de Grupos',
            generalStatusTitle: 'Status Geral da Escola',
            generalStatus: 'Status Geral',
            redWarning: '⚠️ Há pelo menos um grupo que requer atenção imediata.',
            redWarningPdf: '⚠️ Há grupos que requerem atenção imediata',
        },
        sectionSelector: {
            title: 'Configuração do Relatório',
            subtitle: 'Selecione as seções que deseja incluir no relatório final',
            students: '📚 Alunos',
            teachers: '👩‍🏫 Professores',
            noData: '(Sem dados disponíveis)',
        },
        students: {
            title: '📚 Métricas de Alunos',
            summary: 'Resumo Geral',
            showMandatoryRate: 'Mostrar taxa de cursos obrigatórios',
            showVitalityMetric: 'Mostrar Vitalidade Digital',
            showProgressMetric: 'Mostrar Progresso Recente',
            mandatoryRateTitle: 'Taxa de alunos certificados em cursos obrigatórios',
            mandatoryRateDescription: 'Porcentagem de estudantes que concluíram todos os cursos obrigatórios.',
            certified: 'Certificados',
            inProgress: 'Em andamento',
            vitalityTitle: 'Vitalidade Digital',
            vitalityDescription: 'Acessos à plataforma durante os últimos {days} dias.',
            active: 'Ativos',
            inactive: 'Inativos',
            recentProgressTitle: 'Progresso Recente',
            recentProgressDescription: 'Avanço em atividades e aulas nos últimos {days} dias.',
            withProgress: 'Com progresso',
            withoutProgress: 'Sem progresso',
            groupsByRoute: 'Grupos por Rota',
            includeMandatoryDetail: 'Incluir detalhe de cursos obrigatórios',
            cards: '🎴 Cards',
            table: '📊 Tabela',
            groupRoute: 'Grupo / Rota',
            state: 'Status',
            completedClasses: 'Aulas Concluídas',
            courseProgress: 'Progresso em Cursos',
            mandatory: 'Obrigatórios',
            totalCourses: 'Total de cursos',
            totalCoursesNote: '* O total de cursos inclui obrigatórios + complementares',
            studentsCount: '{count} alunos',
            studentCount: '{count} aluno',
            feedback: 'Feedback do status:',
            feedbackPdf: 'Feedback',
            changeDays: 'Alterar para {days} dias',
            dragToSort: 'Arrastar para ordenar',
            detailByRoute: 'Detalhe de Alunos por Rota',
            part: 'Parte {number}',
            observationsTitle: 'Observações do Mentor - Alunos',
        },
        teachers: {
            title: '👩‍🏫 Métricas de capacitação Docente',
            totalTeachers: 'Total de Professores',
            finishedCertifications: 'Certificações concluídas',
            certificationRate: 'Taxa de Certificação',
            certificationStatus: 'Status das Certificações',
            finished: 'Concluídas',
            pending: 'Pendentes',
            listTitle: 'Lista de Professores',
            teaching: 'Dá aulas',
            notTeaching: 'Não dá aulas',
            communication: 'Comunicação:',
            deleteTeacherTitle: 'Remover professor?',
            deleteTeacherText: 'Tem certeza de que deseja remover {name} do relatório?',
            deleteTeacherConfirm: 'Sim, remover',
            deleteTeacherCancel: 'Cancelar',
            deleteTeacherButton: 'Remover professor',
            deletePldTitle: 'Remover PLD?',
            deletePldText: '"{name}" será removido do relatório para este professor.',
            deletePldConfirm: 'Remover',
            deletePldCancel: 'Voltar',
            deletePldButton: 'Remover PLD',
            observationsTitle: 'Observações do Mentor - Professores',
            observationsLabel: 'Observações Gerais - Professores PLD',
            observationsPlaceholder: 'Adicione observações gerais sobre o desempenho dos professores...',
        },
        mentoring: {
            title: '🤝 Acompanhamento Pedagógico Síncrono',
            subtitle: '(Desde o início do ano letivo atual 📅)',
            scheduled: 'Mentorias Agendadas',
            completed: 'Mentorias Realizadas',
            scheduledShort: 'Agendadas',
            completedShort: 'Realizadas',
            participation: 'Participação',
            participationRate: 'Taxa de participação:',
            noMeetings: 'Não foram registrados encontros síncronos de acompanhamento pedagógico 📆',
            decrementScheduled: 'Diminuir agendadas',
            incrementScheduled: 'Aumentar agendadas',
            decrementCompleted: 'Diminuir realizadas',
            incrementCompleted: 'Aumentar realizadas',
        },
        observations: {
            studentsLabel: 'Observações Gerais - Alunos',
            studentsPlaceholder: 'Adicione observações gerais sobre o desempenho dos alunos...',
            characters: '{count} caracteres',
        },
        pdf: {
            generate: '📄 Gerar Relatório PDF',
            processing: '📄 Processando...',
            successTitle: 'Relatório Gerado!',
            successText: 'O PDF foi baixado corretamente.',
            errorTitle: 'Erro',
            errorText: 'Houve um erro ao gerar o PDF. Tente novamente.',
            missingTitle: 'Faltam dados obrigatórios',
            modalTitle: 'Preparando Relatório',
            schoolName: 'Nome da Escola',
            mentor: 'Mentor responsável',
            mentorPlaceholder: 'Nome e sobrenome',
            mentorHint: 'Este nome aparecerá no rodapé do relatório.',
            download: 'Baixar PDF',
            cancel: 'Cancelar',
            schoolRequired: 'O nome da escola é obrigatório',
            mentorRequired: 'Você deve informar o nome do mentor',
            mentorResponsible: 'Mentor Responsável:',
            generatedBy: 'Gerado por:',
            generatedByValue: 'Relatório Automático Playground',
            date: 'Data:',
            filePrefix: 'Relatorio',
        },
        validation: {
            missingSemaphores: 'Faltam definir semáforos para {count} grupos.',
            alertWithoutFeedback: 'O grupo "{name}" tem alerta, mas não tem motivos selecionados.',
            studentObservationsRequired: 'As observações gerais de alunos são obrigatórias.',
            teacherObservationsRequired: 'As observações gerais de professores são obrigatórias.',
            invalidFileData: 'O arquivo não contém informações válidas de alunos nem de professores.',
        },
        semaphores: {
            label: 'Status:',
            markAs: 'Marcar como {label}',
            green: 'No prazo',
            yellow: 'A reforçar',
            red: 'Requer atenção',
            gray: 'Pendente de análise',
        },
        feedback: {
            pending_corrections: 'Correções pendentes.',
            incomplete_classes: 'Aulas incompletas.',
            user_incidents: 'Incidentes com usuários.',
            student_count_mismatch: 'Diferença entre quantidade de alunos no curso e na plataforma.',
            learning_pace_difficulties: 'Dificuldades no ritmo de aprendizagem.',
            technical_difficulties: 'Dificuldades técnicas na escola.',
            low_certification_time: 'Pouco tempo dedicado à certificação.',
            teacher_turnover: 'Rotatividade docente.',
            empty_course: 'Curso vazio.',
            see_observations: 'Ver Observações do Mentor',
        },
        communication: {
            fluid: 'Fluida',
            needs_reinforcement: 'A reforçar',
            difficult: 'Com dificuldades',
            none: 'Sem comunicação',
        },
        courses: {
            percentOfCourses: '{percent}% de {total} cursos',
            ofTotal: 'de {total}',
        },
    },
};

const getValue = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

export const interpolate = (text, params = {}) =>
    String(text).replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`);

export const translate = (language, key, params) => {
    const dictionary = dictionaries[language] || dictionaries.es;
    const fallback = dictionaries.es;
    const value = getValue(dictionary, key) ?? getValue(fallback, key) ?? key;
    return interpolate(value, params);
};

export const getLocale = (language) =>
    LANGUAGES.find((item) => item.code === language)?.locale || 'es-AR';

export const getLanguageLabel = (language) =>
    LANGUAGES.find((item) => item.code === language)?.label || 'Español';
