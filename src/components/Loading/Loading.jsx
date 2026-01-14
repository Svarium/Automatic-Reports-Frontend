import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p className="loading-text">Analizando reporte...</p>
        </div>
    );
};

export default Loading;
