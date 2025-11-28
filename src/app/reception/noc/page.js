
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './noc.module.css';

export default function NocPage() {
  const router = useRouter();
  const [enroll, setEnroll] = useState(null); // null, 'join', 'not_join', 'already_joined'

  const handleNext = () => {
    if (enroll === null) {
      alert('いずれかを選択してください。');
      return;
    }
    // Pass enrollment choice to the next page
    router.push('/reception/consent');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NOC（ノンオペレーションチャージ）補償</h1>
      <div className={styles.explanation}>
        <p>万一の事故・故障時にご負担いただくNOC（2万円または5万円）のお支払いが免除される、安心の補償制度です。</p>
        <p><strong>補償料金:</strong> 1日あたり ¥550 (税込)</p>
      </div>

      <div className={styles.selectionContainer}>
        <div
          className={`${styles.selectionBox} ${enroll === 'join' ? styles.selected : ''}`}
          onClick={() => setEnroll('join')}
        >
          <h2>加入する</h2>
          <p>NOC補償に加入して、万一の事態に備える。</p>
        </div>
        <div
          className={`${styles.selectionBox} ${enroll === 'not_join' ? styles.selected : ''}`}
          onClick={() => setEnroll('not_join')}
        >
          <h2>加入しない</h2>
          <p>NOC補償には加入せず、費用を抑える。</p>
        </div>
        <div
          className={`${styles.selectionBox} ${enroll === 'already_joined' ? styles.selected : ''}`}
          onClick={() => setEnroll('already_joined')}
        >
          <h2>加入済（精算済）</h2>
          <p>基本料金に含まれています。</p>
        </div>
      </div>

      <button onClick={handleNext} className={styles.nextButton} disabled={enroll === null}>
        次へ進む
      </button>
    </div>
  );
}
