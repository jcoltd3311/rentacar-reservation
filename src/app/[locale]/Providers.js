
'use client';

import React from 'react';

// このコンポーネントは、テーマ管理やデータ取得ライブラリのProviderなど、
// クライアントサイドで状態を共有するためのラッパーです。
// 現状は特定のProviderを持ちませんが、サーバーとクライアントの境界を明確に定義します。
export default function Providers({ children }) {
  return <>{children}</>;
}
