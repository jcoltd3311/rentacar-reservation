
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let db = null;
let auth = null;
let adminApp;

// 既に初期化されているかを確認し、重複して初期化されるのを防ぐ
if (getApps().length === 0) {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJson);
      adminApp = initializeApp({
        credential: cert(serviceAccount),
      });
      console.log('Firebase Admin SDK initialized successfully (modular).');
    } catch (e) {
      console.error('Firebase Admin SDK initialization error:', e);
    }
  } else {
    console.warn('FIREBASE_SERVICE_ACCOUNT_JSON is not set. Firebase Admin SDK is not initialized.');
  }
} else {
  // 既に初期化されている場合は、既存のAppインスタンスを取得
  adminApp = getApps()[0];
}

// Appインスタンスが正常に取得できた場合のみ、各サービスを初期化
if (adminApp) {
  db = getFirestore(adminApp);
  auth = getAuth(adminApp);
}

export { db, auth };
