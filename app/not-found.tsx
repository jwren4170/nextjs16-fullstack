'use client';

import Link from 'next/link';
import { Suspense } from 'react';

function NotFoundContent() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-6 px-4 text-center'>
      <div className='space-y-2'>
        <h2 className='text-4xl font-bold tracking-tight'>Not Found</h2>
        <p className='text-muted-foreground text-lg'>
          The requested resource could not be found.
        </p>
      </div>
      <Link
        className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all'
        href='/blog'
      >
        View all posts
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense
      fallback={
        <div className='flex flex-col items-center justify-center min-h-screen space-y-6 px-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-4xl font-bold tracking-tight'>Not Found</h2>
            <p className='text-muted-foreground text-lg'>Loading...</p>
          </div>
        </div>
      }
    >
      <NotFoundContent />
    </Suspense>
  );
}
