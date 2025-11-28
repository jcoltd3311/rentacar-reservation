
import { db } from "@/lib/firebaseAdmin";
import SearchClient from "./SearchClient";

async function getCars() {
  try {
    const carsSnapshot = await db.collection("cars").orderBy("price", "asc").get();
    const cars = carsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return cars;
  } catch (e) {
    console.error("Firestoreからの車両データ取得エラー:", e);
    // エラーが発生した場合は空の配列を返し、クライアント側でエラーメッセージを表示
    throw new Error("車両データの読み込みに失敗しました。時間をおいて再度お試しください。");
  }
}

export default async function SearchPage() {
  let initialCars = [];
  let error = null;

  try {
    initialCars = await getCars();
  } catch (e) {
    error = e.message;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">車両を探す</h1>
      <p className="text-lg text-gray-600 mb-10">お好みの条件で、ぴったりの一台を見つけましょう。</p>

      {error ? (
        <div className="text-center text-red-500 bg-red-100 p-6 rounded-lg shadow-md">
          <p className="font-semibold">エラーが発生しました</p>
          <p>{error}</p>
        </div>
      ) : (
        <SearchClient initialCars={initialCars} />
      )}
    </div>
  );
}

