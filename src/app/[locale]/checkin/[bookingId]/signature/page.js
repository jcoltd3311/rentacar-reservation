
'use client';

import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SignatureCanvas from 'react-signature-canvas';
import styles from './signature.module.css';
import { DocumentCheckIcon, ArrowPathIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

// Firebase
import { db, storage } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export default function SignaturePage() {
    const router = useRouter();
    const params = useParams();
    const { bookingId } = params;
    const sigCanvas = useRef({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    const saveSignature = async () => {
        if (sigCanvas.current.isEmpty()) {
            alert('署名を入力してください。');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const signatureImage = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
            const storageRef = ref(storage, `signatures/${bookingId}/signature.png`);

            // Upload signature image
            const uploadResult = await uploadString(storageRef, signatureImage, 'data_url');
            const downloadURL = await getDownloadURL(uploadResult.ref);

            // Update Firestore document
            const bookingRef = doc(db, 'bookings', bookingId);
            await updateDoc(bookingRef, {
                signatureUrl: downloadURL,
                status: 'completed', // Update status to completed
                checkinTimestamp: new Date(), // Add a timestamp for check-in completion
            });

            router.push('/checkin/complete');

        } catch (err) {
            console.error('Error saving signature:', err);
            setError('署名の保存中にエラーが発生しました。もう一度お試しください。');
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.signatureBox}>
                <div className={styles.header}>
                    <DocumentCheckIcon className={styles.headerIcon} />
                    <h1 className={styles.title}>ご契約内容の同意と電子署名</h1>
                </div>
                <p className={styles.subtitle}>
                    最終確認として、以下の署名欄にサインをお願いいたします。
                </p>

                <div className={styles.canvasContainer}>
                    <SignatureCanvas
                        ref={sigCanvas}
                        penColor='black'
                        canvasProps={{ className: styles.signatureCanvas }}
                    />
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}
                
                <div className={styles.actions}>
                    <button onClick={clearSignature} className={styles.clearButton} disabled={isSubmitting}>
                        <ArrowPathIcon className="h-5 w-5" />
                        <span>書き直す</span>
                    </button>
                    <button onClick={saveSignature} className={styles.saveButton} disabled={isSubmitting}>
                         {isSubmitting ? (
                            '送信中...'
                        ) : (
                            <>
                                <PaperAirplaneIcon className="h-5 w-5" />
                                <span>署名を完了して送信</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
