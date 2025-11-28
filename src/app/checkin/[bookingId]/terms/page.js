
'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './terms.module.css';
import { DocumentTextIcon, ShieldCheckIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

// ダミーの契約条項テキスト
const termsAndConditionsText = `
1. (契約の成立) お客様と当社の間で、本レンタル契約が締結されます。お客様は、本規約および別途定める料金表の内容を承諾するものとします。
2. (車両の貸渡) 当社は、お客様に、レンタル契約書に記載された車両（以下「レンタカー」という）を貸し渡すものとします。
3. (料金) お客様は、契約期間に対応する料金を、貸渡前に当社に支払うものとします。料金には、車両レンタル料、保険料、消費税が含まれます。
4. (期間) レンタカーの貸渡期間は、契約書に記載された期間とします。期間の延長を希望する場合は、期間満了前に当社の承諾を得なければなりません。
5. (禁止行為) お客様は、レンタカーを使用して、以下の行為をしてはなりません。
   - 当社の承諾なく、レンタカーを第三者に使用させ、または転貸すること。
   - 法令または公序良俗に違反してレンタカーを使用すること。
   - レンタカーを改造するなど、原状を変更すること。
6. (事故) 貸渡期間中にレンタカーに関し事故が発生したときは、お客様は、事故の大小にかかわらず、法令上の措置をとるとともに、直ちに当社に連絡し、その指示に従うものとします。
7. (NOC) 事故、盗難、お客様の責に帰すべき事由による故障、レンタカーの汚損・臭気等により、当社がそのレンタカーを利用できなくなった場合には、営業補償の一部として、別に定めるノンオペレーションチャージ(NOC)を申し受けます。
8. (個人情報の取扱い) 当社は、お客様の個人情報を、貸渡契約の履行、サービスの提供、および当社の事業活動のために利用します。法令に基づく場合を除き、お客様の同意なく第三者に提供することはありません。
...
（以下、条文が続きます）
`;

export default function TermsPage() {
  const router = useRouter();
  const params = useParams();
  const { bookingId } = params;
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleConfirm = () => {
    if (hasAgreed) {
      console.log('Terms Agreed');
      // 次のステップ（電子署名）へ遷移
      router.push(`/checkin/${bookingId}/signature`);
    } else {
      alert('重要事項をご確認の上、チェックボックスにチェックを入れてください。');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.termsContainer}>
        <div className={styles.header}>
          <DocumentTextIcon className={styles.headerIcon} />
          <h1 className={styles.title}>重要事項説明・契約内容確認</h1>
        </div>
        <p className={styles.subtitle}>
          以下の内容をよくお読みいただき、ご同意の上、チェックボックスにチェックを入れてください。
        </p>

        <div className={styles.termsContent}>
          {termsAndConditionsText.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
          ))}
        </div>

        <div className={styles.agreementSection}>
          <input 
            type="checkbox" 
            id="agreement-checkbox"
            checked={hasAgreed}
            onChange={(e) => setHasAgreed(e.target.checked)}
            className={styles.checkbox}
          />
          <label htmlFor="agreement-checkbox" className={styles.checkboxLabel}>
            <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
            <span>上記すべての条項を確認し、同意します。</span>
          </label>
        </div>

        <div className={styles.buttonContainer}>
            <button 
                onClick={handleConfirm} 
                className={styles.confirmButton}
                disabled={!hasAgreed}
            >
                <span>署名へ進む</span>
                <ArrowRightIcon className="h-5 w-5" />
            </button>
        </div>

      </div>
    </div>
  );
}
