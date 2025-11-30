
// src/lib/mockData.js

// Dummy data for vehicles
export const vehicles = [
  { id: 'v001', name: 'Toyota Corolla', class: 'Standard', registration: 'Y 123-456', status: 'available' },
  { id: 'v002', name: 'Honda Civic', class: 'Standard', registration: 'A 789-012', status: 'rented' },
  { id: 'v003', name: 'Nissan Leaf', class: 'Eco', registration: 'E 345-678', status: 'available' },
  { id: 'v004', name: 'Toyota Alphard', class: 'Premium', registration: 'P 901-234', status: 'maintenance' },
  { id: 'v005', name: 'Suzuki Jimny', class: 'SUV', registration: 'S 567-890', status: 'available' },
];

// Dummy data for customers
export const customers = [
  { id: 1, name: 'Taro Yamada', email: 'taro@example.com', phone: '090-1234-5678' },
  { id: 2, name: 'Hanako Tanaka', email: 'hanako@example.com', phone: '080-9876-5432' },
  { id: 3, name: 'Jiro Suzuki', email: 'jiro@example.com', phone: '070-1111-2222' },
  { id: 4, name: 'Saburo Sato', email: 'saburo@example.com', phone: '090-3333-4444' },
];

// Dummy data for bookings
export let bookings = [
    { id: 1, customerId: 1, vehicleId: 'v001', startDate: '2024-07-25', endDate: '2024-07-28', status: 'confirmed', totalFee: 25000, source: 'Web' },
    { id: 2, customerId: 2, vehicleId: 'v002', startDate: '2024-08-01', endDate: '2024-08-05', status: 'pending', totalFee: 42000, source: '電話' },
    { id: 3, customerId: 3, vehicleId: 'v003', startDate: '2024-07-28', endDate: '2024-07-30', status: 'confirmed', totalFee: 18000, source: 'エージェント' },
    { id: 4, customerId: 1, vehicleId: 'v004', startDate: '2024-08-10', endDate: '2024-08-12', status: 'cancelled', totalFee: 15000, source: 'Web' },
    { id: 5, customerId: 2, vehicleId: 'v001', startDate: '2024-08-15', endDate: '2024-08-18', status: 'confirmed', totalFee: 28000, source: 'Web' },
    { id: 6, customerId: 4, vehicleId: 'v005', startDate: '2024-07-29', endDate: '2024-08-02', status: 'confirmed', totalFee: 55000, source: '電話' },
];
export const updateBooking = (updatedBooking) => {
  const index = bookings.findIndex(b => b.id === updatedBooking.id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updatedBooking };
  }
};


// Dummy data for agents
export const agents = [
    { id: 1, name: 'Agent A', commissionRate: 10 },
    { id: 2, name: 'Agent B', commissionRate: 12 },
];
export const agentTransactions = [
    { id: 1, agentId: 1, bookingId: 3, amount: 1800, status: 'paid' }
];
export const addAgentTransaction = (transaction) => {
    agentTransactions.push({id: agentTransactions.length + 1, ...transaction});
}
export const updateAgentTransactionStatus = (id, status) => {
    const transaction = agentTransactions.find(t => t.id === id);
    if(transaction) transaction.status = status;
}

// Dummy data for coupons
export const coupons = [
    { id: 1, code: 'SUMMER2024', discount: 10, type: 'percentage' },
    { id: 2, code: 'WELCOME1000', discount: 1000, type: 'fixed' },
];
export const addCoupon = (coupon) => {
    coupons.push({id: coupons.length + 1, ...coupon});
}
export const updateCoupon = (updatedCoupon) => {
    const index = coupons.findIndex(c => c.id === updatedCoupon.id);
    if (index !== -1) {
        coupons[index] = { ...coupons[index], ...updatedCoupon };
    }
}


// Dummy data for staff
export const staff = [
    { id: 1, name: 'Ichiro Manager' },
    { id: 2, name: 'Goro Staff' },
];

// Dummy data for daily inspections
export const defaultInspectionItems = [
    { id: 'tires', label: 'Tire Pressure' },
    { id: 'lights', label: 'Lights Check' },
    { id: 'oil', label: 'Oil Level' },
    { id: 'brakes', label: 'Brakes' },
    { id: 'exterior', label: 'Exterior Scratches' },
];
export const dailyInspections = [
    { id: 1, vehicleId: 'v001', date: '2024-07-25', staffId: 1, results: { tires: 'OK', lights: 'OK', oil: 'OK', brakes: 'OK', exterior: 'NG' }, comments: 'Small scratch on rear bumper' },
];
export const addDailyInspection = (inspection) => {
    dailyInspections.push({id: dailyInspections.length + 1, ...inspection});
}

// Dummy data for fee settings
export const feeSettings = [
    { id: 1, name: 'Late Return Fee', amount: 2000, unit: 'per_hour' },
    { id: 2, name: 'Cleaning Fee', amount: 5000, unit: 'fixed' },
];

// Dummy data for transactions (for reports)
export const transactions = [
    { id: 1, bookingId: 1, amount: 25000, type: 'rental_fee', date: '2024-07-28' },
    { id: 2, bookingId: 3, amount: 18000, type: 'rental_fee', date: '2024-07-30' },
    { id: 3, bookingId: 5, amount: 28000, type: 'rental_fee', date: '2024-08-18' },
    { id: 4, bookingId: 6, amount: 55000, type: 'rental_fee', date: '2024-08-02' },
];
export const addTransaction = (transaction) => {
    transactions.push({id: transactions.length + 1, ...transaction});
}


// Dummy data for offices
export const offices = [
    { id: 1, name: 'Main Office' },
    { id: 2, name: 'Airport Office' },
];

// Dummy data for transport bureau reports
export const landTransportReports = [
    { id: 1, month: '2024-07', officeId: 1, generatedDate: '2024-08-01', submittedDate: '2024-08-05' }
];
export const generateReport = (report) => {
    landTransportReports.push({id: landTransportReports.length + 1, ...report});
}
export const markAsSubmitted = (id) => {
    const report = landTransportReports.find(r => r.id === id);
    if(report) report.submittedDate = new Date().toISOString().split('T')[0];
}

// Dummy current user
export const currentUser = {
  id: 1,
  name: 'Ichiro Manager',
  role: 'admin',
};
