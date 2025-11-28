'use client';

import { I18nProviderClient } from '../locales/client';
import { useParams } from 'next/navigation';
import { AuthProvider } from '../context/AuthContext'; // AuthProviderをインポート

export default function Providers({ children }) {
  const params = useParams();
  const locale = params.locale;

  return (
    <AuthProvider>
      <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
    </AuthProvider>
  );
}
