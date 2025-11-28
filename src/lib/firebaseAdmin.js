
import admin from 'firebase-admin';

// 既に初期化されているかを確認し、重複して初期化されるのを防ぐ
if (!admin.apps.length) {
  try {
    // 環境変数からサービスアカウントキーの情報を取得
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
    throw new Error('Could not initialize Firebase Admin SDK.');
  }
}

// 初期化されたFirestoreインスタンスをエクスポート
const db = admin.firestore();

export { db, admin };
