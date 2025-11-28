# Rent-a-Car Application Blueprint

## 1. Overview

This document outlines the architecture, features, and development plan for a comprehensive car rental web application. The project is divided into two core modules: a self-check-in system for existing reservations and a full-featured booking and account management system.

## 2. Core Technologies

- **Frontend:** Next.js (React Framework)
- **Backend & Database:** Firebase (Firestore, Cloud Storage, Firebase Authentication)
- **Payment Processing:** Stripe
- **Styling:** CSS Modules, Heroicons
- **OCR:** Tesseract.js

---

## 3. Module 1: Self-Check-in System (Implemented)

This module allows users with an existing reservation to perform a fully digital check-in, enhancing operational efficiency and user convenience.

### 3.1. Application Flow

1.  **Reservation Search (`/checkin/search`)**: Users find their booking using their phone number. The page supports both English and Japanese.
2.  **License Scan & OCR (`/checkin/[bookingId]/scan`)**: Users upload a photo of their driver's license. Text (Name, License #) is automatically extracted using OCR.
3.  **Face Scan (`/checkin/[bookingId]/face-scan`)**: A placeholder for future facial recognition, currently implemented as a skippable step.
4.  **Check-in Complete (`/checkin/[bookingId]/complete`)**: The user receives a confirmation message and the PIN code for the key box.

### 3.2. Core Features

- **Internationalization (i18n):** The user-facing check-in flow is multilingual.
- **OCR:** Automatic and client-side extraction of driver's license data.
- **File Uploads:** Securely uploads images to Firebase Storage.
- **Real-time Updates:** Firestore is used to manage and update the check-in status in real-time.

---

## 4. Module 2: Booking & Account System (Development Plan)

This module will expand the application to include user accounts, real-time vehicle booking, and online payments, transforming it into a complete booking platform.

### Phase 1: User Authentication Foundation

**Goal:** Implement a complete user sign-up and login system.
- **Tasks:**
    - Integrate **Firebase Authentication** for secure user management.
    - Create UI pages: `/signup` and `/login`.
    - Implement a global authentication context (`AuthContext`) to manage user state throughout the app.
    - Update the main navigation to dynamically show user status (e.g., "Login" vs. "My Account").

### Phase 2: Real-time Inventory & Booking Flow

**Goal:** Allow users to see available cars and initiate a booking.
- **Tasks:**
    - Create a `cars` collection in Firestore to store vehicle details (name, images, price, availability).
    - Develop a component on the homepage to display available cars in real-time.
    - Build a booking page (`/booking/[carId]`) where users can select reservation dates.

### Phase 3: Payment Integration (Stripe)

**Goal:** Securely process payments for new bookings.
- **Tasks:**
    - Integrate the Stripe React SDK for the frontend.
    - Create a Next.js API route (`/api/create-payment-intent`) to handle payment logic securely on the server.
    - Design a final payment page where users enter card details.
    - Upon successful payment, create a new `bookings` document in Firestore and update the car's availability.

### Phase 4: User Account & History

**Goal:** Provide a dedicated space for users to manage their account and view their booking history.
- **Tasks:**
    - Create a "My Account" page (`/account`).
    - Display the logged-in user's profile information.
    - Fetch and display a list of the user's past and upcoming bookings, linked via their `userId`.

---

## 5. Updated Firestore Data Model

### `bookings` collection
```json
{
  "bookingId": "auto-generated",
  "userId": "string", // Foreign key to the `users` collection
  "carId": "string", // Foreign key to the `cars` collection
  "bookingStartDate": "timestamp",
  "bookingEndDate": "timestamp",
  "totalPrice": "number",
  "paymentStatus": "string", // e.g., 'paid'
  "status": "string", // e.g., 'confirmed', 'checked-in'
  "driverName": "string",
  "licenseNumber": "string",
  "licenseImageUrl": "string",
  // ... other check-in related fields
}
```

### `users` collection
```json
{
  "uid": "string", // Firebase Auth UID, used as document ID
  "email": "string",
  "displayName": "string",
  "createdAt": "timestamp"
}
```

### `cars` collection
```json
{
  "carId": "string", // Document ID
  "name": "string",
  "brand": "string",
  "imageUrl": "string",
  "pricePerDay": "number",
  "isAvailable": "boolean",
  "features": ["string"]
}
```
