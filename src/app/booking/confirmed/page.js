
import styles from './confirmed.module.css';

export default function ConfirmedPage() {
  return (
    <div className={styles.container}>
      <h1>ご予約ありがとうございます！</h1>
      <p>お客様のレンタカー予約が確定いたしました。</p>
      <p>ご登録いただいたメールアドレスに、予約内容の詳細をお送りしましたのでご確認ください。</p>
      <p>ご利用を心よりお待ちしております。</p>
    </div>
  );
}
