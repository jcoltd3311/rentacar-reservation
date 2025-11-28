
'use client';
import Link from 'next/link';

export default function ConfirmedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <svg className="w-16 h-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">
          ご予約ありがとうございます！
        </h1>

        {/* Message */}
        <p className="text-lg">
          お客様の車両予約が正常に完了いたしました。
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="font-semibold text-blue-800">予約番号</p>
          <p className="text-2xl font-mono tracking-widest text-blue-900">
            A1B2-C3D4
          </p>
        </div>
        <p className="text-sm text-gray-500">
          予約内容の詳細は、ご登録のメールアドレスにお送りしましたのでご確認ください。
        </p>

        {/* Action Button */}
        <Link href="/">
          <span className="inline-block w-full px-6 py-3 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 cursor-pointer">
            トップページに戻る
          </span>
        </Link>

      </div>
    </div>
  );
}
