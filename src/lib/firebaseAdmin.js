
import admin from 'firebase-admin';

// 既に初期化されているかを確認し、重複して初期化されるのを防ぐ
if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      // 環境変数からサービスアカウントキーの情報を取得
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      console.warn('FIREBASE_SERVICE_ACCOUNT_JSON is not set. Firebase Admin SDK is not initialized.');
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
    // ビルドを止めないように、エラーをスローしない
    // throw new Error('Could not initialize Firebase Admin SDK.');
  }
}

// 初期化されたFirestoreインスタンスをエクスポート
const db = admin.apps.length ? admin.firestore() : null;

export { db, admin };
