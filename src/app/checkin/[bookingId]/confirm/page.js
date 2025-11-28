
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import styles from './confirm.module.css';
import { PencilSquareIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

// Firebase
import { db } from '../../../lib/firebase'; // Corrected path
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Dummy data for initial state if needed
const initialOcrData = {
  name: '',
  licenseNumber: '',
};

export default function ConfirmPage() {
  const router = useRouter();
  const params = useParams();
  const { bookingId } = params;

  const [formData, setFormData] = useState(initialOcrData);
  const [licenseImage, setLicenseImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(true); // Default to editing mode

  useEffect(() => {
    if (!bookingId) return;

    const fetchBookingData = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, 'bookings', bookingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.customerName || '', // Use customerName from booking
            licenseNumber: data.licenseNumber || '',
          });
          setLicenseImage(data.licenseImageUrl || '');
        } else {
          setError('予約データが見つかりません。');
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        setError('データの読み込み中にエラーが発生しました。');
      }
      setIsLoading(false);
    };

    fetchBookingData();
  }, [bookingId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError('');

    try {
        const bookingRef = doc(db, "bookings", bookingId);
        await updateDoc(bookingRef, {
            licenseName: formData.name,
            licenseNumber: formData.licenseNumber,
        });
        
        router.push(`/checkin/${bookingId}/vehicle-check`);

    } catch (err) {
        console.error("Error updating document:", err);
        setError('情報の更新中にエラーが発生しました。');
        setIsUpdating(false);
    }
  };

  if (isLoading) {
      return <div className={styles.loadingState}>読み込み中...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.confirmBox}>
        <div className={styles.header}>
          <PencilSquareIcon className={`${styles.headerIcon}`} />
          <h1 className={styles.title}>読み取り結果の確認・修正</h1>
        </div>
        <p className={styles.subtitle}>
          免許証から読み取った情報です。誤りがある場合は修正してください。
        </p>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.imageSection}>
            <h2 className={styles.sectionTitle}>スキャンした免許証</h2>
            {licenseImage ? (
                <Image src={licenseImage} alt="スキャンされた免許証" width={400} height={250} className={styles.licenseImage} />
            ) : (
                <div className={styles.noImage}>画像がありません</div>
            )}
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>読み取り結果</h2>
            <div className={styles.inputField}>
                <label htmlFor="name">氏名</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div className={styles.inputField}>
                <label htmlFor="licenseNumber">免許証番号</label>
                <input type="text" id="licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} disabled={!isEditing} />
            </div>

            <div className={styles.noticeBox}>
                <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
                <p>本籍地の情報はプライバシー保護のため取得しておりません。</p>
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.buttonContainer}>
               <button type="submit" className={styles.submitButton} disabled={isUpdating}>
                {isUpdating ? '更新中...' : '内容を確定して次へ'}
               </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
