
'use client'

import { Suspense } from 'react';
import ConfirmedPage from './ConfirmedPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmedPage />
    </Suspense>
  );
}
