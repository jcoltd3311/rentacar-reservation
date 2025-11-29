
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// アイコンコンポーネント
const CarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 12 16 12H8c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v4" />
    <circle cx="8" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="16" cy="17" r="2" />
  </svg>
);

const UsersIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// 検索結果表示コンポーネント
export default function SearchResults({ results }) {
  const router = useRouter();

  // 予約ボタンがクリックされたときの処理
  const handleSelectCar = (car) => {
    // 予約情報を一時的に保存し、決済ページにリダイレクト
    try {
      sessionStorage.setItem('bookingDetails', JSON.stringify(car));
      router.push('/booking/payment');
    } catch (error) {
      console.error("Failed to save booking details:", error);
      // エラーが発生した場合のフォールバック処理
      alert("予約情報の保存に失敗しました。もう一度お試しください。");
    }
  };

  // 検索結果がない場合の表示
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-700">検索条件に合う車が見つかりませんでした。</h2>
        <p className="mt-4 text-gray-500">条件を変更して、もう一度お試しください。</p>
      </div>
    );
  }

  // 検索結果がある場合の表示
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">検索結果</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((car, index) => (
          <div key={car.id || index} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
            <div className="relative h-56 w-full">
              <Image
                src={car.image || '/placeholder-car.svg'} // 画像がない場合のプレースホルダー
                alt={`${car.make} ${car.model}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
                // 最初の数枚の画像を優先的に読み込む
                priority={index < 3}
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">{`${car.make} ${car.model}`}</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <UsersIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>{car.seats}人乗り</span>
              </div>
              <div className="text-3xl font-black text-gray-800 mb-6">
                ¥{car.price.toLocaleString()}<span className="text-base font-medium text-gray-500">/日</span>
              </div>
              <button 
                onClick={() => handleSelectCar(car)}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <CarIcon className="h-5 w-5" />
                <span>この車で予約</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
