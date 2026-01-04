import React from 'react';

const BlogDetailSkeleton = () => {
  return (
    <div className='max-w-3xl mx-auto py-8 px-4'>
      <div className='animate-pulse space-y-4'>
        <div className='h-10 bg-muted rounded w-32' />
        <div className='h-96 bg-muted rounded' />
        <div className='h-12 bg-muted rounded w-3/4' />
        <div className='h-6 bg-muted rounded w-1/2' />
      </div>
    </div>
  );
};

export default BlogDetailSkeleton;
