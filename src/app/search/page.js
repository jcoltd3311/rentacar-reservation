
"use client";
import React, { useState } from "react";
import Search from "./Search";
import SearchResults from "./SearchResults";
import { dummyCars } from "../../lib/dummyData";
import styles from "./search.module.css";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState(dummyCars);

  const handleSearch = (searchParams) => {
    const { pickupLocation, carType } = searchParams;

    const filteredResults = dummyCars.filter((car) => {
      const isLocationMatch = pickupLocation ? car.store.toLowerCase().includes(pickupLocation.toLowerCase()) : true;
      const isTypeMatch = carType ? car.type === carType : true;
      
      // 日時のフィルタリングは、ダミーデータに具体的な時間情報がないため、ここでは割愛します。
      // 実際のアプリケーションでは、予約状況と日時を考慮した複雑なロジックが必要になります。

      return isLocationMatch && isTypeMatch;
    });

    setSearchResults(filteredResults);
  };

  return (
    <main className={styles.main}>
      <Search onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </main>
  );
};

export default SearchPage;
