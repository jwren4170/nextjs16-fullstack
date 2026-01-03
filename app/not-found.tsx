'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullUrl, setFullUrl] = useState('');

  function useCurrentUrl() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [fullUrl, setFullUrl] = useState('');

    useEffect(() => {
      // window.location.href gives the complete URL including protocol, host, and all params
      const url = window.location.href;
      setFullUrl(url);
    }, [pathname, searchParams]); // Update if pathname or search params change

    return fullUrl;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-6 px-4 text-center'>
      <div className='space-y-2'>
        <h2 className='text-4xl font-bold tracking-tight'>Not Found</h2>
        <p className='text-muted-foreground text-lg'>
          The requested resource{' '}
          <span className='text-primary font-mono break-all'>
            {useCurrentUrl()}
          </span>{' '}
          could not be found.
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
