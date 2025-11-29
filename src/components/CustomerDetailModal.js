
'use client';

import { useState, useEffect } from 'react';
import styles from './CustomerDetailModal.module.css';
import { FaExclamationTriangle } from 'react-icons/fa';

const TabButton = ({ label, isActive, onClick }) => (
    <button 
        className={`${styles.tabButton} ${isActive ? styles.activeTab : ''}`}
        onClick={onClick}
    >
        {label}
    </button>
);

const InfoRow = ({ label, value }) => (
    <div className={styles.infoRow}>
        <span className={styles.infoLabel}>{label}</span>
        <span className={styles.infoValue}>{value}</span>
    </div>
);

export default function CustomerDetailModal({ customer, onClose, onUpdate }) {
    const [activeTab, setActiveTab] = useState('basic');
    const [editedCustomer, setEditedCustomer] = useState({ ...customer });

    useEffect(() => {
        setEditedCustomer({ ...customer });
    }, [customer]);

    const handleStatusChange = (e) => {
        setEditedCustomer({ ...editedCustomer, status: e.target.value });
    };

    const handleRestrictionToggle = () => {
        setEditedCustomer({ ...editedCustomer, isRestricted: !editedCustomer.isRestricted });
    };

    const handleSaveChanges = () => {
        onUpdate(editedCustomer);
    };

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>顧客詳細</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>

                <div className={styles.tabs}>
                    <TabButton label="基本情報" isActive={activeTab === 'basic'} onClick={() => setActiveTab('basic')} />
                    <TabButton label="利用履歴" isActive={activeTab === 'history'} onClick={() => setActiveTab('history')} />
                    <TabButton label="違反履歴" isActive={activeTab === 'violations'} onClick={() => setActiveTab('violations')} />
                    <TabButton label="管理設定" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </div>

                <div className={styles.modalBody}>
                    {activeTab === 'basic' && (
                        <div className={styles.tabContent}>
                            <InfoRow label="氏名" value={customer.name} />
                            <InfoRow label="メールアドレス" value={customer.email} />
                            <InfoRow label="電話番号" value={customer.phone} />
                            <InfoRow label="住所" value={customer.address} />
                            <InfoRow label="免許証番号" value={customer.licenseNumber} />
                        </div>
                    )}
                    {activeTab === 'history' && (
                         <div className={styles.tabContent}>
                             {customer.rentalHistory.length > 0 ? (
                                 <table className={styles.historyTable}>
                                     <thead><tr><th>予約ID</th><th>車両</th><th>期間</th><th>料金</th></tr></thead>
                                     <tbody>
                                         {customer.rentalHistory.map(h => (
                                             <tr key={h.bookingId}><td>{h.bookingId}</td><td>{h.vehicle}</td><td>{h.period}</td><td>{h.price.toLocaleString()}円</td></tr>
                                         ))}
                                     </tbody>
                                 </table>
                             ) : <p>利用履歴はありません。</p>}
                         </div>
                    )}
                    {activeTab === 'violations' && (
                        <div className={styles.tabContent}>
                            {customer.violationHistory.length > 0 ? (
                                <ul className={styles.violationList}>
                                    {customer.violationHistory.map((v, i) => (
                                        <li key={i}>
                                            <strong>{v.date}: {v.reason}</strong>
                                            <p>{v.notes}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p>違反履歴はありません。</p>}
                            {/* Add violation form could go here */}
                        </div>
                    )}
                    {activeTab === 'settings' && (
                        <div className={styles.tabContent}>
                            <div className={styles.settingItem}>
                                <label>会員ステータス:</label>
                                <select value={editedCustomer.status} onChange={handleStatusChange}>
                                    <option value="一般">一般</option>
                                    <option value="ゴールド会員">ゴールド会員</option>
                                </select>
                            </div>
                            <div className={styles.settingItem}>
                                <label>要注意顧客設定:</label>
                                <button 
                                    onClick={handleRestrictionToggle} 
                                    className={`${styles.toggleButton} ${editedCustomer.isRestricted ? styles.toggledOn : ''}`}>
                                    {editedCustomer.isRestricted ? '解除する' : '指定する'}
                                </button>
                                {editedCustomer.isRestricted && <FaExclamationTriangle className={styles.warningIcon} />}
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.modalFooter}>
                    <button onClick={onClose} className={styles.cancelButton}>キャンセル</button>
                    <button onClick={handleSaveChanges} className={styles.saveButton}>変更を保存</button>
                </div>
            </div>
        </div>
    );
}
