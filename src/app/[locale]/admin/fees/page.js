
'use client';
import { useState } from 'react';
import AdminLayout from '../layout';
import styles from './fees.module.css';
import { feeSettings as initialSettings, updateFeeSettings } from '../../../../lib/mockData';
import { FaCar, FaPlus, FaTools, FaFileInvoiceDollar, FaPercent, FaRegCalendarAlt, FaCog } from 'react-icons/fa';

// A generic card component for each setting type
const SettingCard = ({ title, icon, children }) => (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            {icon}
            <h3>{title}</h3>
        </div>
        <div className={styles.cardBody}>{children}</div>
    </div>
);

export default function FeesPage() {
    const [settings, setSettings] = useState(initialSettings);
    const [isEditing, setIsEditing] = useState(null); // Tracks which item is being edited

    const handleUpdate = (category, key, value) => {
      // This is a simplified update handler. A real app would need a more robust state management.
      const newSettings = JSON.parse(JSON.stringify(settings)); // Deep copy
      if(category === 'classPricing') newSettings[category][key].rate = value;
      // Add other update logic here for different categories...
      setSettings(newSettings);
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <h1><FaCog /> 料金設定管理</h1>
                
                {/* Vehicle Class Pricing */}
                <SettingCard title="車両クラス別料金" icon={<FaCar />}>
                    <div className={styles.grid}>
                        {Object.entries(settings.classPricing).map(([key, value]) => (
                            <div key={key} className={styles.gridItem}>
                                <span>{value.name}</span>
                                <input type="number" value={value.rate} onChange={e => handleUpdate('classPricing', key, e.target.value)} />
                                <span>円 / {value.label}</span>
                            </div>
                        ))}
                    </div>
                </SettingCard>

                {/* Options Pricing */}
                <SettingCard title="オプション料金" icon={<FaPlus />}>
                    <div className={styles.list}>
                        {settings.options.map(opt => (
                            <div key={opt.id} className={styles.listItem}>
                                <span>{opt.name}</span>
                                <input type="number" value={opt.rate} />
                                <span>円 / {opt.label}</span>
                            </div>
                        ))}
                    </div>
                </SettingCard>

                <div className={styles.settingsRow}>
                    {/* NOC & Waiver */}
                    <SettingCard title="補償・ポリシー関連" icon={<FaFileInvoiceDollar />}>
                        <div className={styles.subSection}>
                            <h4>NOC（営業補償）</h4>
                            <div className={styles.listItemWide}><span>{settings.noc.drivable.name}</span><input type="number" value={settings.noc.drivable.rate} /><span>円</span></div>
                            <div className={styles.listItemWide}><span>{settings.noc.undrivable.name}</span><input type="number" value={settings.noc.undrivable.rate} /><span>円</span></div>
                        </div>
                        <div className={styles.subSection}>
                            <h4>免責補償</h4>
                            <div className={styles.listItemWide}><span>加入料</span><input type="number" value={settings.waiver.rate} /><span>円 / {settings.waiver.label}</span></div>
                        </div>
                    </SettingCard>
                    
                    {/* Discounts & Tax */}
                    <SettingCard title="割引・税率" icon={<FaPercent />}>
                        <div className={styles.subSection}>
                            <h4>キャンペーン・割引</h4>
                            {settings.discounts.map(d => (
                                <div key={d.id} className={styles.listItemWide}>
                                    <span>{d.name}</span>
                                    <div>
                                        <input type="number" value={d.rate} style={{width: '80px'}} />
                                        <span>{d.type === 'percentage' ? '%' : '円'}</span>
                                        <label className={styles.toggle}><input type="checkbox" checked={d.enabled} /> 有効</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <div className={styles.subSection}>
                            <h4>消費税率</h4>
                            <div className={styles.listItemWide}><span>現在の税率</span><input type="number" value={settings.salesTax.rate} /><span>%</span></div>
                        </div>
                    </SettingCard>
                </div>

                 {/* Cancellation Policy */}
                <SettingCard title="キャンセルポリシー" icon={<FaRegCalendarAlt />}>
                     <div className={styles.cancellationGrid}>
                        {settings.cancellationPolicy.map(p => (
                           <div key={p.days} className={styles.gridItem}>
                               <span>{p.label}</span>
                               <input type="number" value={p.rate} />
                               <span>%</span>
                           </div>
                        ))}
                    </div>
                </SettingCard>

                 <div className={styles.saveArea}>
                    <button className={styles.saveButton}>すべての変更を保存</button>
                </div>
            </div>
        </AdminLayout>
    );
}
