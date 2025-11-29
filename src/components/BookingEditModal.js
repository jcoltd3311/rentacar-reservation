
'use client';

import { useState } from 'react';
import styles from './BookingEditModal.module.css';

export default function BookingEditModal({ booking, onClose, onUpdate, customers, vehicles }) {
    const [formData, setFormData] = useState({ ...booking });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const customer = customers.find(c => c.id === formData.customerId);
        const vehicle = vehicles.find(v => v.id === formData.vehicleId);
        onUpdate({ ...formData, customerName: customer.name, vehicleName: vehicle.name });
    };
    
    const bookingStatuses = ["予約中", "貸出中", "完了", "キャンセル"];
    const channels = ["WEB", "電話", "エージェント", "店舗"];

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h2>予約情報の編集 (ID: {booking.id})</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>顧客</label>
                        <select name="customerId" value={formData.customerId} onChange={handleChange}>
                            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>車両</label>
                        <select name="vehicleId" value={formData.vehicleId} onChange={handleChange}>
                            {vehicles.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>開始日時</label>
                        <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>終了日時</label>
                        <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} />
                    </div>
                     <div className={styles.formGroup}>
                        <label>予約経路</label>
                        <select name="channel" value={formData.channel} onChange={handleChange}>
                            {channels.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>ステータス</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                             {bookingStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>閉じる</button>
                        <button type="submit" className={styles.updateButton}>更新</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
