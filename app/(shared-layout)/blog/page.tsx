/* eslint-disable @next/next/no-img-element */
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/web/loading-skeleton';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blog | Next.js 16 Tutorial',
  description: 'Read our latest articles and insights.',
  category: 'Web development',
  authors: [{ name: 'Jan marshal' }],
};

export default function Blog() {
  return (
    <div className='py-12'>
      <div className='text-center pb-12'>
        <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>
          Our Blog
        </h1>
        <p className='pt-4 max-w-2xl mx-auto text-xl text-muted-foreground'>
          Insights, thoughts, and trends from our team.
        </p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
}

async function LoadBlogList() {
  'use cache';
  cacheLife('hours');
  cacheTag('blog');
  const data = await fetchQuery(api.posts.getPosts);

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {data && data.length > 0 ? (
        data.map((post) => (
          <Card key={post._id} className='pt-0 h-full flex flex-col'>
            <div className='relative h-48 w-full overflow-hidden'>
              <Image
                src={
                  post.imageUrl ??
                  'https://images.unsplash.com/photo-1761019646782-4bc46ba43fe9?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                alt='image'
                fill
                loading='eager'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='rounded-t-lg object-cover'
              />
            </div>

            <CardContent className='flex-auto'>
              <Link href={`/blog/${post._id}`}>
                <h1 className='text-2xl font-bold hover:text-primary'>
                  {post.title}
                </h1>
              </Link>
              <p className='text-muted-foreground line-clamp-3'>
                {post.content}
              </p>
            </CardContent>
            <CardFooter>
              <Link
                className={buttonVariants({
                  className: 'w-full',
                })}
                href={`/blog/${post._id}`}
              >
                Read more
              </Link>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
