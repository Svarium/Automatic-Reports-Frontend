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
                borderColor: 'transparent',
                borderWidth: 0,
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
                    color: '#ffffff', // Legend text color for dark mode
                    font: {
                        family: 'Montserrat',
                        size: 12,
                        weight: '600',
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                backgroundColor: '#1a1a1a',
                borderColor: '#333',
                borderWidth: 1,
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                titleFont: {
                    family: 'Montserrat',
                    size: 14,
                    weight: '700',
                },
                bodyFont: {
                    family: 'Montserrat',
                    size: 12,
                },
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
            },
        },
        cutout: '70%', // Cleaner donut look
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
