
'use client';

import styles from './settings.module.css'; 
import { useState } from 'react';

// Reusable Modal component
const Modal = ({ children, onClose }) => (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        {children}
      </div>
    </div>
  );

// Form for adding/editing an office
const OfficeForm = ({ onSubmit, onCancel, initialData }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [address, setAddress] = useState(initialData?.address || '');
    const [phone, setPhone] = useState(initialData?.phone || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, address, phone });
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{initialData ? '営業所の編集' : '新しい営業所の追加'}</h3>
      <div className={styles.formGroup}>
        <label htmlFor="officeName">営業所名</label>
        <input id="officeName" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="例: 新宿中央口店" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="officeAddress">住所</label>
        <input id="officeAddress" type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="例: 東京都新宿区..." required />
      </div>
       <div className={styles.formGroup}>
        <label htmlFor="officePhone">電話番号</label>
        <input id="officePhone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="例: 03-1234-5678" />
      </div>
      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>キャンセル</button>
        <button type="submit" className={styles.submitButton}>{initialData ? '更新' : '作成'}</button>
      </div>
    </form>
  );
};


const OfficesClientPage = () => {
  const [offices, setOffices] = useState([
    { id: 'off_1', name: '新宿中央口店', address: '東京都新宿区新宿3-1-1', phone: '03-1111-2222' },
    { id: 'off_2', name: '渋谷ハチ公口店', address: '東京都渋谷区道玄坂2-1-1', phone: '03-3333-4444' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState(null);

  const handleAdd = () => {
    setEditingOffice(null);
    setIsModalOpen(true);
  };

  const handleEdit = (office) => {
    setEditingOffice(office);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('この営業所を本当に削除しますか？関連する車両やスタッフの所属も変更する必要があります。')) {
        setOffices(prev => prev.filter(o => o.id !== id));
    }
  };

  const handleFormSubmit = (data) => {
    if (editingOffice) {
        setOffices(prev => prev.map(o => o.id === editingOffice.id ? { ...o, ...data } : o));
    } else {
        setOffices(prev => [...prev, { id: `off_${Date.now()}`, ...data }]);
    }
    setIsModalOpen(false);
  };

  return (
      <div className={styles.managementContainer}>
        <div className={styles.header}>
          <h1>営業所管理</h1>
          <button onClick={handleAdd} className={styles.addButton}>+ 新規追加</button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>営業所名</th>
                <th>住所</th>
                <th>電話番号</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {offices.map(office => (
                <tr key={office.id}>
                  <td>{office.name}</td>
                  <td>{office.address}</td>
                  <td>{office.phone}</td>
                  <td className={styles.actions}>
                    <button onClick={() => handleEdit(office)} className={styles.editButton}>編集</button>
                    <button onClick={() => handleDelete(office.id)} className={styles.deleteButton}>削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <OfficeForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsModalOpen(false)}
            initialData={editingOffice}
          />
        </Modal>
      )}
    </div>
  );
};

export default OfficesClientPage;
