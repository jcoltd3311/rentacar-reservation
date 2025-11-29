
import Link from 'next/link';
import { Briefcase, Car, Users, BadgePercent, Building } from 'lucide-react'; // Changed DollarSign to BadgePercent
import styles from '@/components/admin/settings/settings.module.css';
import AdminLayout from '../layout';

const settingsOptions = [
  {
    href: '/admin/settings/offices',
    icon: Building,
    title: '営業所設定',
    description: '営業所の情報を管理します。'
  },
  {
    href: '/admin/settings/classes',
    icon: Car,
    title: '車両クラス管理',
    description: '車両の種類や基本設定を管理します。'
  },
  {
    href: 'src/app/[locale]/admin/settings/rates',
    icon: BadgePercent, // Changed icon
    title: '基本料金管理',
    description: '車両クラスごとの料金プランを設定します。'
  },
  {
    href: 'src/app/[locale]/admin/settings/staff',
    icon: Users,
    title: 'スタッフ管理',
    description: 'スタッフアカウントや権限を管理します。'
  },
  {
    href: 'src/app/[locale]/admin/settings/company',
    icon: Briefcase,
    title: '会社情報',
    description: '運営会社の基本情報を設定します。'
  },
];

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className={styles.settingsContainer}>
        <header>
          <h1 className={styles.title}>各種設定</h1>
          <p className={styles.subtitle}>システムの基本設定を管理します。</p>
        </header>
        <main className={styles.grid}>
          {settingsOptions.map((option) => (
            <Link href={option.href} key={option.href} className={styles.cardLink}>
              <div className={styles.card}>
                <option.icon className={styles.icon} />
                <div className={styles.cardContent}>
                  <h2>{option.title}</h2>
                  <p>{option.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </AdminLayout>
  );
}
