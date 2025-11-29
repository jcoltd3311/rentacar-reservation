
'use client';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import styles from './schedule.module.css';
import { bookings as initialBookings, vehicles, updateBooking } from '../../lib/mockData';

const getVehicleClassColor = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return '#71717a'; // default color

    switch (vehicle.class) {
        case 'コンパクト': return '#3b82f6';
        case '軽自動車': return '#f97316';
        case 'ミニバン': return '#8b5cf6';
        case 'SUV': return '#10b981';
        default: return '#71717a';
    }
};


export default function ScheduleClientPage() {
    const [bookings, setBookings] = useState(initialBookings);

    const calendarEvents = bookings.map(booking => ({
        id: booking.id,
        title: `${booking.vehicleName} (${booking.customerName})`,
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
        backgroundColor: getVehicleClassColor(booking.vehicleId),
        borderColor: getVehicleClassColor(booking.vehicleId),
        extendedProps: {
            vehicleId: booking.vehicleId,
            customerId: booking.customerId
        }
    }));

    const handleEventDrop = (info) => {
        const { event } = info;
        const updatedData = {
            startDate: event.start.toISOString(),
            endDate: event.end.toISOString(),
        };
        updateBooking(event.id, updatedData);
        setBookings([...initialBookings]); // Refresh state from source
        alert(`予約ID: ${event.id}の期間が変更されました。`);
    };

    const handleEventResize = (info) => {
        const { event } = info;
        const updatedData = {
            startDate: event.start.toISOString(),
            endDate: event.end.toISOString(),
        };
        updateBooking(event.id, updatedData);
        setBookings([...initialBookings]);
        alert(`予約ID: ${event.id}の終了日時が変更されました。`);
    };


    return (
        <div className={styles.container}>
            <h1>車両スケジュール</h1>
                <div className={styles.calendarWrapper}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='timeGridWeek'
                    events={calendarEvents}
                    editable={true}
                    droppable={true}
                    resizable={true}
                    eventDrop={handleEventDrop}
                    eventResize={handleEventResize}
                    locale='ja' // Japanese locale
                    buttonText={{
                        today: '今日',
                        month: '月',
                        week: '週',
                        day: '日'
                    }}
                    allDayText='終日'
                    height="80vh"
                />
            </div>
        </div>
    );
}
