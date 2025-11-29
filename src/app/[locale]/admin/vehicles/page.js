
'use client';
import AdminLayout from '../layout';
import styles from './vehicles.module.css';
import { vehicles } from '../../../../lib/mockData';
import { FaPen, FaTrash } from 'react-icons/fa';
import { differenceInDays, parseISO } from 'date-fns';

const getStatusClass = (status) => {
    switch (status) {
        case '利用可能': return styles.statusAvailable;
        case '貸出中': return styles.statusRented;
        case '整備中': return styles.statusMaintenance;
        default: return '';
    }
};

const getInspectionStatusClass = (status, dueDate) => {
    const daysUntilDue = differenceInDays(parseISO(dueDate), new Date());
    if (daysUntilDue <= 30) return styles.inspectionUrgent; // Urgent
    if (status === '要実施') return styles.inspectionRequired; // Required
    return styles.inspectionCompleted; // Completed
}

export default function VehiclesPage() {
    return (
        <AdminLayout>
            <div className={styles.container}>
                <h1>車両在庫一覧</h1>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>車両名</th>
                            <th>クラス</th>
                            <th>ナンバー</th>
                            <th>ステータス</th>
                            <th>車検満了日</th>
                            <th>車検ステータス</th>
                            <th>アクション</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => {
                            const daysUntilDue = differenceInDays(parseISO(vehicle.inspectionDueDate), new Date());
                            const rowClass = daysUntilDue <= 30 ? styles.rowWarning : '';

                            return (
                                <tr key={vehicle.id} className={rowClass}>
                                    <td>{vehicle.name}</td>
                                    <td>{vehicle.class}</td>
                                    <td>{vehicle.registration}</td>
                                    <td><span className={`${styles.statusBadge} ${getStatusClass(vehicle.status)}`}>{vehicle.status}</span></td>
                                    <td>{vehicle.inspectionDueDate}</td>
                                    <td><span className={`${styles.statusBadge} ${getInspectionStatusClass(vehicle.inspectionStatus, vehicle.inspectionDueDate)}`}>{vehicle.inspectionStatus}</span></td>
                                    <td>
                                        <button className={styles.actionButton}><FaPen /></button>
                                        <button className={`${styles.actionButton} ${styles.deleteButton}`}><FaTrash /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
