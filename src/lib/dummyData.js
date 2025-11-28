
export const dummyCars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    type: 'sedan',
    store: 'store1',
    price: 8000, 
    availability: [
      {
        date: '2024-08-10',
        available: true,
      },
      {
        date: '2024-08-11',
        available: false,
      },
    ],
  },
  {
    id: 2,
    make: 'Honda',
    model: 'CR-V',
    type: 'suv',
    store: 'store2',
    price: 10000,
    availability: [
      {
        date: '2024-08-12',
        available: true,
      },
    ],
  },
  {
    id: 3,
    make: 'Ford',
    model: 'F-150',
    type: 'truck',
    store: 'store1',
    price: 12000,
    availability: [
      {
        date: '2024-08-10',
        available: true,
      },
    ],
  },
];

export const dummyOptions = [
  { id: 1, name: 'チャイルドシート', price: 1000 },
  { id: 2, name: '追加の保険', price: 2000 },
  { id: 3, name: 'カーナビ', price: 500 },
];
