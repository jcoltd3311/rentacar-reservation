'use client';

import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { addDays, eachDayOfInterval } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './BookingCalendar.module.css';

export default function BookingCalendar({ carId, pricePerDay, onDateChange, onPriceChange }) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const [disabledDates, setDisabledDates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!carId) return;

        const q = query(
            collection(db, "bookings"),
            where("carId", "==", carId)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const dates = [];
            snapshot.forEach(doc => {
                const booking = doc.data();
                const interval = eachDayOfInterval({
                    start: booking.startDate.toDate(),
                    end: booking.endDate.toDate()
                });
                dates.push(...interval);
            });
            setDisabledDates(dates);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [carId]);

    useEffect(() => {
        // Notify parent about date changes and calculated price
        if (onDateChange) {
            onDateChange(state[0]);
        }
        if (onPriceChange) {
            const { startDate, endDate } = state[0];
            if (startDate && endDate) {
                const days = eachDayOfInterval({ start: startDate, end: endDate }).length;
                onPriceChange(pricePerDay * days, days);
            }
        }
    }, [state, pricePerDay, onDateChange, onPriceChange]);

    return (
        <div className={styles.calendarWrapper}>
            {loading ? (
                <p>予約状況を読み込み中...</p>
            ) : (
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    minDate={new Date()} // Can't book dates in the past
                    disabledDates={disabledDates}
                    className={styles.dateRangePicker}
                />
            )}
        </div>
    );
}
