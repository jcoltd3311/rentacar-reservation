
'use client';
import { useState } from 'react';
import AdminLayout from '../layout';
import styles from './coupons.module.css';
import { coupons as initialCoupons, addCoupon, updateCoupon, feeSettings } from '../../../../lib/mockData';
import { FaTicketAlt, FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';

// Modal for creating/editing coupons
const CouponModal = ({ isOpen, onClose, onSave, coupon }) => {
    const [formData, setFormData] = useState(coupon || {
        code: '', description: '', discountType: 'percentage', discountValue: 10,
        startDate: '', endDate: '', applicableClasses: [], status: 'active'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClassChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const classes = checked 
                ? [...prev.applicableClasses, value]
                : prev.applicableClasses.filter(c => c !== value);
            return { ...prev, applicableClasses: classes };
        });
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>{coupon ? 'クーポンを編集' : '新規クーポンを発行'}</h2>
                <button onClick={onClose} className={styles.closeButton}><FaTimes /></button>
                <div className={styles.formGrid}>
                    <input name="code" value={formData.code} onChange={handleChange} placeholder="クーポンコード (例: WINTER25)" />
                    <input name="description" value={formData.description} onChange={handleChange} placeholder="説明 (例: 冬季限定25%OFF)" />
                    <div className={styles.discountInput}>
                        <input name="discountValue" type="number" value={formData.discountValue} onChange={handleChange} />
                        <select name="discountType" value={formData.discountType} onChange={handleChange}>
                            <option value="percentage">%</option>
                            <option value="fixed">円</option>
                        </select>
                    </div>
                    <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
                    <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
                    <div className={styles.checkboxGroup}>
                        <label>対象クラス (無選択時は全クラス対象):</label>
                        <div>
                        {Object.keys(feeSettings.classPricing).map(className => (
                            <label key={className}><input type="checkbox" value={className} checked={formData.applicableClasses.includes(className)} onChange={handleClassChange} /> {className}</label>
                        ))}
                        </div>
                    </div>
                </div>
                <button onClick={() => onSave(formData)} className={styles.saveButton}>保存</button>
            </div>
        </div>
    );
};

export default function CouponsPage() {
    const [coupons, setCoupons] = useState(initialCoupons);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);

    const handleSave = (couponData) => {
        if(editingCoupon) {
            const updated = updateCoupon(editingCoupon.id, couponData);
            setCoupons(coupons.map(c => c.id === editingCoupon.id ? updated : c));
        } else {
            const newCoupon = addCoupon(couponData);
            setCoupons([newCoupon, ...coupons]);
        }
        setIsModalOpen(false);
        setEditingCoupon(null);
    };

    const openModal = (coupon = null) => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1><FaTicketAlt /> クーポン管理</h1>
                    <button onClick={() => openModal()} className={styles.newButton}><FaPlus /> 新規クーポン</button>
                </div>

                <CouponModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} coupon={editingCoupon} />

                <div className={styles.couponList}>
                    {coupons.map(c => (
                        <div key={c.id} className={`${styles.couponCard} ${styles[c.status]}`}>
                            <div className={styles.cardHeader}>
                                <span className={styles.code}>{c.code}</span>
                                <span className={styles.statusBadge}>{c.status}</span>
                            </div>
                            <p className={styles.description}>{c.description}</p>
                            <div className={styles.details}>
                                <p>割引: <strong>{c.discountValue}{c.discountType === 'percentage' ? '%' : '円'}</strong></p>
                                <p>期間: <strong>{format(new Date(c.startDate), 'yy/MM/dd')} ~ {format(new Date(c.endDate), 'yy/MM/dd')}</strong></p>
                                <p>対象: <strong>{c.applicableClasses.length ? c.applicableClasses.join(', ') : '全クラス'}</strong></p>
                            </div>
                             <div className={styles.cardFooter}>
                                <button onClick={() => openModal(c)}><FaEdit /> 編集</button>
                                <button><FaTrash /> 削除</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
