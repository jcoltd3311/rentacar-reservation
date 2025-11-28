
"use client";
import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './license-scan.module.css';

const LicenseScanPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [licenseImage, setLicenseImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicenseImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    if (licenseImage) {
      // ここで画像をアップロードし、OCRで免許証情報を読み取る処理を想定
      console.log("License image to be uploaded:", licenseImage.name);
      router.push(`/reception/signature?bookingId=${bookingId}`);
    } else {
      alert("免許証の画像をアップロードしてください。");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.scanBox}>
        <h1 className={styles.title}>免許証のスキャン</h1>
        <p className={styles.instructions}>免許証の写真をアップロードしてください。</p>
        <input type="file" accept="image/*" onChange={handleImageChange} className={styles.fileInput} />
        {preview && (
          <div className={styles.previewContainer}>
            <img src={preview} alt="免許証プレビュー" className={styles.previewImage} />
          </div>
        )}
        <div className={styles.actions}>
          <button onClick={handleNext} className={styles.nextButton} disabled={!preview}>
            次へ
          </button>
        </div>
      </div>
    </div>
  );
};

const LicenseScanPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <LicenseScanPageContent />
    </Suspense>
);

export default LicenseScanPage;
