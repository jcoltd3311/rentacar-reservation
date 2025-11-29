
'use client';
import { useState, useRef } from 'react';
import AdminLayout from '../layout';
import styles from './inspections.module.css';
import { vehicles as initialVehicles } from '../../../../lib/mockData';
import { FaCar, FaShieldAlt, FaIdCard, FaCamera, FaUpload } from 'react-icons/fa';

const VehicleSelector = ({ vehicles, selectedVehicle, onSelect }) => (
    <div className={styles.selectorContainer}>
        <label htmlFor="vehicle-select">車両を選択:</label>
        <select id="vehicle-select" value={selectedVehicle?.id || ''} onChange={(e) => onSelect(vehicles.find(v => v.id === e.target.value))}>
            <option value="" disabled>選択してください</option>
            {vehicles.map(v => <option key={v.id} value={v.id}>{v.name} ({v.registration})</option>)}
        </select>
    </div>
);

const DetailForm = ({ title, data, onUpdate, onScan, icon }) => {
    const fileInputRef = useRef(null);

    const handleScanClick = () => {
        // This triggers the hidden file input
        fileInputRef.current.click();
    };

    const handleFileSelected = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(`'${file.name}' selected for ${title}. Ready for OCR processing.`);
            // In a real implementation, you would send this file to your OCR backend.
            // For now, we can simulate an update with placeholder data.
            alert(`「${file.name}」をスキャン用に選択しました。\n（注: これはUIデモです。実際のOCR処理は行われません。）`);
        }
    };

    return (
        <form className={styles.form}>
             <div className={styles.formHeader}>
                <h3>{icon} {title}</h3>
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
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label>満了日</label>
                    <input type="date" value={data.expiryDate || data.dueDate || ''} onChange={e => onUpdate('expiryDate', e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label>ステータス</label>
                    <select value={data.status} onChange={e => onUpdate('status', e.target.value)}>
                        <option value="完了">完了</option>
                        <option value="実施中">実施中</option>
                        <option value="要実施">要実施</option>
                    </select>
                </div>
            </div>
             { (title !== '車検情報') &&
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>保険会社</label>
                        <input type="text" value={data.company || ''} onChange={e => onUpdate('company', e.target.value)} />
                    </div>
                     <div className={styles.formGroup}>
                        <label>証券番号</label>
                        <input type="text" value={data.policyNumber || ''} onChange={e => onUpdate('policyNumber', e.target.value)} />
                    </div>
                </div>
            }
            <div className={styles.formActions}>
                <button type="submit" className={styles.submitButton} onClick={e => e.preventDefault()}>保存</button>
                <button type="button" className={styles.uploadButton}><FaUpload /> 関連書類をアップロード</button>
            </div>
        </form>
    );
};

export default function InspectionsPage() {
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
    const [activeTab, setActiveTab] = useState('inspection');

    const handleUpdate = (tab, field, value) => {
        const updatedVehicle = { 
            ...selectedVehicle, 
            [tab]: { ...selectedVehicle[tab], [field]: value }
        };
        setSelectedVehicle(updatedVehicle);

        // Update the main list
        const updatedVehicles = vehicles.map(v => v.id === selectedVehicle.id ? updatedVehicle : v);
        setVehicles(updatedVehicles);
        // In a real app, you'd also make an API call here to persist the changes.
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <h1><FaShieldAlt /> 書類・保険管理</h1>
                <VehicleSelector vehicles={vehicles} selectedVehicle={selectedVehicle} onSelect={setSelectedVehicle} />

                {selectedVehicle && (
                    <div className={styles.detailsContainer}>
                        <div className={styles.tabContainer}>
                            <button onClick={() => setActiveTab('inspection')} className={activeTab === 'inspection' ? styles.activeTab : ''}><FaCar /> 車検情報</button>
                            <button onClick={() => setActiveTab('liabilityInsurance')} className={activeTab === 'liabilityInsurance' ? styles.activeTab : ''}><FaIdCard /> 自賠責保険</button>
                            <button onClick={() => setActiveTab('voluntaryInsurance')} className={activeTab === 'voluntaryInsurance' ? styles.activeTab : ''}><FaShieldAlt /> 任意保険</button>
                        </div>

                        <div className={styles.tabContent}>
                            {activeTab === 'inspection' && 
                                <DetailForm title="車検情報" data={selectedVehicle.inspection} onUpdate={(f,v) => handleUpdate('inspection', f, v)} onScan={() => {}} icon={<FaCar />} />}
                            
                            {activeTab === 'liabilityInsurance' && 
                                <DetailForm title="自賠責保険" data={selectedVehicle.liabilityInsurance} onUpdate={(f,v) => handleUpdate('liabilityInsurance', f, v)} onScan={() => {}} icon={<FaIdCard />} />}

                            {activeTab === 'voluntaryInsurance' && 
                                <DetailForm title="任意保険" data={selectedVehicle.voluntaryInsurance} onUpdate={(f,v) => handleUpdate('voluntaryInsurance', f, v)} onScan={() => {}} icon={<FaShieldAlt />} />}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
