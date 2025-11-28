'use client';

import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './scan.module.css';
import { CameraIcon, DocumentArrowUpIcon, ShieldCheckIcon, CloudArrowUpIcon } from '@heroicons/react/24/solid';
import Tesseract from 'tesseract.js';

// Firebase
import { db, storage } from '../../../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

export default function ScanPage() {
  const router = useRouter();
  const params = useParams();
  const { bookingId } = params;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [isOcrRunning, setIsOcrRunning] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      performOcr(file);
    }
  };

  const performOcr = async (file) => {
    if (!file) return;

    setIsOcrRunning(true);
    setOcrResult(null);
    setError('');
    setOcrProgress(0);

    try {
      const worker = await Tesseract.createWorker({
        logger: m => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.floor(m.progress * 100));
          }
        }
      });
      await worker.loadLanguage('jpn');
      await worker.initialize('jpn');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      // Basic parsing (can be improved)
      const nameMatch = text.match(/氏名\s*(.+)/);
      const dobMatch = text.match(/生年月日\s*(.+)/);
      const licenseNumberMatch = text.match(/番号\s*第\s*(\d+)\s*号/);

      setOcrResult({
        rawText: text,
        name: nameMatch ? nameMatch[1].trim() : '-',
        dob: dobMatch ? dobMatch[1].trim() : '-',
        licenseNumber: licenseNumberMatch ? licenseNumberMatch[1] : '-',
      });

    } catch (err) {
      console.error('OCR failed:', err);
      setError('免許証の読み取りに失敗しました。画像の品質を確認してください。');
    } finally {
      setIsOcrRunning(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedFile || !ocrResult) return;
    // Here you would typically upload the file and save the ocrResult
    // For now, we will just navigate to a confirmation page (to be created)
    // alert(`OCR Data:\nName: ${ocrResult.name}\nDOB: ${ocrResult.dob}\nLicense No: ${ocrResult.licenseNumber}`);
    uploadFile(selectedFile);
  };
  
  const uploadFile = async (file) => {
    if (!file) return;

    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    const storageRef = ref(storage, `licenses/${bookingId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setError('アップロードに失敗しました。');
        setIsUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const bookingRef = doc(db, "bookings", bookingId);
          await updateDoc(bookingRef, {
            licenseImageUrl: downloadURL,
            driverName: ocrResult.name,
            licenseNumber: ocrResult.licenseNumber
          });
          router.push(`/checkin/${bookingId}/face-scan`);
        } catch (err) {
            console.error("DB update failed:", err);
            setError('データベースの更新に失敗しました。');
            setIsUploading(false);
        }
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.scanBox}>
        <div className={styles.header}>
          <ShieldCheckIcon className={styles.headerIcon} />
          <h1 className={styles.title}>免許証のスキャン</h1>
        </div>
        
        {isOcrRunning ? (
          <div className={styles.ocrStatus}>
            <p>画像を解析中... {ocrProgress}%</p>
            <div className={styles.progressBar}>
                <div style={{ width: `${ocrProgress}%` }} className={styles.progressFill}></div>
            </div>
          </div>
        ) : ocrResult ? (
          <div className={styles.ocrResult}>
              <h3>読み取り結果</h3>
              <p><strong>氏名:</strong> {ocrResult.name}</p>
              <p><strong>生年月日:</strong> {ocrResult.dob}</p>
              <p><strong>免許証番号:</strong> {ocrResult.licenseNumber}</p>
              <div className={styles.confirmationActions}>
                <button onClick={() => { setOcrResult(null); setSelectedFile(null); }} className={styles.recaptureButton}>再撮影</button>
                <button onClick={handleConfirm} className={styles.confirmButton} disabled={isUploading}>
                  {isUploading ? 'アップロード中...' : '内容を確定して次へ'}
                </button>
              </div>
              {isUploading && (
                  <div className={styles.uploadStatusSmall}>
                      <p>{Math.round(uploadProgress)}%</p>
                      <div className={styles.progressBar}>
                          <div style={{ width: `${uploadProgress}%` }} className={styles.progressFill}></div>
                      </div>
                  </div>
              )}
          </div>
        ) : (
          <>
            <p className={styles.subtitle}>免許証の表面を撮影またはアップロードしてください。</p>
            <div className={styles.actionsContainer}>
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" style={{ display: 'none' }} />
                <button onClick={() => fileInputRef.current.click()} className={styles.actionButton}>
                    <CameraIcon className="h-10 w-10 mb-2" />
                    <span>カメラで撮影/ファイル選択</span>
                </button>
            </div>
            <div className={styles.guidelines}>
              <h3 className={styles.guidelinesTitle}>撮影のポイント</h3>
              <ul>
                <li>明るい場所で撮影してください。</li>
                <li>文字が鮮明に読み取れるようにピントを合わせてください。</li>
                <li>免許証全体が枠内に収まるようにしてください。</li>
                <li>光の反射や影が入らないようにご注意ください。</li>
              </ul>
            </div>
          </>
        )}

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
}
