
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './bookingDetail.module.css';
import ContractModal from '../ContractModal'; // Corrected path

// Mock Data - In a real app, this would be fetched from Firestore
const sampleBookings = [
    { 
        id: 'BK001', 
        customerName: '山田 太郎', 
        vehicleName: 'トヨタ・ヤリス', 
        startDate: '2023-10-27 10:00', 
        endDate: '2023-10-28 18:00',
        totalPrice: 12000,
        status: '確定済' 
    },
];

export default function BookingDetailClientPage() {
    const params = useParams();
    const bookingId = params.id;
    const [booking, setBooking] = useState(sampleBookings.find(b => b.id === bookingId));
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!booking) {
        return <div>予約が見つかりません。</div>;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>予約詳細</h1>
                    <button 
                        className={styles.createContractButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        契約書PDFを発行
                    </button>
                </div>

                <div className={styles.detailGrid}>
                    <div className={styles.detailItem}><strong>予約ID:</strong> {booking.id}</div>
                    <div className={styles.detailItem}><strong>顧客名:</strong> {booking.customerName}</div>
                    <div className={styles.detailItem}><strong>車両:</strong> {booking.vehicleName}</div>
                    <div className={styles.detailItem}><strong>開始日時:</strong> {booking.startDate}</div>
                    <div className={styles.detailItem}><strong>終了日時:</strong> {booking.endDate}</div>
                    <div className={styles.detailItem}><strong>合計料金:</strong> {booking.totalPrice.toLocaleString()}円</div>
                    <div className={styles.detailItem}><strong>ステータス:</strong> {booking.status}</div>
                </div>
            </div>

            {isModalOpen && (
                <ContractModal 
                    booking={booking}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
