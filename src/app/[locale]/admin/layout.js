
import styles from './adminLayout.module.css';
import Link from 'next/link';

const SidebarIcon = ({ name }) => <span className={styles.icon}>{name.charAt(0)}</span>;

export default function AdminLayout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/admin/dashboard" className={styles.logo}>
            RentalCar MS
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/admin/dashboard"><SidebarIcon name="Dashboard" /> ダッシュボード</Link></li>
            <li><Link href="/admin/vehicles"><SidebarIcon name="Vehicles" /> 車両在庫管理</Link></li>
            <li><Link href="/admin/customers"><SidebarIcon name="Customers" /> 顧客管理</Link></li>
            <li><Link href="/admin/bookings"><SidebarIcon name="Bookings" /> 予約管理</Link></li>
            <li><Link href="/admin/schedule"><SidebarIcon name="Schedule" /> 車両スケジュール</Link></li>
            <li><Link href="/admin/reports"><SidebarIcon name="Reports" /> 売上・分析</Link></li>
            <li><Link href="/admin/documents"><SidebarIcon name="Documents" /> 書類管理</Link></li>
            <li><Link href="/admin/settings"><SidebarIcon name="Settings" /> 各種設定</Link></li>
          </ul>
        </nav>
      </aside>
      <main className={styles.pageContent}>
        {children}
      </main>
    </div>
  );
}
