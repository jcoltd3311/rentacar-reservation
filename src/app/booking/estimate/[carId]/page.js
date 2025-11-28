
"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { dummyCars, dummyOptions } from '../../../../lib/dummyData';
import styles from './estimate.module.css';

const EstimatePage = () => {
  const router = useRouter();
  const { carId } = useParams();
  const car = dummyCars.find((c) => c.id === parseInt(carId));

  const [rentalDays, setRentalDays] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (e, option) => {
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((opt) => opt.id !== option.id));
    }
  };

  const { basePrice, optionsPrice, totalPrice } = useMemo(() => {
    const base = car ? car.price * rentalDays : 0;
    const options = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
    return {
      basePrice: base,
      optionsPrice: options,
      totalPrice: base + options,
    };
  }, [car, rentalDays, selectedOptions]);

  if (!car) {
    return <p className={styles.loading}>車が見つかりません。</p>;
  }

  const handlePayment = () => {
    // 支払いページに情報を渡して遷移
    sessionStorage.setItem('bookingDetails', JSON.stringify({ car, rentalDays, selectedOptions, totalPrice }));
    router.push('/booking/payment');
  };

  return (
    <div className={styles.container}>
      <div className={styles.carDetailsSection}>
        <div className={styles.imageContainer}>
          <Image 
            src={"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
            alt={`${car.make} ${car.model}`}
            width={600}
            height={400}
            className={styles.carImage}
          />
        </div>
        <div className={styles.detailsText}>
            <h1 className={styles.carTitle}>{`${car.make} ${car.model}`}</h1>
            <p className={styles.carType}>タイプ: {car.type}</p>
            <p className={styles.carInfo}>店舗: {car.store}</p>
            <p  className={styles.carInfo}>基本的な機能についての説明が入ります。例えば、ナビ、ETC、禁煙など</p>
        </div>
      </div>

      <div className={styles.estimateSection}>
        <h2 className={styles.sectionTitle}>レンタル期間とオプション</h2>
        <div className={styles.formGroup}>
          <label htmlFor="rental-days">レンタル日数</label>
          <input 
            type="number" 
            id="rental-days" 
            value={rentalDays} 
            onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value)))}
            min="1"
            className={styles.inputDays}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>追加オプション</label>
          <div className={styles.optionsGrid}>
            {dummyOptions.map(option => (
              <div key={option.id} className={styles.optionItem}>
                <input 
                  type="checkbox" 
                  id={`option-${option.id}`} 
                  onChange={(e) => handleOptionChange(e, option)}
                />
                <label htmlFor={`option-${option.id}`}>{`${option.name} (+¥${option.price.toLocaleString()})`}</label>
              </div>
            ))}
          </div>
        </div>

        <h2 className={styles.sectionTitle}>料金見積もり</h2>
        <div className={styles.priceDetails}>
          <p>基本料金 ({rentalDays}日間): <span>&yen;{basePrice.toLocaleString()}</span></p>
          <p>オプション料金: <span>&yen;{optionsPrice.toLocaleString()}</span></p>
          <hr />
          <p className={styles.totalPrice}>合計金額: <span>&yen;{totalPrice.toLocaleString()}</span></p>
        </div>

        <button onClick={handlePayment} className={styles.paymentButton}>
          お支払いへ進む
        </button>
      </div>
    </div>
  );
};

export default EstimatePage;
