
'use client';

import { useState } from 'react';
import styles from './BookingsClientPage.module.css';
import { bookings as initialBookings, customers, vehicles, updateBooking } from '../../lib/mockData';
import { FaExclamationTriangle, FaEdit, FaTimesCircle } from 'react-icons/fa';
import BookingEditModal from '../BookingEditModal';

const StatusBadge = ({ status }) => {
    const statusStyle = styles[status.toLowerCase()] || styles.default;
    return <span className={`${styles.badge} ${statusStyle}`}>{status}</span>;
};

export default function BookingsClientPage() {
    const [bookings, setBookings] = useState(initialBookings);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBooking, setEditingBooking] = useState(null);
    
    const [newBooking, setNewBooking] = useState({ customerId: '', vehicleId: '', startDate: '', endDate: '', channel: 'WEB' });
    const [selectedCustomerForWarning, setSelectedCustomerForWarning] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBooking({ ...newBooking, [name]: value });

        if (name === 'customerId') {
            const customer = customers.find(c => c.id === value);
            setSelectedCustomerForWarning(customer);
        }
    };

    const handleAddBooking = (e) => {
        e.preventDefault();
        const customer = customers.find(c => c.id === newBooking.customerId);
        const vehicle = vehicles.find(v => v.id === newBooking.vehicleId);

        const newEntry = {
            id: `BK${String(bookings.length + 1).padStart(3, '0')}`,
            ...newBooking,
            customerName: customer.name,
            vehicleName: vehicle.name,
            totalPrice: 15000, // Dummy price
            status: '予約中'
        };
        setBookings([newEntry, ...bookings]);
        setNewBooking({ customerId: '', vehicleId: '', startDate: '', endDate: '', channel: 'WEB' });
        setSelectedCustomerForWarning(null);
    };
    
    const handleOpenEditModal = (booking) => {
        setEditingBooking(booking);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBooking(null);
    };

    const handleUpdateBooking = (updatedData) => {
        updateBooking(editingBooking.id, updatedData);
        setBookings([...initialBookings]);
        handleCloseModal();
    };

    const handleCancelBooking = (bookingId) => {
        if (window.confirm('この予約を本当にキャンセルしますか？この操作は元に戻せません。')) {
            updateBooking(bookingId, { status: 'キャンセル' });
            setBookings([...initialBookings]);
        }
    };

    return (
        <div className={styles.container}>
            <h1>予約管理</h1>

            <div className={styles.formContainer}>
                <h2>新規予約作成</h2>
                <form onSubmit={handleAddBooking} className={styles.form}>
                     <select name="customerId" value={newBooking.customerId} onChange={handleInputChange} required>
                        <option value="">顧客を選択...</option>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <select name="vehicleId" value={newBooking.vehicleId} onChange={handleInputChange} required>
                        <option value="">車両を選択...</option>
                        {vehicles.filter(v => v.status === '利用可能').map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                    </select>
                    <input type="datetime-local" name="startDate" value={newBooking.startDate} onChange={handleInputChange} required />
                    <input type="datetime-local" name="endDate" value={newBooking.endDate} onChange={handleInputChange} required />
                    <select name="channel" value={newBooking.channel} onChange={handleInputChange} required>
                        <option value="WEB">WEB</option>
                        <option value="電話">電話</option>
                        <option value="エージェント">エージェント</option>
                        <option value="店舗">店舗</option>
                    </select>
                    <button type="submit" className={styles.addButton}>予約を追加</button>
                </form>
                 {selectedCustomerForWarning && selectedCustomerForWarning.isRestricted && (
                    <div className={styles.warningMessage}>
                        <FaExclamationTriangle />
                        警告: この顧客は過去に重大な規約違反が記録されています。
                    </div>
                )}
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>予約ID</th><th>顧客名</th><th>車両</th><th>期間</th><th>経路</th><th>ステータス</th><th>アクション</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id} className={booking.status === 'キャンセル' ? styles.cancelledRow : ''}>
                                <td>{booking.id}</td>
                                <td>{booking.customerName}</td>
                                <td>{booking.vehicleName}</td>
                                <td>{booking.startDate} to {booking.endDate}</td>
                                <td>{booking.channel}</td>
                                <td><StatusBadge status={booking.status} /></td>
                                <td className={styles.actionsCell}>
                                    {booking.status !== 'キャンセル' && (
                                        <>
                                            <button onClick={() => handleOpenEditModal(booking)} className={styles.actionButton}><FaEdit /></button>
                                            <button onClick={() => handleCancelBooking(booking.id)} className={`${styles.actionButton} ${styles.cancelButton}`}><FaTimesCircle /></button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <BookingEditModal 
                    booking={editingBooking} 
                    onClose={handleCloseModal} 
                    onUpdate={handleUpdateBooking} 
                    customers={customers}
                    vehicles={vehicles}
                />
            )}
        </div>
    );
}
