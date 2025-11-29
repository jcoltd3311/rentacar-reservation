
'use client';

import { useState } from 'react';
import styles from './customers.module.css';
import { customers as initialCustomers } from '../../../../lib/mockData'; // Import from centralized mock data
import { FaExclamationTriangle } from 'react-icons/fa';
import CustomerDetailModal from '../../../../components/CustomerDetailModal'; // To be created

const CustomerStatus = ({ status }) => {
    const statusClass = status === 'ゴールド会員' ? styles.goldStatus : styles.normalStatus;
    return <span className={`${styles.status} ${statusClass}`}>{status}</span>;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [filter, setFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.email.toLowerCase().includes(filter.toLowerCase())
  );

  // Callback to update a customer's data from the modal
  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    setSelectedCustomer(null); // Close modal on update
  };

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h1>顧客管理</h1>
            <input
                type="text"
                placeholder="顧客名、メールアドレスで検索..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={styles.searchInput}
            />
        </div>

        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>顧客名</th>
                        <th>連絡先</th>
                        <th>ステータス</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => (
                        <tr key={customer.id} onClick={() => setSelectedCustomer(customer)} className={styles.rowClickable}>
                            <td>
                                <div className={styles.nameCell}>
                                    {customer.isRestricted && <FaExclamationTriangle className={styles.warningIcon} title="要注意顧客" />}
                                    {customer.name}
                                </div>
                            </td>
                            <td>{customer.email}</td>
                            <td><CustomerStatus status={customer.status} /></td>
                            <td>
                                <button className={styles.detailButton}>詳細を見る</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {selectedCustomer && (
            <CustomerDetailModal
                customer={selectedCustomer}
                onClose={() => setSelectedCustomer(null)}
                onUpdate={handleUpdateCustomer}
            />
        )}
    </div>
  );
}
