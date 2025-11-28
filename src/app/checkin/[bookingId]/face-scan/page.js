'use client';

import { useRouter, useParams } from 'next/navigation';
import styles from './face-scan.module.css';
import { UserCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';

export default function FaceScanPage() {
  const router = useRouter();
  const params = useParams();
  const { bookingId } = params;

  const handleSkip = () => {
    // Navigate to the final confirmation page
    router.push(`/checkin/${bookingId}/complete`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.scanBox}>
        <div className={styles.header}>
            <UserCircleIcon className={styles.headerIcon} />
            <h1 className={styles.title}>本人確認</h1>
        </div>
        <p className={styles.subtitle}>
          免許証の顔写真と、ご自身の顔を照合します。
        </p>

        {/* Placeholder for camera view */}
        <div className={styles.cameraPlaceholder}>
            <div className={styles.faceOutline}></div>
            <p className={styles.placeholderText}>カメラの準備中です...</p>
        </div>

        <div className={styles.actionsContainer}>
            <p className={styles.skipInfo}>
                顔認証がうまくいかない場合や、あとで行う場合はスキップできます。
            </p>
            <button onClick={handleSkip} className={styles.skipButton}>
                <span>スキップして次へ</span>
                <ArrowRightCircleIcon className="h-6 w-6" />
            </button>
        </div>

      </div>
    </div>
  );
}
