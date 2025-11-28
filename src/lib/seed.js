import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const carsData = [
    {
        id: 'toyota-yaris',
        name: 'トヨタ ヤリス',
        brand: 'トヨタ',
        type: 'コンパクト',
        capacity: 5,
        pricePerDay: 8000,
        imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Toyota+Yaris',
        features: ['ナビ', 'ETC', 'Bluetooth', '禁煙'],
        available: true,
    },
    {
        id: 'honda-fit',
        name: 'ホンダ フィット',
        brand: 'ホンダ',
        type: 'コンパクト',
        capacity: 5,
        pricePerDay: 8500,
        imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Honda+Fit',
        features: ['ナビ', 'ETC', 'バックカメラ', '禁煙'],
        available: true,
    },
    {
        id: 'nissan-serena',
        name: '日産 セレナ',
        brand: '日産',
        type: 'ミニバン',
        capacity: 8,
        pricePerDay: 15000,
        imageUrl: 'https://placehold.co/600x400/10b981/ffffff?text=Nissan+Serena',
        features: ['ナビ', 'ETC', '両側電動スライドドア', '禁煙', '後席モニター'],
        available: true,
    },
    {
        id: 'mazda-cx-5',
        name: 'マツダ CX-5',
        brand: 'マツダ',
        type: 'SUV',
        capacity: 5,
        pricePerDay: 13000,
        imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Mazda+CX-5',
        features: ['ナビ', 'ETC', 'レザーシート', 'サンルーフ', '禁煙'],
        available: false, // 在庫切れのテスト用
    },
    {
        id: 'subaru-levorg',
        name: 'スバル レヴォーグ',
        brand: 'スバル',
        type: 'ステーションワゴン',
        capacity: 5,
        pricePerDay: 14000,
        imageUrl: 'https://placehold.co/600x400/f97316/ffffff?text=Subaru+Levorg',
        features: ['ナビ', 'ETC', 'アイサイト', 'AWD', '禁煙'],
        available: true,
    },
];

export const seedDatabase = async () => {
    const carsCollection = collection(db, 'cars');
    let count = 0;
    try {
        console.log('Seeding database...');
        for (const car of carsData) {
            // Use the specific ID from the data to prevent duplicates
            const docRef = doc(carsCollection, car.id);
            await setDoc(docRef, car, { merge: true }); // Use merge to avoid overwriting existing fields unintentionally
            count++;
        }
        console.log(`Successfully seeded ${count} cars.`);
        return { success: true, count };
    } catch (error) {
        console.error('Error seeding database:', error);
        return { success: false, error };
    }
};
