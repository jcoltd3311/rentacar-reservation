
"use client";
import { useState, useEffect } from 'react';

// アイコンコンポーネント
const FilterIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

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

const SortAscIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 16 4 4 4-4"/>
        <path d="M7 20V4"/>
        <path d="M11 4h10"/>
        <path d="M11 8h7"/>
        <path d="M11 12h4"/>
    </svg>
);


// 検索フォームコンポーネント
export default function Search({ onSearch }) {
    // フィルター条件を単一のstateオブジェクトで管理
    const [filters, setFilters] = useState({
        make: 'all',
        seats: '',
        sort: 'price-asc'
    });

    // フィルター条件が変更されたときに親コンポーネントに通知
    useEffect(() => {
        onSearch(filters);
    }, [filters, onSearch]);

    // 入力値が変更されたときのハンドラ
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    return (
        <div className="mb-12 -mt-20 md:-mt-16 relative z-20">
            <div className="bg-white p-6 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
                <div className="flex items-center gap-4 mb-4">
                    <FilterIcon className="h-6 w-6 text-gray-500" />
                    <h2 className="text-2xl font-bold text-gray-800">絞り込み検索</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* メーカー選択 */}
                    <div className="flex flex-col">
                        <label htmlFor="make" className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
                            <CarIcon className="h-5 w-5 mr-2 text-gray-400" />
                            メーカー
                        </label>
                        <select id="make" name="make" value={filters.make} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white">
                            <option value="all">すべてのメーカー</option>
                            <option value="Toyota">トヨタ</option>
                            <option value="Honda">ホンダ</option>
                            <option value="Nissan">日産</option>
                            <option value="Ford">フォード</option>
                        </select>
                    </div>

                    {/* 乗車人数入力 */}
                    <div className="flex flex-col">
                        <label htmlFor="seats" className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
                            <UsersIcon className="h-5 w-5 mr-2 text-gray-400" />
                            乗車人数（以上）
                        </label>
                        <input type="number" id="seats" name="seats" value={filters.seats} onChange={handleChange} min="1" placeholder="例: 4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                    </div>

                    {/* 並び順選択 */}
                    <div className="flex flex-col">
                        <label htmlFor="sort" className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
                            <SortAscIcon className="h-5 w-5 mr-2 text-gray-400" />
                            並び順
                        </label>
                        <select id="sort" name="sort" value={filters.sort} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white">
                            <option value="price-asc">価格の安い順</option>
                            <option value="price-desc">価格の高い順</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
