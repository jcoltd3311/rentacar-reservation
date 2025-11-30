
'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import AdminLayout from '../layout';
import styles from './daily-inspections.module.css';
import { vehicles, dailyInspections as initialInspections, defaultInspectionItems, addDailyInspection, staff, currentUser } from '../../../../lib/mockData';
import { FaPlus, FaCheckCircle, FaTimesCircle, FaPrint, FaEnvelope, FaQrcode, FaCamera, FaClipboardCheck } from 'react-icons/fa';
import { format } from 'date-fns';

const InspectorSelector = ({ selected, onChange, onCustomChange }) => {
    const [customInspector, setCustomInspector] = useState('');
    const isCustom = selected === 'other';

    useEffect(() => {
        if (isCustom) {
            onCustomChange(customInspector);
        } else {
            onChange(selected);
        }
    }, [selected, customInspector, isCustom, onChange, onCustomChange]);

    return (
        <div className={styles.inspectorSelector}>
            <select value={selected} onChange={e => onChange(e.target.value)}>
                <optgroup label="スタッフ">
                    {staff.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </optgroup>
                <optgroup label="その他">
                    <option value="other">業者・その他（手入力）</option>
                </optgroup>
            </select>
            {isCustom && (
                <input 
                    type="text"
                    value={customInspector}
                    onChange={e => setCustomInspector(e.target.value)}
                    placeholder="業者名などを入力"
                    className={styles.customInspectorInput}
                />
            )}
        </div>
    );
};


const InspectionForm = ({ vehicle, onSave, onCancel }) => {
    const [items, setItems] = useState(defaultInspectionItems.map(item => ({ ...item, status: 'OK', notes: '' })));
    const [customItem, setCustomItem] = useState('');
    const [inspector, setInspector] = useState(currentUser.name);
    const [customInspector, setCustomInspector] = useState('');
    const fileInputRef = useRef(null);

    const handleScanClick = () => {
        fileInputRef.current.click();
    };

    const handleFileSelected = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(`'${file.name}' selected for OCR. Ready for processing.`);
            // Here you would typically send the file to an OCR service.
            // For this demo, we'll just show an alert.
            alert(`「${file.name}」をスキャン用に選択しました。\n（注: これはUIデモです。実際のOCR処理は行われません。）`);
        }
    };

    const handleStatusChange = (index, status) => {
        const newItems = [...items];
        newItems[index].status = status;
        setItems(newItems);
    };

    const handleNotesChange = (index, notes) => {
        const newItems = [...items];
        newItems[index].notes = notes;
        setItems(newItems);
    };

    const handleAddCustomItem = () => {
        if (customItem.trim()) {
            const newItem = { id: `custom-${Date.now()}`, label: customItem.trim(), status: 'OK', notes: '' };
            setItems([...items, newItem]);
            setCustomItem('');
        }
    };

    const handleSave = () => {
        const finalInspector = inspector === 'other' ? customInspector : inspector;
        if (!finalInspector.trim()) {
            alert('点検者を入力してください。');
            return;
        }
        const newInspection = {
            vehicleId: vehicle.id,
            date: new Date().toISOString(),
            inspector: finalInspector,
            items: items.map(({id, label, status, notes}) => ({itemId: id, name: label, status, notes})),
        };
        onSave(newInspection);
    };

    return (
        <div className={styles.formContainer}>
             <div className={styles.formHeader}>
                <h3>新規点検記録 ({vehicle.name})</h3>
                <button type="button" className={styles.scanButton} onClick={handleScanClick}>
                    <FaCamera /> スキャンして自動入力
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelected}
                    style={{ display: 'none' }} 
                    accept="image/*,application/pdf"
                />
            </div>

            <div className={styles.formGroup}>
                <label>点検実施者</label>
                 <InspectorSelector 
                    selected={inspector}
                    onChange={setInspector}
                    onCustomChange={setCustomInspector}
                />
            </div>
            <div className={styles.itemsGrid}>
                {items.map((item, index) => (
                    <div key={item.id} className={styles.itemRow}>
                        <div className={styles.itemName}>{item.label}</div>
                        <div className={styles.itemStatus}>
                            <button onClick={() => handleStatusChange(index, 'OK')} className={`${styles.statusBtn} ${item.status === 'OK' ? styles.ok : ''}`}><FaCheckCircle /> OK</button>
                            <button onClick={() => handleStatusChange(index, 'NG')} className={`${styles.statusBtn} ${item.status === 'NG' ? styles.ng : ''}`}><FaTimesCircle /> NG</button>
                        </div>
                        <div className={styles.itemNotes}>
                            <input type="text" value={item.notes} onChange={e => handleNotesChange(index, e.target.value)} placeholder="(特記事項があれば入力)" />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.customItemContainer}>
                <input type="text" value={customItem} onChange={e => setCustomItem(e.target.value)} placeholder="追加の点検項目を入力" />
                <button onClick={handleAddCustomItem}>項目を追加</button>
            </div>
            <div className={styles.formActions}>
                <button onClick={handleSave} className={styles.saveBtn}>記録を保存</button>
                <button onClick={onCancel} className={styles.cancelBtn}>キャンセル</button>
            </div>
        </div>
    );
}

