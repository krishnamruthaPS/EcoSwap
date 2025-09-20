// /app/analytics/page.js
import { Suspense } from 'react';
import { Header } from "@/components/header";
import { AnalyticsContent } from "@/components/analytics/analytics-content";

// This component will handle the suspended content
function AnalyticsContentWrapper() {
  return <AnalyticsContent />;
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Wrap the client component in Suspense */}
        <Suspense fallback={<div>Loading analytics...</div>}>
          <AnalyticsContentWrapper />
        </Suspense>
      </main>
    </div>
  );
}
