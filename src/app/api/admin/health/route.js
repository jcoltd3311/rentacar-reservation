
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin'; // Corrected import path

export async function GET() {
  // `db` が正常にインポートされ、初期化されているかを確認
  if (!db) {
    return NextResponse.json({
      status: 'uninitialized',
      message: 'Firebase Admin SDK (Firestore) is not initialized. Check server logs for details.',
    }, { status: 500 });
  }

  try {
    // Firestoreのhealth-checkコレクションからドキュメントを読み取り、接続を確認
    const healthCheckDoc = await db.collection('health-check').doc('status').get();
    
    // get()が成功すれば接続は正常と判断
    return NextResponse.json({
      status: 'initialized_and_healthy',
      firestore_connection: true,
      // ドキュメントの存在有無も情報として返す
      doc_exists: healthCheckDoc.exists 
    }, { status: 200 });

  } catch (e) {
    // Typescriptの型定義 `e: any` は削除
    console.error('Firestore health check failed:', e);
    return NextResponse.json({
        status: 'error',
        message: 'An error occurred while communicating with Firestore.',
        error: e.message, // e.message を使用
    }, { status: 500 });
  }
}
