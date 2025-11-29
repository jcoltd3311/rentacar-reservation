'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import styles from './account.module.css';

// Icons
const CalendarIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const CreditCardIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const TagIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>;


export default function AccountPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [bookingsLoading, setBookingsLoading] = useState(true);

    useEffect(() => {
        // Redirect if not logged in
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user) {
            const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const userBookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Sort by creation date
                userBookings.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
                setBookings(userBookings);
                setBookingsLoading(false);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const handleCancelBooking = async (bookingId) => {
        if (!confirm("本当にこの予約をキャンセルしますか？")) return;

        try {
            const bookingRef = doc(db, 'bookings', bookingId);
            await updateDoc(bookingRef, {
                status: 'cancelled'
            });
            // Optionally add a success notification
        } catch (error) {
            console.error("Error cancelling booking: ", error);
            // Optionally add an error notification
        }
    };

    // Render a loading state while checking auth
    if (loading || bookingsLoading && !bookings.length) {
        return <div className={styles.statusMessage}>読み込み中...</div>;
    }
    
    // This should only be visible for a moment before redirect
    if (!user) {
        return <div className={styles.statusMessage}>リダイレクト中...</div>;
    }

    return (
        <div className={styles.accountContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>マイページ</h1>
                <p className={styles.subtitle}>アカウント情報と予約履歴</p>
            </div>

            <div className={styles.userInfo}>
                <p><strong>メールアドレス:</strong> {user.email}</p>
            </div>

            <div className={styles.bookingsSection}>
                <h2 className={styles.sectionTitle}>予約履歴</h2>
                {bookingsLoading ? (
                     <div className={styles.statusMessage}>予約情報を読み込んでいます...</div>
                ) : bookings.length > 0 ? (
                    <div className={styles.bookingsGrid}>
                        {bookings.map(booking => (
                            <div key={booking.id} className={styles.bookingCard}>
                                <Image src={booking.carImage} alt={booking.carName} width={400} height={200} className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <span className={`${styles.statusBadge} ${styles[booking.status]}`}>{booking.status}</span>
                                    <h3 className={styles.carName}>{booking.carBrand} {booking.carName}</h3>
                                    <div className={styles.detailItem}>
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>{format(booking.startDate.toDate(), 'yyyy/MM/dd')} - {format(booking.endDate.toDate(), 'yyyy/MM/dd')}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <CreditCardIcon className="w-4 h-4" />
                                        <span>合計料金: {booking.totalPrice.toLocaleString()}円</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <TagIcon className="w-4 h-4" />
                                        <span>予約ID: {booking.id}</span>
                                    </div>
                                    {booking.status === 'pending' && (
                                         <button onClick={() => handleCancelBooking(booking.id)} className={styles.cancelButton}>
                                             この予約をキャンセル
                                         </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.statusMessage}>予約履歴はまだありません。</p>
                )}
            </div>
        </div>
    );
}
