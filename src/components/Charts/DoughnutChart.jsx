import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import './Charts.css';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, labels, title, colors }) => {
    const defaultColors = [
        'var(--chart-blue)',
        'var(--chart-orange)',
        'var(--chart-purple)',
        'var(--chart-green)',
        'var(--chart-teal)',
    ];

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: colors || defaultColors,
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: 'Montserrat',
                        size: 12,
                    },
                    padding: 15,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    family: 'Montserrat',
                    size: 14,
                },
                bodyFont: {
                    family: 'Montserrat',
                    size: 12,
                },
                padding: 12,
                cornerRadius: 8,
            },
        },
    };

    return (
        <div className="chart-container">
            {title && <h3 className="chart-title">{title}</h3>}
            <div className="chart-wrapper">
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
};

export default DoughnutChart;
