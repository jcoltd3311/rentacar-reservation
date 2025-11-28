'use client';

import Link from 'next/link';
import Image from 'next/image';
import CarList from '@/components/CarList'; // CarListコンポーネントをインポート

// アイコンコンポーネント
const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      {/* --- ヒーローセクション --- */}
      <div className="relative h-[calc(100vh-80px)] overflow-hidden">
        {/* 背景画像 */}
        <Image
          src="https://images.unsplash.com/photo-1533106418989-87423dec6934?q=80&w=2940&auto=format&fit=crop"
          alt="A scenic road with a car"
          fill
          quality={85}
          className="z-0 object-cover"
          priority // LCP(Largest Contentful Paint)のために優先的に読み込む
        />
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

        {/* コンテンツ */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 animate-fade-in-down">
            新しい旅は、ここから始まる。
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up">
            NextRentで、忘れられないドライブ体験を。簡単なステップで、あなたにぴったりの一台を見つけよう。
          </p>
          {/* Note: The link now points to a section on the same page */}
          <a href="#car-list-section" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg animate-bounce">
            <span>利用可能な車両を見る</span>
            <ArrowRightIcon className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* --- 車両一覧セクション --- */}
      <section id="car-list-section" className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                      利用可能な車両
                  </h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                      お気に入りの一台を見つけて、最高の旅に出かけましょう。
                  </p>
              </div>
              <CarList />
          </div>
      </section>

      {/* アニメーション用のスタイル */}
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.4s forwards;
        }
        .animate-bounce {
            animation: bounce 2s infinite;
        }
      `}</style>
    </>
  );
}
