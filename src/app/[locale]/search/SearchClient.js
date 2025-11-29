
'use client';

import { useState, useEffect } from 'react';
import Search from './Search';
import SearchResults from './SearchResults';

// このコンポーネントは、サーバーから渡された車両リストを元に、
// クライアントサイドでのインタラクティブな検索・絞り込み機能を提供します。
export default function SearchClient({ initialCars }) {
  // フィルタリングされた結果を保持するstate
  const [filteredResults, setFilteredResults] = useState(initialCars);

  // 検索条件が変更されたときに呼ばれるハンドラ
  const handleSearch = (filters) => {
    let results = [...initialCars];

    // メーカーによる絞り込み
    if (filters.make && filters.make !== 'all') {
      results = results.filter(car => car.make === filters.make);
    }

    // 乗車人数による絞り込み
    if (filters.seats) {
      results = results.filter(car => car.seats >= parseInt(filters.seats, 10));
    }

    // 価格による並べ替え
    if (filters.sort === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    }

    setFilteredResults(results);
  };

  return (
    <div>
      {/* 検索フォームコンポーネント */}
      <Search onSearch={handleSearch} />
      {/* 検索結果表示コンポーネント */}
      <SearchResults results={filteredResults} />
    </div>
  );
}
