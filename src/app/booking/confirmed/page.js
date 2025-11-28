'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

// メインのコンテンツ部分
function ConfirmationContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get('bookingId');
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(bookingId).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // 2秒後に表示を元に戻す
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl text-center transform transition-all hover:scale-[1.02] duration-300">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6 border-4 border-white shadow-lg">
                    <CheckCircleIcon className="h-16 w-16 text-green-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                    ご予約が確定しました！
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                    この度は、当社のレンタカーサービスをご利用いただき、誠にありがとうございます。
                </p>

                <div className="bg-gray-100 rounded-xl p-6 mb-8">
                    <p className="text-sm text-gray-500 uppercase font-semibold">お客様の予約番号</p>
                    <div className="flex items-center justify-center gap-3 mt-3">
                        <p className="text-3xl font-mono tracking-wider text-blue-600 font-bold">
                            {bookingId ? bookingId.split('-')[0] : '読み込み中...'}
                        </p>
                        {bookingId && (
                            <button onClick={copyToClipboard} className="relative p-2 rounded-full hover:bg-gray-200 transition-colors">
                                <ClipboardIcon className="h-6 w-6 text-gray-500" />
                                {copied && (
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs rounded-md px-2 py-1">
                                        コピーしました！
                                    </span>
                                )}
                            </button>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        この番号は、ご予約の確認や店舗での受付時に必要となりますので、大切に保管してください。
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Link href={`/booking/details/${bookingId}`} legacyBehavior>
                        <a className="inline-block w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg">
                            予約の詳細を確認
                        </a>
                    </Link>
                    <Link href="/" legacyBehavior>
                        <a className="inline-block w-full bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-xl hover:bg-gray-300 transition-transform transform hover:scale-105 shadow-lg">
                            トップページに戻る
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ページ全体
export default function ConfirmedPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">予約情報を処理中...</div>}>
            <ConfirmationContent />
        </Suspense>
    );
}
