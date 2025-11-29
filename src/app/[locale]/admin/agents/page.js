
'use client';
import { useState } from 'react';
import AdminLayout from '../layout';
import styles from './agents.module.css';
import {
    agents as initialAgents,
    agentTransactions as initialAgentTransactions,
    addAgentTransaction,
    updateAgentTransactionStatus,
} from '../../../../lib/mockData';
import { FaHandshake, FaPlus, FaMoneyCheckAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const TransactionForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({ 
        agentId: initialAgents[0]?.id || '', 
        date: new Date().toISOString().slice(0,10), 
        type: 'receivable', 
        description: '', 
        amount: '', 
        dueDate: '', 
        status: 'unpaid'
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ ...formData, amount: parseInt(formData.amount, 10) });
        // Reset form
        setFormData({ agentId: initialAgents[0]?.id || '', date: new Date().toISOString().slice(0,10), type: 'receivable', description: '', amount: '', dueDate: '', status: 'unpaid' });
    };

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    return (
        <form onSubmit={handleSubmit} className={styles.transactionForm}>
            <select name="agentId" value={formData.agentId} onChange={handleChange} required>
                {initialAgents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
            </select>
            <select name="type" value={formData.type} onChange={handleChange}>
                <option value="receivable">売掛金 (請求)</option>
                <option value="payable">買掛金 (支払)</option>
            </select>
            <input type="text" name="description" placeholder="内容 (例: 5月分売上)" value={formData.description} onChange={handleChange} required />
            <input type="number" name="amount" placeholder="金額" value={formData.amount} onChange={handleChange} required />
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
            <button type="submit"><FaPlus /> 新規取引を追加</button>
        </form>
    );
};

export default function AgentsPage() {
    const [transactions, setTransactions] = useState(initialAgentTransactions.sort((a,b) => new Date(b.date) - new Date(a.date)));

    const handleAdd = (newData) => {
        const added = addAgentTransaction(newData);
        setTransactions([added, ...transactions].sort((a,b) => new Date(b.date) - new Date(a.date)));
    };
    
    const handleMarkAsPaid = (txId) => {
        const updated = updateAgentTransactionStatus(txId, 'paid');
        setTransactions(transactions.map(tx => tx.id === txId ? updated : tx));
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1><FaHandshake /> エージェント売掛・買掛管理</h1>
                </div>

                <div className={styles.contentBox}>
                    <h2>新規取引の登録</h2>
                    <TransactionForm onAdd={handleAdd} />
                </div>

                <div className={styles.contentBox}>
                    <h2>取引台帳</h2>
                    <table className={styles.ledgerTable}>
                        <thead>
                            <tr>
                                <th>取引日</th>
                                <th>エージェント</th>
                                <th>種別</th>
                                <th>内容</th>
                                <th>支払期日</th>
                                <th>金額</th>
                                <th>ステータス</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => (
                                <tr key={tx.id} className={tx.status === 'paid' ? styles.paidRow : ''}>
                                    <td>{format(new Date(tx.date), 'yyyy/MM/dd')}</td>
                                    <td>{initialAgents.find(a => a.id === tx.agentId)?.name}</td>
                                    <td><span className={`${styles.badge} ${tx.type === 'receivable' ? styles.receivable : styles.payable}`}>{tx.type === 'receivable' ? '売掛' : '買掛'}</span></td>
                                    <td>{tx.description}</td>
                                    <td>{format(new Date(tx.dueDate), 'yyyy/MM/dd')}</td>
                                    <td className={styles.amountCol}>{tx.amount.toLocaleString()}円</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[tx.status]}`}>
                                            {tx.status === 'unpaid' ? '未精算' : '精算済'}
                                        </span>
                                    </td>
                                    <td>
                                        {tx.status === 'unpaid' && (
                                            <button className={styles.actionButton} onClick={() => handleMarkAsPaid(tx.id)}><FaMoneyCheckAlt /> 精算済にする</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