export default function DailyInspectionsPage() {
    const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
    const [inspections, setInspections] = useState(initialInspections);
    const [isCreating, setIsCreating] = useState(false);

    const vehicleInspections = useMemo(() => 
        inspections.filter(i => i.vehicleId === selectedVehicle.id).sort((a,b) => new Date(b.date) - new Date(a.date))
    , [selectedVehicle, inspections]);

    const handleSaveInspection = (newInspection) => {
        addDailyInspection(newInspection);
        setInspections(prev => [newInspection, ...prev].sort((a,b) => new Date(b.date) - new Date(a.date)));
        setIsCreating(false);
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <h1><FaClipboardCheck /> 日常点検管理</h1>
                <div className={styles.toolbar}>
                     <div className={styles.selectorContainer}>
                        <label htmlFor="vehicle-select">車両を選択:</label>
                        <select id="vehicle-select" value={selectedVehicle.id} onChange={(e) => setSelectedVehicle(vehicles.find(v => v.id === e.target.value))}>
                            {vehicles.map(v => <option key={v.id} value={v.id}>{v.name} ({v.registration})</option>)}
                        </select>
                    </div>
                    {!isCreating && <button className={styles.newButton} onClick={() => setIsCreating(true)}><FaPlus /> 新規点検を作成</button>}
                </div>

                {isCreating ? (
                    <InspectionForm vehicle={selectedVehicle} onSave={handleSaveInspection} onCancel={() => setIsCreating(false)} />
                ) : (
                    <div className={styles.historyContainer}>
                        <h3>点検履歴: {selectedVehicle.name}</h3>
                        {vehicleInspections.length > 0 ? (
                            <ul className={styles.historyList}>
                                {vehicleInspections.map(insp => (
                                    <li key={insp.id} className={styles.historyItem}>
                                        <div className={styles.historyHeader}>
                                            <span>点検日: <strong>{format(new Date(insp.date), 'yyyy年MM月dd日 HH:mm')}</strong></span>
                                            <span>点検者: <strong>{insp.inspector}</strong></span>
                                            <div className={styles.historyActions}>
                                                <button title="QRコード表示"><FaQrcode /></button>
                                                <button title="メールで送信"><FaEnvelope /></button>
                                                <button title="印刷"><FaPrint /></button>
                                            </div>
                                        </div>
                                        <ul className={styles.historyDetails}>
                                            {insp.items.map((item, index) => (
                                                <li key={index} className={item.status === 'NG' ? styles.detailNg : ''}>
                                                    <span>{item.name}: <strong>{item.status}</strong></span>
                                                    {item.notes && <p>メモ: {item.notes}</p>}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>{selectedVehicle.name} の点検履歴はまだありません。</p>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
