import { buttonVariants } from '@/components/ui/button';
import { Id } from '@/convex/_generated/dataModel';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchQuery, preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { PostPresence } from '@/components/web/PostPresence';
import { CommentSection } from '@/components/web/CommentSection';
import { getToken } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
import BlogDetailSkeleton from '@/components/web/blog-detail-skeleton';

export default function BlogDetail({ params }: BlogDetailProps) {
  return (
    <Suspense fallback={<BlogDetailSkeleton />}>
      <BlogDetailContent params={params} />
    </Suspense>
  );
}

async function BlogDetailContent({ params }: BlogDetailProps) {
  const { id } = await params;
  const token = await getToken();

  const [post, preloadedComments, userId] = await Promise.all([
    await fetchQuery(api.posts.getPostById, { id }),
    await preloadQuery(api.comments.getCommentsByPostId, {
      id,
    }),
    await fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  if (!userId) {
    return redirect('/auth/login');
  }

  if (!post) {
    return (
      <div>
        <h1 className='text-6xl font-extrabold text-red-500 p-20'>
          No post found
        </h1>
      </div>
    );
  }

  return (
    <div className='max-w-3xl mx-auto py-8 px-4 animate-in fade-in druation-500 relative'>
      <Link
        className={buttonVariants({ variant: 'outline', className: 'mb-4' })}
        href='/blog'
      >
        <ArrowLeft className='size-4' />
        Back to blog
      </Link>
      <div className='relative w-full h-100 mb-8 rounded-xl overflow-hidden shadow-sm'>
        <Image
          src={
            post.imageUrl ??
            'https://images.unsplash.com/photo-1761019646782-4bc46ba43fe9?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt={post.title}
          fill
          className='object-cover hover:scale-105 transition-all duration-500'
          loading='eager'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

      <div className='space-y-4 flex flex-col'>
        <h1 className='text-4xl font-bold tracking-tight text-foreground'>
          {post.title}
        </h1>

        <div className='flex items-center gap-2'>
          <p className='text-sm text-muted-foreground'>
            Posted on:{' '}
            {new Date(post._creationTime).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          {post.authorId && (
            <PostPresence roomId={post._id} userId={post.authorId} />
          )}
        </div>
      </div>

      <Separator className='my-8' />

      <p className='text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap'>
        {post.content}
      </p>

      <Separator className='my-8' />

      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
}
