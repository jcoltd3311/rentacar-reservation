
'use client';

import { useState } from 'react';
import styles from './documents.module.css';

// Sample Data
const sampleDocuments = [
  { id: 'DOC001', bookingId: 'BK001', customerName: '山田 太郎', type: '契約書', status: '署名済', createdAt: '2023-10-27' },
  { id: 'DOC002', bookingId: 'BK001', customerName: '山田 太郎', type: '領収書', status: '発行済', createdAt: '2023-10-28' },
  { id: 'DOC003', bookingId: 'BK002', customerName: '鈴木 花子', type: '契約書', status: '未署名', createdAt: '2023-10-29' },
];

const DocumentStatus = ({ status }) => {
    const statusClass = status === '署名済' || status === '発行済' ? styles.signed : styles.unsigned;
    return <span className={`${styles.status} ${statusClass}`}>{status}</span>;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(sampleDocuments);
  const [filter, setFilter] = useState('');

  const filteredDocuments = documents.filter(doc => 
    doc.bookingId.toLowerCase().includes(filter.toLowerCase()) ||
    doc.customerName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h1>書類管理</h1>
            <input 
                type="text"
                placeholder="予約IDまたは顧客名で検索..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={styles.searchInput}
            />
        </div>

        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>書類ID</th>
                        <th>予約ID</th>
                        <th>顧客名</th>
                        <th>種類</th>
                        <th>ステータス</th>
                        <th>作成日</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDocuments.map(doc => (
                        <tr key={doc.id}>
                            <td>{doc.id}</td>
                            <td>{doc.bookingId}</td>
                            <td>{doc.customerName}</td>
                            <td>{doc.type}</td>
                            <td><DocumentStatus status={doc.status} /></td>
                            <td>{doc.createdAt}</td>
                            <td className={styles.actions}>
                                <button className={styles.actionButton}>詳細</button>
                                <button className={styles.actionButton}>共有</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
