
"use client";
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './signature.module.css';

const SignaturePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const canvasRef = useRef(null);
  const [isSigning, setIsSigning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
  }, []);

  const startSigning = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsSigning(true);
  };

  const sign = ({ nativeEvent }) => {
    if (!isSigning) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopSigning = () => {
    setIsSigning(false);
  };
  
  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleComplete = () => {
    const signatureData = canvasRef.current.toDataURL();
    // ここで署名データをサーバーに送信する処理を想定
    console.log("Signature submitted for booking:", bookingId);
    router.push(`/reception/complete?bookingId=${bookingId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.signatureBox}>
        <h1 className={styles.title}>電子署名</h1>
        <p className={styles.instructions}>以下のボックス内に署名をお願いします。</p>
        <canvas
          ref={canvasRef}
          width="500"
          height="200"
          className={styles.canvas}
          onMouseDown={startSigning}
          onMouseMove={sign}
          onMouseUp={stopSigning}
          onMouseLeave={stopSigning}
        ></canvas>
        <div className={styles.actions}>
          <button onClick={clearSignature} className={styles.clearButton}>クリア</button>
          <button onClick={handleComplete} className={styles.completeButton}>受付完了</button>
        </div>
      </div>
    </div>
  );
};

const SignaturePage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <SignaturePageContent />
    </Suspense>
);

export default SignaturePage;
