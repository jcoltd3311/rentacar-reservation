
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import styles from './vehicle-check.module.css';
import { CheckCircleIcon, ArrowRightIcon, PlusCircleIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { CarIcon } from '@heroicons/react/24/outline';

// Firebase
import { db, storage } from '@/lib/firebase';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";


export default function VehicleCheckPage() {
  const router = useRouter();
  const params = useParams();
  const { bookingId } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [existingScratches, setExistingScratches] = useState([]);
  const [reportedScratches, setReportedScratches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newScratchPosition, setNewScratchPosition] = useState({ x: 0, y: 0 });
  const [scratchDescription, setScratchDescription] = useState('');
  const [scratchPhoto, setScratchPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (!bookingId) return;
    const fetchVehicleData = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, 'bookings', bookingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().scratches) {
          setExistingScratches(docSnap.data().scratches);
        }
      } catch (err) {
        console.error("Error fetching vehicle data:", err);
        setError('既存のキズ情報の読み込みに失敗しました。');
      }
      setIsLoading(false);
    };
    fetchVehicleData();
  }, [bookingId]);

  const handleDiagramClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    setNewScratchPosition({ x, y });
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
        setScratchPhoto(e.target.files[0]);
    }
  };

  const handleSaveScratch = async () => {
    if (!scratchDescription) {
        alert('キズの状態を簡単にご記入ください。');
        return;
    }
    setIsSubmitting(true);
    setError('');

    try {
        let photoURL = '';
        if (scratchPhoto) {
            const photoRef = ref(storage, `scratches/${bookingId}/${Date.now()}_${scratchPhoto.name}`);
            const uploadTask = await uploadBytesResumable(photoRef, scratchPhoto);
            photoURL = await getDownloadURL(uploadTask.ref);
        }

        const newScratch = {
            id: Date.now(), // Use timestamp as a simple unique ID
            x: newScratchPosition.x,
            y: newScratchPosition.y,
            description: scratchDescription,
            photoURL: photoURL,
            isNew: true, // Flag to identify newly reported scratches
        };
        
        const bookingRef = doc(db, 'bookings', bookingId);
        await updateDoc(bookingRef, {
            scratches: arrayUnion(newScratch)
        });

        // Instead of using a separate state, merge with existingScratches to re-render
        setExistingScratches(prev => [...prev, newScratch]);
        closeModal();

    } catch (err) {
        console.error("Error saving scratch:", err);
        setError('キズ情報の保存に失敗しました。もう一度お試しください。');
    } finally {
        setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setScratchDescription('');
    setScratchPhoto(null);
  };

  const handleConfirm = () => {
    router.push(`/checkin/${bookingId}/terms`);
  };

  if (isLoading) {
    return <div className={styles.loadingState}>車両情報を読み込み中...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.checkContainer}>
        <div className={styles.header}>
          <CarIcon className={styles.headerIcon} />
          <h1 className={styles.title}>車両の状態確認</h1>
        </div>
        <p className={styles.subtitle}>
          車両の展開図をご確認いただき、図にないキズを発見した場合は、該当局所をタップしてご報告ください。
        </p>

        <div className={styles.diagramContainer} onClick={handleDiagramClick}>
          <Image src="/images/car-diagram.svg" alt="車両展開図" width={800} height={400} className={styles.diagramImage} />
          {existingScratches.map(s => (
            <div key={s.id} className={`${styles.marker} ${s.isNew ? styles.reportedMarker : ''}`} style={{ left: `${s.x}%`, top: `${s.y}%` }} title={s.description}></div>
          ))}
        </div>

        <div className={styles.legend}>
            <div><span className={`${styles.marker} ${styles.inlineMarker}`}></span> 既存のキズ</div>
            <div><span className={`${styles.marker} ${styles.reportedMarker} ${styles.inlineMarker}`}></span> 新たに報告したキズ</div>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.buttonContainer}>
          <button onClick={handleConfirm} className={styles.confirmButton}>
            <span>確認して次へ</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>

      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
                <h2>新しいキズの報告</h2>
                <button onClick={closeModal} className={styles.closeModalButton}><XMarkIcon className="h-6 w-6" /></button>
            </div>
            <div className={styles.modalBody}>
                <label htmlFor="description">キズの状態</label>
                <textarea 
                    id="description" 
                    value={scratchDescription} 
                    onChange={e => setScratchDescription(e.target.value)} 
                    placeholder="例: 右リアドアに10cmほどの線キズ" />
                
                <label htmlFor="photo">写真を追加 (任意)</label>
                <div className={styles.fileInputContainer}>
                    <PhotoIcon className="h-6 w-6 text-gray-500" />
                    <span>{scratchPhoto ? scratchPhoto.name : 'ファイルを選択'}</span>
                    <input type="file" id="photo" onChange={handleFileChange} accept="image/*" />
                </div>

                <div className={styles.modalActions}>
                    <button onClick={handleSaveScratch} disabled={isSubmitting} className={styles.saveButton}>
                        {isSubmitting ? '保存中...' : 'この内容で保存'}
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
