
export const dummyCars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    type: 'sedan',
    store: 'store1',
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
    availability: [
      {
        date: '2024-08-10',
        available: true,
      },
    ],
  },
];
