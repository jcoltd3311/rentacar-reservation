
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

// Form for adding/editing a staff member
const StaffForm = ({ onSubmit, onCancel, initialData, offices }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [officeId, setOfficeId] = useState(initialData?.officeId || (offices[0]?.id || ''));
    const [role, setRole] = useState(initialData?.role || 'staff');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, officeId, role });
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{initialData ? 'スタッフ情報の編集' : '新しいスタッフの追加'}</h3>
      <div className={styles.formGroup}>
        <label htmlFor="staffName">氏名</label>
        <input id="staffName" type="text" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="staffEmail">メールアドレス（ログインID）</label>
        <input id="staffEmail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="staffOffice">所属営業所</label>
        <select id="staffOffice" value={officeId} onChange={e => setOfficeId(e.target.value)} required>
          {offices.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="staffRole">権限</label>
        <select id="staffRole" value={role} onChange={e => setRole(e.target.value)} required>
          <option value="staff">スタッフ</option>
          <option value="admin">管理者</option>
        </select>
      </div>
      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>キャンセル</button>
        <button type="submit" className={styles.submitButton}>{initialData ? '更新' : '作成'}</button>
      </div>
    </form>
  );
};


const StaffClientPage = () => {
  const [offices] = useState([
    { id: 'off_1', name: '新宿中央口店' },
    { id: 'off_2', name: '渋谷ハチ公口店' },
  ]);

  const [staff, setStaff] = useState([
    { id: 'st_1', name: '管理者 太郎', email: 'admin@example.com', officeId: 'off_1', role: 'admin' },
    { id: 'st_2', name: '店舗スタッフ 次郎', email: 'staff@example.com', officeId: 'off_2', role: 'staff' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  
  const getOfficeName = (officeId) => offices.find(o => o.id === officeId)?.name || 'N/A';

  const handleAdd = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const handleEdit = (staffMember) => {
    setEditingStaff(staffMember);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('このスタッフを本当に削除しますか？')) {
        setStaff(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleFormSubmit = (data) => {
    if (editingStaff) {
        setStaff(prev => prev.map(s => s.id === editingStaff.id ? { ...s, ...data } : s));
    } else {
        setStaff(prev => [...prev, { id: `st_${Date.now()}`, ...data }]);
    }
    setIsModalOpen(false);
  };

  return (
      <div className={styles.managementContainer}>
        <div className={styles.header}>
          <h1>スタッフ管理</h1>
          <button onClick={handleAdd} className={styles.addButton}>+ 新規追加</button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>氏名</th>
                <th>メールアドレス</th>
                <th>所属営業所</th>
                <th>権限</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{getOfficeName(s.officeId)}</td>
                  <td>{s.role === 'admin' ? '管理者' : 'スタッフ'}</td>
                  <td className={styles.actions}>
                    <button onClick={() => handleEdit(s)} className={styles.editButton}>編集</button>
                    <button onClick={() => handleDelete(s.id)} className={styles.deleteButton}>削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <StaffForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsModalOpen(false)}
            initialData={editingStaff}
            offices={offices}
          />
        </Modal>
      )}
    </div>
  );
};

export default StaffClientPage;
