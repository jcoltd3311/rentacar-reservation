
'use client'

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SignatureCanvas from 'react-signature-canvas';
import styles from './consent.module.css';

export default function ConsentPage() {
  const router = useRouter();
  const sigCanvas = useRef({});
  const [isSigned, setIsSigned] = useState(false);

  const clearSignature = () => {
    sigCanvas.current.clear();
    setIsSigned(false);
  };

  const handleNext = () => {
    if (!isSigned) {
      alert('署名が必要です。');
      return;
    }
    // You can get the signature data if needed:
    // const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    // console.log(signatureData);

    router.push('/reception/confirm'); // Navigate to the final confirmation page
  };

  const handleSignature = () => {
      if (!sigCanvas.current.isEmpty()) {
          setIsSigned(true);
      }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>レンタカー利用ガイド兼ガイドライン 同意書</h1>
      
      <div className={styles.content}>
        <p className={styles.subtitle}>下記の事項等を確認し承諾致します。</p>
        <hr/>
        <h3>レンタカーご利用ガイド・ご出発前にご確認ください</h3>
        <p>貸渡証で返却の時間・店舗をご確認下さい。返却時間を超過しますと超過料金が返却店舗をご出発後に変更する場合は乗捨料金が発生します。</p>

        <h2>◇１◇ 事故が起きてしまったら</h2>
        <p className={styles.important}>※ キズ・ヘコミの大小、相手の有無は問わず、加害者・被害者どちらの場合でも事故となります。</p>
        <ul>
            <li>① 車両を移動して二次事故を防止し、負傷者を救護して下さい。</li>
            <li>② 必ず警察による現場検証を実施して下さい。事故現場から当社(時間外は三井住友海上･事故受付センター)へ事故報告をして下さい。(②が全て完了していない場合、もしくは当社の承諾なく相手側と示談した場合、保険･補償･サポートが一切受けられません。)</li>
            <li>③ 事故が発生した時点でレンタルは中止となり、ご予定料金の返金は致しません。(再出発には新たなご契約が必要となります。)</li>
            <li>④ レッカー費用は実費です。（お客様全額負担）</li>
        </ul>

        <h2>◇２◇ 免責補償</h2>
        <p>下記の補償額の範囲で保険金が給付されます。免責＝自己負担額です。所定の手続きが実施されない場合は、補償が受けられません。車両補償には適用外の箇所がありますので、予めご確認下さい。</p>
        <table>
          <thead>
            <tr>
              <th>項目</th>
              <th>内容</th>
              <th>免責(自己負担)</th>
              <th></th>
              <th>免責補償制度</th>
              <th>免責(自己負担)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>対物補償</td><td>3,000万円(事故限度額)</td><td>150,000円</td><td rowSpan="3">日数単位</td><td rowSpan="2">1日￥1,080</td><td rowSpan="2">０円</td></tr>
            <tr><td>車両補償</td><td>時価額(適用外箇所あり)</td><td>100,000円</td></tr>
            <tr><td>搭乗者傷害</td><td>1,000万円(1名限度額)</td><td>０円</td><td colSpan="2">※ご出発時の加入が条件</td></tr>
          </tbody>
        </table>
        <p className={styles.important}>※下記項目に該当する場合は、保険･補償(免責補償、ﾉﾝｵﾍﾟﾚｰｼｮﾝﾁｬｰｼﾞ(NOC)を含む)の適用外となり損害額及び賠償金は全額お客様のご負担となります。</p>
        <p>1. 当社に無断でレンタルを延長した場合 2. 事故の際、警察と当社への届出(連絡)がない場合 3. 酒気帯び運転、酒酔い運転、麻薬･覚せい剤･危険ドラッグなど中毒症状を呈している場合 4. 危険運転、レンタル中の車輌管理の怠り、路外走行など使用･管理上の落ち度があった場合、その他、貸渡約款に違反している場合</p>
        <p><strong>【車両補償適用外箇所】</strong>…ガラスのみの損害、タイヤのパンク及びバースト、車両の盗難（鍵の管理不備の場合）、事故時のレッカー、ホイールキャップの紛失･室内装備のみの損傷、お客様の所有･管理物の損害は任意保険の適用外となっているため、損害発生時はすべてお客様の自己負担となります</p>
        <p>【コンパクトカー：Fガラス30,000円HC：2，500円車両：時価額：その他実費】</p>
        <p>【ワゴン車クラス：Fガラス50,000円HC:3，000円車両時価：その他実費】</p>

        <h2>◇３◇ ノンオペレーションチャージ</h2>
        <p>ノンオペレーションチャージ（以下、NOC）とはレンタカー休業中の売上補償です。万一の事故などで車両の修理・清掃が発生した際に営業補償の一部としてノンオペレーションチャージ(NOC)のお支払いが発生します。</p>
        <table>
            <thead><tr><th>車種区分</th><th>ﾉﾝｵﾍﾟﾚｰｼｮﾝﾁｬｰｼﾞ(NOC)</th><th></th><th>NOC補償</th><th>NOC</th></tr></thead>
            <tbody>
                <tr><td>コンパクトクラス</td><td>50,000円</td><td rowSpan="2">日数単位<br/>1日￥810</td><td rowSpan="2">0円</td><td rowSpan="2">※ご出発時の加入が条件となります。<br/>※運転者に免許取得1年未満の方がいる場合はNOCの加入をお断りさせていただきます。</td></tr>
                <tr><td>ミニバン・ワンボックスクラス</td><td>70,000円</td></tr>
            </tbody>
        </table>
        <p className={styles.important}>※免責補償に加入されていてもNOCは発生します。 ※相手が分からない事故はすべて自損事故扱いとなりNOCが発生します。</p>
        <p><strong>※ ノンオペレーションチャージ（NOC）適用除外について</strong><br/>喫煙、ペット、海産物、灯油等の車内積載による室内の汚損、臭いの付着についてもNOCの適用除外となります。禁煙（電子タバコも✕）・ペット・灯油等の車内積載禁止)※車両は全て禁煙車となります。車内で決して吸わないようにお願いいたします。※車内にたばこ臭や灰が落ちているなど、喫煙したと当社従業員が判断した場合、違約金5万円（原状回復費用）をご負担いただきます。窓を開け車内で吸う行為ももちろん対象です。車外で喫煙された際にタバコの灰等が入らないようにしていただくと共に喫煙後乗られる際はタバコの灰等が衣類に付着していないか確認していただきご乗車ください。※NOCご加入時でも違約金支払いの対象となります。</p>
        <hr/>
        <p>□記載事項は予告無しに変更することがあります。</p>
        <p>□その他に関する一切は「貸渡約款」に基づきます。</p>
      </div>

      <div className={styles.signatureSection}>
          <p>上記内容に同意します。ご署名ください。</p>
          <SignatureCanvas
            ref={sigCanvas}
            penColor='black'
            canvasProps={{ className: styles.signaturePad }}
            onEnd={handleSignature}
          />
        <div className={styles.buttonContainer}>
          <button onClick={clearSignature} className={`${styles.button} ${styles.clearButton}`}>
            署名をクリア
          </button>
          <button onClick={handleNext} className={`${styles.button} ${styles.nextButton}`} disabled={!isSigned}>
            同意して次へ
          </button>
        </div>
      </div>

    </div>
  );
}
