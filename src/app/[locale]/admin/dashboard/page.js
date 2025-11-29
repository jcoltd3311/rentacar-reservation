
import AdminLayout from '../layout';
import styles from './dashboard.module.css';

// Placeholder for icons
const CardIcon = ({ children }) => <div className={styles.cardIcon}>{children}</div>;

const Dashboard = () => {
  // Placeholder data
  const summary = {
    rentalsDueOut: 5,
    returnsDueIn: 3,
  };

  const alerts = [
    { id: 1, type: 'error', message: '車両番号 (品川 300 あ 12-34) の車検が30日後に切れます。' },
    { id: 2, type: 'warning', message: '顧客 (田中 太郎様) の利用料金に未払いがあります。' },
    { id: 3, type: 'info', message: '新しい予約がWEBから入りました。' },
  ];

  return (
    <AdminLayout>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.title}>ダッシュボード</h1>

        <div className={styles.grid}>
          {/* Today's Schedule */}
          <div className={`${styles.card} ${styles.summaryCard}`}>
            <CardIcon>📅</CardIcon>
            <div className={styles.cardContent}>
              <h3>本日の予定</h3>
              <p>貸出予定: <strong>{summary.rentalsDueOut}</strong> 件</p>
              <p>返却予定: <strong>{summary.returnsDueIn}</strong> 件</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`${styles.card} ${styles.actionsCard}`}>
             <CardIcon>⚡</CardIcon>
            <div className={styles.cardContent}>
              <h3>クイック操作</h3>
              <button className={styles.actionButton}>新規予約作成</button>
              <button className={styles.actionButton}>車両貸出処理</button>
            </div>
          </div>

          {/* Alerts */}
          <div className={`${styles.card} ${styles.alertsCard}`}>
            <div className={styles.cardHeader}>
              <h3>要対応アラート</h3>
            </div>
            <ul className={styles.alertList}>
              {alerts.map(alert => (
                <li key={alert.id} className={`${styles.alertItem} ${styles[alert.type]}`}>
                  <span className={styles.alertIcon}>
                    {alert.type === 'error' && '🔥'}
                    {alert.type === 'warning' && '⚠️'}
                    {alert.type === 'info' && 'ℹ️'}
                  </span>
                  {alert.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
