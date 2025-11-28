
"use client";
import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './vehicle-check.module.css';

const VehicleCheckPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [scratches, setScratches] = useState([]);

  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newScratch = { x, y, id: Date.now() };
    setScratches([...scratches, newScratch]);
  };

  const handleNext = () => {
    console.log("Scratches reported:", scratches);
    router.push(`/reception/license-scan?bookingId=${bookingId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkContainer}>
        <h1 className={styles.title}>車両のキズ確認</h1>
        <p className={styles.instructions}>車両のイラスト上で、キズのある箇所をクリックしてください。</p>
        <div className={styles.canvasContainer}>
          {/* ここに車両のイラストを配置 */}
          <img src="/car-illustration.svg" alt="車両イラスト" className={styles.carImage} onClick={handleCanvasClick} />
          {scratches.map(scratch => (
            <div 
              key={scratch.id} 
              className={styles.scratchMark} 
              style={{ left: scratch.x - 10, top: scratch.y - 10 }}
            >X</div>
          ))}
        </div>
        <div className={styles.actions}>
          <button onClick={handleNext} className={styles.nextButton}>
            キズの申告を完了し、次へ
          </button>
        </div>
      </div>
    </div>
  );
};

const VehicleCheckPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <VehicleCheckPageContent />
    </Suspense>
);

export default VehicleCheckPage;
