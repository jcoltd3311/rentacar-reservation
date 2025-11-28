
import React from 'react';
import Image from 'next/image';
import styles from './SearchResults.module.css';
import { useRouter } from 'next/navigation';

const SearchResults = ({ results }) => {
  const router = useRouter();

  const handleBooking = (carId) => {
    router.push(`/booking/estimate/${carId}`);
  };

  if (!results || results.length === 0) {
    return <p className={styles.noResults}>検索条件に合う車が見つかりませんでした。</p>;
  }

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.resultsTitle}>検索結果</h2>
      <div className={styles.resultsGrid}>
        {results.map((car) => (
          <div key={car.id} className={styles.carCard}>
            <div className={styles.cardImage}>
                <Image 
                    src={"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} // Unsplashの画像URL
                    alt={`${car.make} ${car.model}`}
                    width={300}
                    height={200}
                    className={styles.carImageTag}
                />
            </div>
            <div className={styles.carDetails}>
              <h3 className={styles.carModel}>{`${car.make} ${car.model}`}</h3>
              <p className={styles.carType}>タイプ: {car.type}</p>
              <p className={styles.carPrice}>料金: <strong>&yen;{car.price.toLocaleString()}</strong> / 日</p>
              <button onClick={() => handleBooking(car.id)} className={styles.bookButton}>
                予約する
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
