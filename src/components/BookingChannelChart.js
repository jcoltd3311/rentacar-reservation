
'use client';

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BookingChannelChart({ bookings }) {
    const channelCounts = bookings.reduce((acc, booking) => {
        if (booking.status !== 'キャンセル') {
            acc[booking.channel] = (acc[booking.channel] || 0) + 1;
        }
        return acc;
    }, {});

    const data = {
        labels: Object.keys(channelCounts),
        datasets: [
            {
                label: '予約件数',
                data: Object.values(channelCounts),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)', // WEB
                    'rgba(255, 206, 86, 0.7)', // 電話
                    'rgba(75, 192, 192, 0.7)', // エージェント
                    'rgba(153, 102, 255, 0.7)', // 店舗
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '予約経路別レポート',
                font: { size: 16 }
            },
        },
    };

    return (
        <div style={{ height: '300px' }}>
            <Pie data={data} options={options} />
        </div>
    );
}
