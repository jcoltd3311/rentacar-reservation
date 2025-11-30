import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    const doc = await db.collection('health-check').doc('status').get();
    return NextResponse.json({
      status: 'initialized_and_healthy',
      firestore_connection: true,
      doc_exists: doc.exists,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
    }, { status: 500 });
  }
}
