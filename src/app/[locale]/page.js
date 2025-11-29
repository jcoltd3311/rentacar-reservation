
import { getI18n } from '../../lib/i18n/server';

export default async function Home() {
  const t = await getI18n();

  return (
    <main>
      <h1>{t('greeting')}</h1>
    </main>
  );
}
