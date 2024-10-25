
import { NextResponse } from 'next/server';

export function middleware(request) {
  const theme = request.cookies.get('theme') || 'dark';
  const response = NextResponse.next();
  response.headers.set('Set-Cookie', `theme=${theme}; Path=/;`);
  response.headers.set('X-Theme', theme); // Set theme as a custom header if needed
  return response;
}
