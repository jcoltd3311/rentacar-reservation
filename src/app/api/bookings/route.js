
import { NextResponse } from 'next/server';
import { admin, db } from '@/lib/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const bookingData = await request.json();

    // 1. 一意の予約番号を生成
    const bookingId = uuidv4();

    // 2. Firestoreに保存するデータ構造を定義
    const bookingDoc = {
      id: bookingId,
      ...bookingData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // 3. Firestoreの`bookings`コレクションに保存
    await db.collection('bookings').doc(bookingId).set(bookingDoc);

    console.log(`予約が正常に作成されました。予約番号: ${bookingId}`);

    // 4. フロントエンドに予約番号を返す
    return NextResponse.json({ bookingId }, { status: 201 });

  } catch (error) {
    console.error('予約の作成中にエラーが発生しました:', error);
    return NextResponse.json({ error: '予約の作成に失敗しました。' }, { status: 500 });
  }
}
