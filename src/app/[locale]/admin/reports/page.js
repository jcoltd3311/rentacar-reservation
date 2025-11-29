
'use client';
import { useState } from 'react';
import AdminLayout from '../layout';
import styles from './reports.module.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';
import { transactions as initialTransactions, addTransaction } from '../../../../lib/mockData';
import { FaChartBar, FaBook, FaPlus } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- Mock Chart Data (from previous version) ---
const chartData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [{
    label: '売上 (万円)',
    data: [65, 59, 80, 81, 56, 55],
    backgroundColor: 'rgba(54, 162, 235, 0.6)',
  }],
};

// --- Transaction Form Component ---
const TransactionForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({ date: new Date().toISOString().slice(0,10), type: 'expense', category: '', amount: '', memo: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ ...formData, amount: parseInt(formData.amount, 10) });
        setFormData({ date: new Date().toISOString().slice(0,10), type: 'expense', category: '', amount: '', memo: '' });
    };
    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const expenseCategories = ['整備費用', '燃料費', '広告宣伝費', '消耗品費', '地代家賃', 'エージェント手数料', 'その他経費'];
    const incomeCategories = ['レンタル売上', 'キャンセル料', 'エージェント入金', '雑収入'];

    return (
        <form onSubmit={handleSubmit} className={styles.transactionForm}>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <select name="type" value={formData.type} onChange={handleChange}>
                <option value="expense">出金</option>
                <option value="income">入金</option>
            </select>
            <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">カテゴリを選択</option>
                {(formData.type === 'income' ? incomeCategories : expenseCategories).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input type="number" name="amount" placeholder="金額" value={formData.amount} onChange={handleChange} required />
            <input type="text" name="memo" placeholder="メモ" value={formData.memo} onChange={handleChange} />
            <button type="submit"><FaPlus /> 追加</button>
        </form>
    );
};

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState('ledger'); // Default to new ledger tab
    const [transactions, setTransactions] = useState(initialTransactions);

    const handleAddTransaction = (newTx) => {
        const added = addTransaction(newTx);
        setTransactions([added, ...transactions]);
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.tabContainer}>
                    <button onClick={() => setActiveTab('analysis')} className={activeTab === 'analysis' ? styles.activeTab : ''}><FaChartBar /> 売上分析</button>
                    <button onClick={() => setActiveTab('ledger')} className={activeTab === 'ledger' ? styles.activeTab : ''}><FaBook /> 入出金台帳</button>
                </div>

                {activeTab === 'analysis' && (
                    <div className={styles.content}>
                         <h1>売上レポート</h1>
                         <div className={styles.chartContainer}><Bar data={chartData} /></div>
                    </div>
                )}

                {activeTab === 'ledger' && (
                    <div className={styles.content}>
                        <h1>入出金台帳</h1>
                        <TransactionForm onAdd={handleAddTransaction} />
                        <div className={styles.ledgerTableContainer}>
                            <table className={styles.ledgerTable}>
                                <thead>
                                    <tr><th>日付</th><th>種別</th><th>カテゴリ</th><th>メモ</th><th>金額</th></tr>
                                </thead>
                                <tbody>
                                    {transactions.map(tx => (
                                        <tr key={tx.id}>
                                            <td>{tx.date}</td>
                                            <td><span className={`${styles.badge} ${tx.type === 'income' ? styles.income : styles.expense}`}>{tx.type === 'income' ? '入金' : '出金'}</span></td>
                                            <td>{tx.category}</td>
                                            <td>{tx.memo}</td>
                                            <td className={styles.amountCol}>{tx.amount.toLocaleString()}円</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
