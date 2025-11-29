
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { FaTachometerAlt, FaCar, FaUsers, FaCalendarAlt, FaFileContract, FaChartLine, FaWrench, FaSignOutAlt, FaRegClock, FaShieldAlt, FaClipboardCheck, FaMoneyBillWave, FaTicketAlt, FaHandshake, FaUniversity } from 'react-icons/fa';

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <h2>レンタカー管理</h2>
            </div>
            <nav className={styles.nav}>
                <Link href="/admin" className={styles.navLink}><FaTachometerAlt /> ダッシュボード</Link>
                <Link href="/admin/vehicles" className={styles.navLink}><FaCar /> 車両在庫</Link>
                <Link href="/admin/customers" className={styles.navLink}><FaUsers /> 顧客管理</Link>
                <Link href="/admin/bookings" className={styles.navLink}><FaCalendarAlt /> 予約管理</Link>
                <Link href="/admin/schedule" className={styles.navLink}><FaRegClock /> 車両スケジュール</Link>
                <Link href="/admin/inspections" className={styles.navLink}><FaShieldAlt /> 書類・保険管理</Link>
                <Link href="/admin/daily-inspections" className={styles.navLink}><FaClipboardCheck /> 日常点検</Link>
                <Link href="/admin/fees" className={styles.navLink}><FaMoneyBillWave /> 料金設定</Link> 
                <Link href="/admin/coupons" className={styles.navLink}><FaTicketAlt /> クーポン管理</Link> 
                <Link href="/admin/agents" className={styles.navLink}><FaHandshake /> エージェント管理</Link>
                <Link href="/admin/transport-bureau" className={styles.navLink}><FaUniversity /> 陸運支局提出</Link>
                <Link href="/admin/reports" className={styles.navLink}><FaChartLine /> 売上・入出金</Link>
                <Link href="/admin/maintenance" className={styles.navLink}><FaWrench /> 整備記録</Link>
                <Link href="/admin/documents" className={styles.navLink}><FaFileContract /> 書類管理</Link>
            </nav>
            <div className={styles.footer}>
                <Link href="/logout" className={styles.navLink}><FaSignOutAlt /> ログアウト</Link>
            </div>
        </div>
    );
}
