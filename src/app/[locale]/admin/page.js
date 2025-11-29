
'use client';
import AdminLayout from './layout';
import styles from './admin.module.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import {
    transactions, 
    vehicles, 
    bookings, 
    coupons
} from '../../../lib/mockData';
import { FaYenSign, FaCar, FaTicketAlt, FaRoute } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// --- Chart Components ---

const SalesChart = () => {
    const data = {
        labels: ['3月', '4月', '5月', '6月', '7月'],
        datasets: [{
            label: '月間売上 (円)',
            data: [1200000, 1500000, 1300000, 1700000, 1900000],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
        }]
    };
    return <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
};

const OccupancyRate = () => {
    const rented = bookings.filter(b => b.status === 'confirmed' && new Date(b.startDate) <= new Date() && new Date(b.endDate) >= new Date()).length;
    const rate = (rented / vehicles.length) * 100;
    return (
        <div className={styles.kpiValue}>
            <span>{rate.toFixed(1)}%</span>
            <p>({rented} / {vehicles.length} 台)</p>
        </div>
    );
};

const CouponUsage = () => {
    // This is a simplified view. A real implementation would track usage per coupon.
    const usedCoupons = transactions.filter(t => t.couponId).length;
    return (
        <div className={styles.kpiValue}>
            <span>{usedCoupons} 回</span>
            <p>利用済み</p>
        </div>
    );
};

const BookingSourceChart = () => {
    const sources = bookings.reduce((acc, booking) => {
        acc[booking.source] = (acc[booking.source] || 0) + 1;
        return acc;
    }, {});
    const data = {
        labels: Object.keys(sources),
        datasets: [{
            data: Object.values(sources),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
    };
    return <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
};

// --- Main Page Component ---

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className={styles.dashboardGrid}>
                <div className={`${styles.widget} ${styles.salesChart}`}>
                    <h3><FaYenSign /> 売上集計</h3>
                    <div className={styles.chartContainer}><SalesChart /></div>
                </div>
                <div className={styles.widget}>
                    <h3><FaCar /> 現在の車両稼働率</h3>
                    <OccupancyRate />
                </div>
                <div className={styles.widget}>
                    <h3><FaTicketAlt /> クーポン利用状況</h3>
                    <CouponUsage />
                </div>
                <div className={`${styles.widget} ${styles.bookingSource}`}>
                    <h3><FaRoute /> 予約経路別統計</h3>
                    <div className={styles.chartContainer}><BookingSourceChart /></div>
                </div>
            </div>
        </AdminLayout>
    );
}
