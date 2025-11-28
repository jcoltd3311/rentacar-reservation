
const admin = require('firebase-admin');
const path = require('path');

// 環境変数からサービスアカウントキーのファイルパスを取得
const keyFileName = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

if (!keyFileName) {
  console.error('Error: FIREBASE_SERVICE_ACCOUNT_KEY_PATH environment variable not set.');
  process.exit(1);
}

// プロジェクトのルートディレクトリを基準にした絶対パスを構築
const serviceAccountPath = path.resolve(process.cwd(), keyFileName);

let serviceAccount;
try {
  serviceAccount = require(serviceAccountPath);
} catch (error) {
  console.error(`Error: Could not load service account key from ${serviceAccountPath}.`);
  console.error('Please ensure the file exists and the path is correct.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// search/page.js からコピーした車両データ
const cars = [
  { id: 1, make: 'Toyota', model: 'Camry', price: 8000, seats: 5, image: '/cars/camry.png' },
  { id: 2, make: 'Honda', model: 'CR-V', price: 9000, seats: 5, image: '/cars/crv.png' },
  { id: 3, make: 'Ford', model: 'Explorer', price: 12000, seats: 7, image: '/cars/explorer.png' },
  { id: 4, make: 'Nissan', model: 'Rogue', price: 8500, seats: 5, image: '/cars/rogue.png' },
  { id: 5, make: 'Toyota', model: 'RAV4', price: 9500, seats: 5, image: '/cars/rav4.png' },
  { id: 6, make: 'Honda', model: 'Odyssey', price: 11000, seats: 8, image: '/cars/odyssey.png' },
];

async function seedDatabase() {
  const carsCollection = db.collection('cars');

  console.log('Starting to seed database...');

  // 新しいデータを追加するためのバッチ処理を作成
  const batch = db.batch();
  cars.forEach(car => {
    const docRef = carsCollection.doc(String(car.id));
    batch.set(docRef, car);
  });

  // バッチ処理を実行してデータを書き込む
  await batch.commit();
  console.log(`${cars.length} cars have been successfully added to the database.`);

  console.log('Database seeding completed!');
}

seedDatabase()
  .then(() => {
    console.log('Exiting process.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
