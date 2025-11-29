'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCodeIcon, TicketIcon } from '@heroicons/react/24/outline';

export default function ReceptionPage() {
  const [bookingId, setBookingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleStartReception = async (e) => {
    e.preventDefault();
    setError('');
    if (!bookingId) {
      setError('予約番号を入力してください。');
      return;
    }

    setIsLoading(true);

    // 本来はここでAPIに問い合わせて予約の存在確認を行うのが理想的です。
    // 例: const res = await fetch(`/api/bookings/${bookingId}`);
    // if (res.ok) { ... } else { ... }
    // 今回は、入力されたIDのページに直接遷移するシンプルな実装とします。

    // 3秒待つ（ローディングのデモ用）
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 予約詳細ページに遷移
    router.push(`/booking/details/${bookingId}`);
    
    // 注: 実際のシナリオでは、読み込み完了後にsetIsLoading(false)を呼び出すが、
    // ページ遷移するため不要。
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">店舗受付</h1>
            <p className="text-gray-300">ご予約番号をご入力ください。</p>
          </div>

          <form onSubmit={handleStartReception}>
            <div className="relative mb-6">
                <TicketIcon className="absolute top-1/2 left-4 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                    type="text"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    placeholder="例: 5a7c2..."
                    className="w-full bg-white/10 text-white placeholder-gray-400 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-xl py-4 pl-12 pr-4 text-lg transition-all"
                />
            </div>

            {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full font-bold py-4 rounded-xl text-lg transition-all duration-300 ease-in-out transform ${isLoading 
                ? 'bg-gray-600 text-gray-400 cursor-wait' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg'}`}>
              {isLoading ? '確認中...' : '予約情報を表示'}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">または</p>
            <button className="mt-4 w-full bg-gray-700/80 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-700 transition-colors">
                <QrCodeIcon className="h-6 w-6" />
                <span>QRコードをスキャン</span>
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-8">ご不明な点は、店舗スタッフまでお声がけください。</p>
      </div>
    </div>
  );
}
