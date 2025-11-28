'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import BookingCalendar from '../../../components/BookingCalendar'; // Import the new calendar
import styles from './booking.module.css';

// Icons
const UsersIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const CheckIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth(); // Get user from auth context
    const carId = params.carId;

    // Component State
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Booking State
    const [bookingDates, setBookingDates] = useState(null);
    const [rentalDays, setRentalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingMessage, setBookingMessage] = useState({ type: '', text: '' });

    // Fetch car data
    useEffect(() => {
        if (carId) {
            const fetchCar = async () => {
                try {
                    const docRef = doc(db, "cars", carId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setCar({ id: docSnap.id, ...docSnap.data() });
                    } else {
                        setError("指定された車両が見つかりませんでした。");
                    }
                } catch (err) {
                    console.error("Error fetching document: ", err);
                    setError("車両情報の取得中にエラーが発生しました。");
                } finally {
                    setLoading(false);
                }
            };
            fetchCar();
        }
    }, [carId]);

    // Callback handlers for calendar
    const handleDateChange = (dates) => setBookingDates(dates);
    const handlePriceChange = (price, days) => {
        setTotalPrice(price);
        setRentalDays(days);
    };

    // Handle booking submission
    const handleBooking = async () => {
        if (!user) {
            router.push('/login?redirect=/booking/' + carId);
            return;
        }
        if (!bookingDates || !car) return;

        setBookingLoading(true);
        setBookingMessage({ type: '', text: '' });

        try {
            await addDoc(collection(db, 'bookings'), {
                userId: user.uid,
                carId: car.id,
                carName: car.name,
                carBrand: car.brand,
                carImage: car.imageUrl,
                startDate: bookingDates.startDate,
                endDate: bookingDates.endDate,
                totalPrice: totalPrice,
                rentalDays: rentalDays,
                createdAt: serverTimestamp(),
                status: 'pending' // e.g., pending, confirmed, cancelled
            });
            setBookingMessage({ type: 'success', text: '予約リクエストが正常に送信されました。マイページで状況を確認できます。' });
            // Optionally redirect after a delay
            setTimeout(() => router.push('/account'), 3000);
        } catch (e) {
            console.error("Booking failed: ", e);
            setBookingMessage({ type: 'error', text: '予約に失敗しました。時間をおいて再度お試しください。' });
        } finally {
            setBookingLoading(false);
        }
    };


    if (loading) return <div className={styles.centerStatus}>読み込み中...</div>;
    if (error) return <div className={`${styles.centerStatus} ${styles.errorText}`}>{error}</div>;
    if (!car) return null;

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.imageGallery}>
                    <Image src={car.imageUrl} alt={car.name} width={800} height={600} className={styles.mainImage} />
                </div>
                <div className={styles.detailsSection}>
                    <span className={styles.brand}>{car.brand}</span>
                    <h1 className={styles.carName}>{car.name}</h1>
                    <div className={styles.capacity}>
                        <UsersIcon className="w-5 h-5 text-gray-600" />
                        <span>最大{car.capacity}人乗り</span>
                    </div>
                    
                    <h2 className={styles.sectionTitle}>主な特徴</h2>
                    <ul className={styles.featuresList}>
                        {car.features.map(feature => (
                            <li key={feature} className={styles.featureItem}>
                                <CheckIcon className="w-5 h-5 text-green-500" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.bookingSidebar}>
                <div className={styles.bookingBox}>
                    <div className={styles.priceDisplay}>
                        <span className={styles.priceValue}>{car.pricePerDay.toLocaleString()}円</span>
                        <span className={styles.priceUnit}>/ 日</span>
                    </div>
                    <hr className={styles.divider} />

                    {/* Interactive Calendar */}
                    <BookingCalendar 
                        carId={car.id} 
                        pricePerDay={car.pricePerDay}
                        onDateChange={handleDateChange}
                        onPriceChange={handlePriceChange}
                    />

                     <hr className={styles.divider} />
                    
                     {/* Dynamic Price Calculation */}
                    <div className={styles.priceCalculation}>
                        <div className={styles.priceRow}>
                           <span>{car.pricePerDay.toLocaleString()}円 x {rentalDays}日</span>
                           <span>{totalPrice.toLocaleString()}円</span>
                        </div>
                        <div className={`${styles.priceRow} ${styles.totalPriceRow}`}>
                           <span>合計（税抜）</span>
                           <span>{totalPrice.toLocaleString()}円</span>
                        </div>
                    </div>

                    {/* Message Display */}
                    {bookingMessage.text && (
                        <div className={`${styles.bookingMessage} ${bookingMessage.type === 'success' ? styles.success : styles.error}`}>
                            {bookingMessage.text}
                        </div>
                    )}
                    
                    <button 
                        className={styles.reserveButton} 
                        disabled={!car.available || bookingLoading}
                        onClick={handleBooking}
                    >
                        {bookingLoading ? '処理中...' : (car.available ? '予約リクエスト' : '現在予約できません')}
                    </button>
                </div>
            </div>
        </div>
    );
}
