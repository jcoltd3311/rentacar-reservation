
"use client";
import React, { useState } from "react";
import styles from "./search.module.css";

const Search = ({ onSearch }) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState("");
  const [returnDateTime, setReturnDateTime] = useState("");
  const [carType, setCarType] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      pickupLocation,
      returnLocation,
      pickupDateTime,
      returnDateTime,
      carType,
    });
  };

  return (
    <div className={styles.searchContainer}>
      <h1 className={styles.title}>お探しの車を見つけよう</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="pickup-location">貸出場所</label>
          <input
            type="text"
            id="pickup-location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="例: store1"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="return-location">返却場所</label>
          <input
            type="text"
            id="return-location"
            value={returnLocation}
            onChange={(e) => setReturnLocation(e.target.value)}
            placeholder="例: store2"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="pickup-datetime">貸出日時</label>
          <input
            type="datetime-local"
            id="pickup-datetime"
            value={pickupDateTime}
            onChange={(e) => setPickupDateTime(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="return-datetime">返却日時</label>
          <input
            type="datetime-local"
            id="return-datetime"
            value={returnDateTime}
            onChange={(e) => setReturnDateTime(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="car-type">車両タイプ</label>
          <select
            id="car-type"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          >
            <option value="">すべて</option>
            <option value="sedan">セダン</option>
            <option value="suv">SUV</option>
            <option value="truck">トラック</option>
          </select>
        </div>
        <button type="submit" className={styles.searchButton}>
          検索
        </button>
      </form>
    </div>
  );
};

export default Search;
