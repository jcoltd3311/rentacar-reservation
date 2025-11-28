'use client';

import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import styles from './dashboard.module.css';
import { ClockIcon, CheckCircleIcon, UserGroupIcon } from '@heroicons/react/24/solid';

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const q = query(collection(db, "bookings"), orderBy("checkinTimestamp", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const bookingsData = [];
            querySnapshot.forEach((doc) => {
                bookingsData.push({ id: doc.id, ...doc.data() });
            });
            setBookings(bookingsData);
            setIsLoading(false);
        }, (err) => {
            console.error("Error fetching bookings:", err);
            setError("データの取得に失敗しました。");
            setIsLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const getStatusChip = (status) => {
        switch (status) {
            case 'completed':
                return <span className={`${styles.chip} ${styles.completed}`}><CheckCircleIcon className="h-4 w-4 mr-1" />完了</span>;
            default:
                return <span className={`${styles.chip} ${styles.pending}`}><ClockIcon className="h-4 w-4 mr-1" />処理中</span>;
        }
    };

    if (isLoading) {
        return <div className={styles.loadingState}>ダッシュボードを読み込み中...</div>;
    }

    if (error) {
        return <div className={styles.errorState}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <UserGroupIcon className="h-8 w-8 mr-3 text-gray-700" />
                <h1 className={styles.title}>管理者ダッシュボード</h1>
            </header>
            <p className={styles.subtitle}>チェックイン状況をリアルタイムで監視します。</p>

            <div className={styles.tableContainer}>
                <table className={styles.dashboardTable}>
                    <thead>
                        <tr>
                            <th>顧客氏名</th>
                            <th>ステータス</th>
                            <th>チェックイン日時</th>
                            <th>免許証番号</th>
                            <th>連絡先</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.customerName || 'N/A'}</td>
                                    <td>{getStatusChip(booking.status)}</td>
                                    <td>{booking.checkinTimestamp ? new Date(booking.checkinTimestamp.seconds * 1000).toLocaleString('ja-JP') : '-'}</td>
                                    <td>{booking.licenseNumber || '-'}</td>
                                    <td>{booking.tel || '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">現在、チェックイン情報はありません。</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
