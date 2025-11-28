'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import LanguageSwitcher from './LanguageSwitcher';

// アイコンコンポーネント
const CarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 12 16 12H8c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v4" />
    <circle cx="8" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="16" cy="17" r="2" />
  </svg>
);

const UserCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
);


export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                <CarIcon className="h-8 w-8 text-blue-600" />
                <span>NextRent</span>
            </Link>
          </div>

          {/* 中央のナビゲーション */}
          <nav className="hidden md:flex items-center gap-8">
             <Link href="/" className="font-medium text-gray-600 hover:text-blue-600 transition-colors pb-1 border-b-2 border-transparent hover:border-blue-600">
                 トップ
             </Link>
             <Link href="/#car-list-section" className="font-medium text-gray-600 hover:text-blue-600 transition-colors pb-1 border-b-2 border-transparent hover:border-blue-600">
                 車両一覧
             </Link>
          </nav>

          {/* 右端の要素 */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="hidden md:flex items-center gap-4">
              {loading ? (
                <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>
              ) : user ? (
                    <>
                      <Link href="/account" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                        <UserCircleIcon className="w-5 h-5"/>
                        <span>マイページ</span>
                      </Link>
                      <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800">
                        ログアウト
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                          ログイン
                      </Link>
                      <Link href="/signup" className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                          アカウント登録
                      </Link>
                    </>
              )}
            </div>
          </div>

           {/* モバイル用のハンバーガーメニューボタン（将来的な実装用） */}
           <div className="md:hidden flex items-center">
                {/* <button> ... </button> */}
           </div>

        </div>
      </div>
    </header>
  );
}
