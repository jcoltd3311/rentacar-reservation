
import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-2xl shadow-xl text-center">

        <h1 className="text-4xl font-bold text-gray-900">車両を検索</h1>
        <p className="text-lg text-gray-600">このページで、ご希望の車両を検索します。（現在作成中です）</p>

        {/* Placeholder for search form */}
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-2xl">
          <p className="text-gray-500">ここに車両検索フォームが入ります。</p>
        </div>

        {/* Temporary link to payment page for testing the flow */}
        <p className="text-sm text-gray-500 pt-4">開発中のため、仮の導線としています。</p>
        <Link href="/booking/payment">
          <span className="inline-block px-8 py-4 text-xl font-bold text-white bg-green-600 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105 cursor-pointer">
            予約手続きへ進む（テスト）
          </span>
        </Link>

      </div>
    </div>
  );
}
