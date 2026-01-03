import { NextResponse } from 'next/server';

const POST = () => {
  console.log('Hello from the server');

  return NextResponse.json({ success: true });
};

export { POST };
