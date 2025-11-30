import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { getBasePrice, calculateOptions, applyCoupon } from '@/lib/priceCalculator';

export async function POST(req) {
  try {
    const body = await req.json();
    const { carId, startDate, endDate, options, couponCode, noc, insurance } = body;

    // Validate required fields
    if (!carId || !startDate || !endDate) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const basePrice = await getBasePrice(carId, startDate, endDate);
    const optionPrice = calculateOptions(options || []);
    
    // Calculate additional fees
    const nocFee = noc ? 11000 : 0; // Non-Operation Charge
    const insuranceFee = insurance ? 1650 : 0; // Collision Damage Waiver

    const subtotal = basePrice + optionPrice;
    const discount = await applyCoupon(couponCode, subtotal);

    const total = subtotal + nocFee + insuranceFee - discount;

    const reservation = {
      carId,
      startDate,
      endDate,
      options: options || [],
      couponCode: couponCode || null,
      noc,
      insurance,
      basePrice,
      optionPrice,
      nocFee,
      insuranceFee,
      discount,
      total,
      status: 'pending', // Initial status
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const ref = await db.collection('reservations').add(reservation);
    
    return NextResponse.json({ 
      success: true, 
      id: ref.id, 
      total: reservation.total 
    });

  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
