"use client"

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SearchParamsWrapper() {
  const searchParams = useSearchParams();
  return <YourComponentUsingSearchParams searchParams={searchParams} />;
}

export default function SuspenseWrapper({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}
