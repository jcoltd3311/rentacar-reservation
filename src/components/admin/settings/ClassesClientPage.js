
'use client';

import styles from './settings.module.css'; 
import { useState } from 'react';

// Placeholder for Modal and Form components
const Modal = ({ children, onClose }) => (
  <div className={styles.modalBackdrop} onClick={onClose}>
    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className={styles.closeButton}>×</button>
      {children}
    </div>
  </div>
);

const VehicleClassForm = ({ onSubmit, onCancel, initialData }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description });
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{initialData ? '車両クラスの編集' : '新しい車両クラスの追加'}</h3>
      <div className={styles.formGroup}>
        <label htmlFor="className">クラス名</label>
        <input id="className" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="例: コンパクト" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="classDescription">説明</label>
        <textarea id="classDescription" value={description} onChange={e => setDescription(e.target.value)} placeholder="例: 小回りの利く小型車クラスです。" rows="3"></textarea>
      </div>
      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>キャンセル</button>
        <button type="submit" className={styles.submitButton}>{initialData ? '更新' : '作成'}</button>
      </div>
    </form>
  );
};


const ClassesClientPage = () => {
  const [classes, setClasses] = useState([
    { id: 'cl_1', name: 'コンパクト', description: '小回りの利く小型車クラスです。' },
    { id: 'cl_2', name: 'SUV', description: 'アウトドアや大人数での利用に適しています。' },
    { id: 'cl_3', name: 'プレミアム', description: '高級感のあるセダンタイプです。' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const handleAdd = () => {
    setEditingClass(null);
    setIsModalOpen(true);
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('この車両クラスを本当に削除しますか？')) {
        setClasses(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleFormSubmit = (data) => {
    if (editingClass) {
        // Update
        setClasses(prev => prev.map(c => c.id === editingClass.id ? { ...c, ...data } : c));
    } else {
        // Create
        setClasses(prev => [...prev, { id: `cl_${Date.now()}`, ...data }]);
    }
    setIsModalOpen(false);
  };

  return (
      <div className={styles.managementContainer}>
        <div className={styles.header}>
          <h1>車両クラス管理</h1>
          <button onClick={handleAdd} className={styles.addButton}>+ 新規追加</button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>クラス名</th>
                <th>説明</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(cls => (
                <tr key={cls.id}>
                  <td>{cls.name}</td>
                  <td>{cls.description}</td>
                  <td className={styles.actions}>
                    <button onClick={() => handleEdit(cls)} className={styles.editButton}>編集</button>
                    <button onClick={() => handleDelete(cls.id)} className={styles.deleteButton}>削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <VehicleClassForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsModalOpen(false)}
            initialData={editingClass}
          />
        </Modal>
      )}
    </div>
  );
};

export default ClassesClientPage;
