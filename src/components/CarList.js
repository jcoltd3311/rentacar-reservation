'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';
import styles from './CarList.module.css';

// アイコンコンポーネント
const UsersIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

const TagIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.432 0l6.568-6.568a2.426 2.426 0 0 0 0-3.432l-8.704-8.704z"/><circle cx="18" cy="6" r="1"/></svg>
);

const CarCard = ({ car }) => (
    <div className={styles.card}>
        <Link href={`/booking/${car.id}`} className={styles.cardLink}>
            <div className={styles.imageWrapper}>
                <Image src={car.imageUrl} alt={car.name} width={500} height={300} className={styles.image} />
                {!car.available && (
                    <div className={styles.unavailableOverlay}>
                        <span>現在利用できません</span>
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.brandAndType}>
                    <span className={styles.brand}>{car.brand}</span>
                    <span className={styles.type}>{car.type}</span>
                </div>
                <h3 className={styles.carName}>{car.name}</h3>
                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <UsersIcon className="w-5 h-5 text-gray-500" />
                        <span>{car.capacity}人乗り</span>
                    </div>
                    <div className={styles.detailItem}>
                         <TagIcon className="w-5 h-5 text-gray-500" />
                         <span>{car.features[0]}</span>
                    </div>
                </div>
            </div>
        </Link>
        <div className={styles.priceSection}>
            <p className={styles.price}>
                <span className={styles.priceValue}>{car.pricePerDay.toLocaleString()}円</span> / 日
            </p>
            <button disabled={!car.available} className={`${styles.bookButton} ${!car.available ? styles.disabledButton : ''}`}>
                {car.available ? '今すぐ予約' : '予約不可'}
            </button>
        </div>
    </div>
);

export default function CarList() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "cars"), where("available", "==", true));
        const unsubscribe = onSnapshot(q, 
            (querySnapshot) => {
                const carsData = [];
                querySnapshot.forEach((doc) => {
                    carsData.push({ id: doc.id, ...doc.data() });
                });
                setCars(carsData);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching cars: ", err);
                setError("車両の読み込みに失敗しました。後でもう一度お試しください。");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    if (loading) return <p>車両情報を読み込んでいます...</p>;
    if (error) return <p className={styles.errorText}>{error}</p>;

    return (
        <div className={styles.grid}>
            {cars.map(car => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
}
