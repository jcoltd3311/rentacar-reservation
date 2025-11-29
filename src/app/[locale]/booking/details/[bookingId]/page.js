
import { db } from '@/lib/firebaseAdmin';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ClockIcon, CalendarIcon, UserCircleIcon, PhoneIcon, TagIcon, CurrencyYenIcon } from '@heroicons/react/24/outline';
import { MailIcon } from '@heroicons/react/24/solid';

async function getBookingDetails(bookingId) {
  try {
    const bookingRef = db.collection('bookings').doc(bookingId);
    const doc = await bookingRef.get();

    if (!doc.exists) {
      return null; // データが見つからない場合はnullを返す
    }

    // FirestoreのTimestampをJSONシリアライズ可能な形式に変換
    const data = doc.data();
    const booking = {
        ...data,
        createdAt: data.createdAt.toDate().toISOString(), // Dateオブジェクトに変換してからISO文字列へ
    };

    return booking;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw new Error('Failed to fetch booking data.');
  }
}

// アイコンとテキストを並べるコンポーネント
const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-4">
        <Icon className="h-6 w-6 text-gray-500" />
        <div>
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
    </div>
);

export default async function BookingDetailsPage({ params }) {
  const { bookingId } = params;
  const booking = await getBookingDetails(bookingId);

  if (!booking) {
    notFound(); // 予約が見つからなければ404ページを表示
  }

  const { car, customer, rentalDetails, createdAt } = booking;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* ヘッダーセクション */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-blue-200 text-lg">ご予約の詳細</p>
                    <h1 className="text-white text-4xl font-bold mt-1">予約番号: {bookingId.split('-')[0]}</h1>
                </div>
                 <div className="text-right">
                    <p className="text-blue-200 text-sm">予約日</p>
                    <p className="text-white text-lg font-semibold">{new Date(createdAt).toLocaleDateString('ja-JP')}</p>
                </div>
            </div>
        </div>

        <div className="p-8 md:p-10">
          {/* 車両情報 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b pb-8 mb-8">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">ご予約の車両</p>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">{`${car.make} ${car.model}`}</h2>
            </div>
            <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-lg">
              <Image src={car.image} alt={`${car.make} ${car.model}`} layout="fill" objectFit="cover" />
            </div>
          </div>

          {/* 詳細情報グリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            
            {/* お客様情報 */}
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-4">お客様情報</h3>
                <InfoRow icon={UserCircleIcon} label="お名前" value={customer.name} />
                <InfoRow icon={MailIcon} label="メールアドレス" value={customer.email} />
            </div>

            {/* ご利用料金 */}
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 border-l-4 border-green-500 pl-4">ご利用料金</h3>
                <InfoRow icon={CurrencyYenIcon} label="基本料金" value={`¥${(car.price * rentalDetails.days).toLocaleString()}`} />
                <InfoRow icon={TagIcon} label="オプション料金" value={`¥${rentalDetails.optionsPrice.toLocaleString()}`} />
                <div className="border-t pt-4">
                    <InfoRow icon={CurrencyYenIcon} label="合計金額" value={<span className="font-extrabold text-2xl">¥{rentalDetails.totalPrice.toLocaleString()}</span>} />
                </div>
            </div>

          </div>

           {/* フッター */}
          <div className="mt-12 text-center border-t pt-8">
                <p className="text-gray-600 mb-4">ご予約内容についてご不明な点がございましたら、お気軽にお問い合わせください。</p>
                <Link href="/" legacyBehavior>
                    <a className="inline-block bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors">
                        トップページに戻る
                    </a>
                </Link>
            </div>

        </div>
      </div>
    </div>
  );
}
