
'use client';
import { useState } from 'react';
import AdminLayout from '../layout';
import styles from './transport-bureau.module.css';
import {
    offices,
    landTransportReports as initialReports,
    generateReport,
    markAsSubmitted,
    currentUser
} from '../../../../lib/mockData';
import { FaUniversity, FaFileSignature, FaPrint, FaPaperPlane } from 'react-icons/fa';
import { format } from 'date-fns';

const ReportGenerator = ({ onGenerate }) => {
    const [reportType, setReportType] = useState('貸渡実績報告書');
    const [period, setPeriod] = useState('2024年度 第2四半期 (7月-9月)');

    const handleGenerate = () => {
        // In a real app, this would involve complex data fetching and PDF generation
        // Here, we just create a record.
        const newReportData = {
            reportType,
            period,
            officeId: offices[0].id, // Assuming a single office for simplicity
            creationDate: new Date().toISOString().slice(0, 10),
        };
        onGenerate(newReportData);
        alert(`${reportType}（${period}）が生成されました。台帳で確認してください。`);
    };

    return (
        <div className={styles.generatorBox}>
            <h3>新規報告書生成</h3>
            <select value={reportType} onChange={e => setReportType(e.target.value)}>
                <option>貸渡実績報告書</option>
                <option>配置車両数一覧表</option>
            </select>
            <input type="text" value={period} onChange={e => setPeriod(e.target.value)} placeholder="対象期間 (例: 2024年度 第2四半期)"/>
            <button onClick={handleGenerate}><FaFileSignature /> 生成</button>
        </div>
    );
};

export default function TransportBureauPage() {
    const [reports, setReports] = useState(initialReports.sort((a,b) => new Date(b.creationDate) - new Date(a.creationDate)));

    const handleGenerateReport = (newReportData) => {
        const generated = generateReport(newReportData);
        setReports([generated, ...reports].sort((a,b) => new Date(b.creationDate) - new Date(a.creationDate)));
    };

    const handleMarkAsSubmitted = (reportId) => {
        const submitterName = currentUser.name;
        const updated = markAsSubmitted(reportId, submitterName);
        setReports(reports.map(r => r.id === reportId ? updated : r));
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1><FaUniversity /> 陸運支局 提出物管理</h1>
                </div>

                <div className={styles.contentBox}>
                    <ReportGenerator onGenerate={handleGenerateReport} />
                </div>

                <div className={styles.contentBox}>
                    <h2>提出履歴管理台帳</h2>
                    <table className={styles.reportTable}>
                        <thead>
                            <tr>
                                <th>作成日</th>
                                <th>報告書名</th>
                                <th>対象期間</th>
                                <th>ステータス</th>
                                <th>提出日</th>
                                <th>提出者</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(report => (
                                <tr key={report.id}>
                                    <td>{format(new Date(report.creationDate), 'yyyy/MM/dd')}</td>
                                    <td>{report.reportType}</td>
                                    <td>{report.period}</td>
                                    <td><span className={`${styles.status} ${styles[report.status]}`}>{report.status === 'pending' ? '未提出' : '提出済'}</span></td>
                                    <td>{report.submissionDate ? format(new Date(report.submissionDate), 'yyyy/MM/dd') : '-'}</td>
                                    <td>{report.submittedBy || '-'}</td>
                                    <td className={styles.actions}>
                                        <button className={styles.printButton}><FaPrint /> 印刷</button>
                                        {report.status === 'pending' && (
                                            <button className={styles.submitButton} onClick={() => handleMarkAsSubmitted(report.id)}><FaPaperPlane /> 提出済にする</button>
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
