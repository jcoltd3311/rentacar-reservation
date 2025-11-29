'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// ... (アイコンコンポーネントは変更なし)
const CreditCardIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
);
const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const MailIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);


export default function PaymentPage() {
    const router = useRouter();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false); // ローディング状態を追加

    // 仮のレンタル日数と追加料金
    const rentalDays = 3;
    const optionsPrice = 2000;

    useEffect(() => {
        try {
            const details = sessionStorage.getItem('bookingDetails');
            if (details) {
                setBookingDetails(JSON.parse(details));
            } else {
                router.push('/search');
            }
        } catch (error) {
            console.error("Failed to parse booking details:", error);
            router.push('/search');
        }
    }, [router]);

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        if (!customerName || !customerEmail) {
            alert('お客様情報を入力してください。');
            return;
        }

        setIsLoading(true); // ローディング開始

        const totalPrice = bookingDetails.price * rentalDays + optionsPrice;

        const bookingData = {
            customer: {
                name: customerName,
                email: customerEmail,
            },
            car: {
                make: bookingDetails.make,
                model: bookingDetails.model,
                image: bookingDetails.image,
                price: bookingDetails.price,
            },
            rentalDetails: {
                days: rentalDays,
                optionsPrice: optionsPrice,
                totalPrice: totalPrice,
            },
            // ここに他の予約関連情報を追加できます
            // 例: pickupDate, returnDate, options: ['GPS', 'Child Seat']
        };

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('予約の作成に失敗しました。');
            }

            const result = await response.json();
            const { bookingId } = result;

            // sessionStorageをクリア
            sessionStorage.removeItem('bookingDetails');

            // 予約完了ページに予約番号を渡してリダイレクト
            router.push(`/booking/confirmed?bookingId=${bookingId}`);

        } catch (error) {
            console.error(error);
            alert(error.message);
            setIsLoading(false); // エラー時にローディング解除
        }
    };

    if (!bookingDetails) {
        return <div className="flex items-center justify-center min-h-screen">ローディング...</div>;
    }

    const totalPrice = bookingDetails.price * rentalDays + optionsPrice;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-md">
                <div className="max-w-6xl mx-auto py-6 px-4">
                    <h1 className="text-3xl font-bold text-gray-900">予約内容の確認・決済</h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* 左側：予約フォーム */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">お客様情報</h2>
                        <form onSubmit={handleConfirmBooking}>
                            {/* ... (フォーム入力部分は変更なし) ... */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="relative">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">氏名</label>
                                    <UserIcon className="absolute top-9 left-3 h-5 w-5 text-gray-400" />
                                    <input type="text" id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full mt-1 pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="山田 太郎" required />
                                </div>
                                <div className="relative">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
                                    <MailIcon className="absolute top-9 left-3 h-5 w-5 text-gray-400" />
                                    <input type="email" id="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full mt-1 pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="example@email.com" required />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold mb-6">お支払い情報（ダミー）</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="relative md:col-span-2">
                                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">カード番号</label>
                                    <CreditCardIcon className="absolute top-9 left-3 h-5 w-5 text-gray-400"/>
                                    <input type="text" id="card-number" className="w-full mt-1 pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div>
                                    <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700">有効期限</label>
                                    <input type="text" id="card-expiry" className="w-full mt-1 px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="MM / YY" />
                                </div>
                                <div>
                                    <label htmlFor="card-cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                                    <input type="text" id="card-cvc" className="w-full mt-1 px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="123" />
                                </div>
                            </div>


                            <div className="mt-10">
                                <button type="submit" disabled={isLoading} className={`w-full bg-blue-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transition-transform transform hover:scale-105'}`}>
                                    {isLoading ? '予約処理中...' : '予約を確定する'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* 右側：予約サマリー */}
                    <div className="lg:col-span-1">
                         <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-8">
                            <h2 className="text-2xl font-bold mb-6 border-b pb-4">ご予約の概要</h2>
                            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                                <Image src={bookingDetails.image} alt={`${bookingDetails.make} ${bookingDetails.model}`} layout="fill" objectFit="cover" />
                            </div>
                            <h3 className="text-xl font-semibold">{`${bookingDetails.make} ${bookingDetails.model}`}</h3>
                            <div className="mt-4 space-y-3 text-gray-700">
                                <div className="flex justify-between">
                                    <span>基本料金 ({rentalDays}日間)</span>
                                    <span>¥{(bookingDetails.price * rentalDays).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>オプション料金</span>
                                    <span>¥{optionsPrice.toLocaleString()}</span>
                                </div>
                                <div className="border-t pt-3 mt-3 flex justify-between text-xl font-bold text-gray-900">
                                    <span>合計金額</span>
                                    <span>¥{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-4">※これはデモ用の画面です。実際の決済は行われません。</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
