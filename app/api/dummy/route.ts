// app/api/dummy/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();  // Parse the incoming JSON body
    console.log('Received data:', data);

    // Return the received data as a response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
