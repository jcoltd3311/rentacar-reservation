
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({ number: '', name: '', expiry: '', cvc: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const validateForm = () => {
    const newErrors = { number: '', name: '', expiry: '', cvc: '' };
    let isValid = true;

    if (!/^(\d{4}[- ]){3}\d{4}$/.test(cardInfo.number)) {
      newErrors.number = '有効なカード番号を入力してください。';
      isValid = false;
    }
    if (cardInfo.name.trim() === '') {
      newErrors.name = 'カード名義人をご入力ください。';
      isValid = false;
    }
    if (!/^\d{2}\/\d{2}$/.test(cardInfo.expiry)) {
      newErrors.expiry = 'MM/YY形式で入力してください。';
      isValid = false;
    }
    if (!/^\d{3,4}$/.test(cardInfo.cvc)) {
      newErrors.cvc = '3桁または4桁のCVCを入力してください。';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // ここで実際の決済処理を呼び出します
      // 今回は成功したと仮定して、予約完了ページに遷移します
      console.log('Processing payment with:', cardInfo);
      router.push('/booking/confirmed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">お支払い情報の入力</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700">カード番号</label>
            <input
              type="text"
              name="number"
              id="number"
              value={cardInfo.number}
              onChange={handleInputChange}
              placeholder="0000-0000-0000-0000"
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border ${errors.number ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.number && <p className="mt-2 text-sm text-red-600">{errors.number}</p>}
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">カード名義人</label>
            <input
              type="text"
              name="name"
              id="name"
              value={cardInfo.name}
              onChange={handleInputChange}
              placeholder="TARO YAMADA"
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">有効期限</label>
              <input
                type="text"
                name="expiry"
                id="expiry"
                value={cardInfo.expiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className={`mt-1 block w-full px-4 py-3 bg-gray-50 border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.expiry && <p className="mt-2 text-sm text-red-600">{errors.expiry}</p>}
            </div>
            <div className="w-1/2">
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">セキュリティコード (CVC)</label>
              <input
                type="text"
                name="cvc"
                id="cvc"
                value={cardInfo.cvc}
                onChange={handleInputChange}
                placeholder="123"
                className={`mt-1 block w-full px-4 py-3 bg-gray-50 border ${errors.cvc ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.cvc && <p className="mt-2 text-sm text-red-600">{errors.cvc}</p>}
            </div>
          </div>
          <button type="submit" className="w-full px-6 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
            支払いを確定して予約を完了する
          </button>
        </form>
      </div>
    </div>
  );
}
