
'use client';

import styles from './settings.module.css'; 
import { useState, useEffect } from 'react';

// Using the same Modal component structure as the classes page
const Modal = ({ children, onClose }) => (
  <div className={styles.modalBackdrop} onClick={onClose}>
    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className={styles.closeButton}>×</button>
      {children}
    </div>
  </div>
);

const RateForm = ({ onSubmit, onCancel, initialData, vehicleClasses }) => {
    const [classId, setClassId] = useState(initialData?.classId || (vehicleClasses[0]?.id || ''));
    const [name, setName] = useState(initialData?.name || '');
    const [durationHours, setDurationHours] = useState(initialData?.durationHours || '');
    const [price, setPrice] = useState(initialData?.price || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ classId, name, durationHours: Number(durationHours), price: Number(price) });
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{initialData ? '料金プランの編集' : '新しい料金プランの追加'}</h3>
      <div className={styles.formGroup}>
        <label htmlFor="rateClass">車両クラス</label>
        <select id="rateClass" value={classId} onChange={e => setClassId(e.target.value)} required>
          {vehicleClasses.map(vc => <option key={vc.id} value={vc.id}>{vc.name}</option>)}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="rateName">プラン名</label>
        <input id="rateName" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="例: 1日プラン" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="rateDuration">期間（時間）</label>
        <input id="rateDuration" type="number" value={durationHours} onChange={e => setDurationHours(e.target.value)} placeholder="例: 24" required />
      </div>
       <div className={styles.formGroup}>
        <label htmlFor="ratePrice">基本料金（円）</label>
        <input id="ratePrice" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="例: 8000" required />
      </div>
      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>キャンセル</button>
        <button type="submit" className={styles.submitButton}>{initialData ? '更新' : '作成'}</button>
      </div>
    </form>
  );
};


const RatesClientPage = () => {
  // In a real app, vehicleClasses would be fetched from Firestore
  const [vehicleClasses] = useState([
    { id: 'cl_1', name: 'コンパクト' },
    { id: 'cl_2', name: 'SUV' },
    { id: 'cl_3', name: 'プレミアム' },
  ]);

  const [rates, setRates] = useState([
    { id: 'rate_1', classId: 'cl_1', name: '6時間プラン', durationHours: 6, price: 5000 },
    { id: 'rate_2', classId: 'cl_1', name: '1日プラン', durationHours: 24, price: 8000 },
    { id: 'rate_3', classId: 'cl_2', name: '1日プラン', durationHours: 24, price: 12000 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRate, setEditingRate] = useState(null);

  const getClassName = (classId) => vehicleClasses.find(vc => vc.id === classId)?.name || 'N/A';

  const handleAdd = () => {
    setEditingRate(null);
    setIsModalOpen(true);
  };

  const handleEdit = (rate) => {
    setEditingRate(rate);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('この料金プランを本当に削除しますか？')) {
        setRates(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleFormSubmit = (data) => {
    if (editingRate) {
        setRates(prev => prev.map(r => r.id === editingRate.id ? { ...r, ...data } : r));
    } else {
        setRates(prev => [...prev, { id: `rate_${Date.now()}`, ...data }]);
    }
    setIsModalOpen(false);
  };

  return (
      <div className={styles.managementContainer}>
        <div className={styles.header}>
          <h1>基本料金管理</h1>
          <button onClick={handleAdd} className={styles.addButton}>+ 新規追加</button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>車両クラス</th>
                <th>プラン名</th>
                <th>期間</th>
                <th>料金</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {rates.map(rate => (
                <tr key={rate.id}>
                  <td>{getClassName(rate.classId)}</td>
                  <td>{rate.name}</td>
                  <td>{rate.durationHours}時間</td>
                  <td>{rate.price.toLocaleString()}円</td>
                  <td className={styles.actions}>
                    <button onClick={() => handleEdit(rate)} className={styles.editButton}>編集</button>
                    <button onClick={() => handleDelete(rate.id)} className={styles.deleteButton}>削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <RateForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsModalOpen(false)}
            initialData={editingRate}
            vehicleClasses={vehicleClasses}
          />
        </Modal>
      )}
    </div>
  );
};

export default RatesClientPage;
