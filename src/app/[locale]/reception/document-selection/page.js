
'use client'

import { useRouter } from 'next/navigation';
import styles from './document-selection.module.css';

export default function DocumentSelectionPage() {
  const router = useRouter();

  const handleSelection = (documentType) => {
    // In a real app, you might pass the document type to the next step
    console.log(`Selected document: ${documentType}`);
    router.push('/reception/scan');
  };

  return (
    <div className={styles.container}>
      <h1>本人確認書類の選択</h1>
      <p>ご提示いただく本人確認書類を選択してください。</p>
      <div className={styles.buttonContainer}>
        <button onClick={() => handleSelection('license')} className={styles.selectionButton}>
          運転免許証
        </button>
        <button onClick={() => handleSelection('other')} className={styles.selectionButton}>
          その他の本人確認書類
        </button>
      </div>
    </div>
  );
}
