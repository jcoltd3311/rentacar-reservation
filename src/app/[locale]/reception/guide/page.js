
'use client'

import { useRouter } from 'next/navigation';
import styles from './guide.module.css';

export default function GuidePage() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/reception/confirm');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>レンタカーご利用ガイド</h1>

      <div className={styles.guideSection}>
        <h2 className={styles.sectionTitle}>事故対応について</h2>
        <p>万が一、事故を起こされた場合は、速やかに<span className={styles.highlight}>警察（110番）</span>と<span className={styles.highlight}>当社にご連絡</span>ください。...</p>
      </div>

      <div className={styles.guideSection}>
        <h2 className={styles.sectionTitle}>免責補償制度について</h2>
        <p>ご契約の際、免責補償制度にご加入いただくと、対物・車両事故の際のお客様ご負担額（<span className={`${styles.highlight} ${styles.bold}`}>免責額</span>）が免除されます。...</p>
      </div>

      <div className={styles.guideSection}>
        <h2 className={styles.sectionTitle}>NOC（ノンオペレーションチャージ）について</h2>
        <p>万一、当社の責任によらない事故・盗難・故障・汚損等が発生し、車両の修理・清掃等が必要となった場合、その期間中の営業補償として下記金額をご負担いただきます。（<span className={styles.highlight}>これは免責補償制度とは異なります</span>）</p>
        <ul className={styles.priceList}>
          <li>自走してご返却された場合: <span className={`${styles.highlight} ${styles.bold}`}>20,000円</span></li>
          <li>自走不可能な場合: <span className={`${styles.highlight} ${styles.bold}`}>50,000円</span></li>
        </ul>
      </div>

      <div className={styles.guideSection}>
        <h2 className={styles.sectionTitle}>禁止事項</h2>
        <ul className={styles.banList}>
            <li>無断延長</li>
            <li>又貸し</li>
            <li>危険物の積載</li>
            <li>その他、貸渡約款に違反する行為</li>
        </ul>
      </div>

      <button onClick={handleNext} className={styles.nextButton}>
        内容を理解し次へ進む
      </button>
    </div>
  );
}
