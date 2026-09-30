import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/social-studio/accounts?error=missing_code`);

  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/facebook/callback`;

  try {
    const tokenRes = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`);
    const tokenData = await tokenRes.json();
    if (tokenData.error) throw new Error(tokenData.error.message);

    const pagesRes = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${tokenData.access_token}`);
    const pagesData = await pagesRes.json();

    if (pagesData.data && pagesData.data.length > 0) {
      const page = pagesData.data[0];
      
      // Next.js 15 Fix: cookies() এর আগে await বসানো হয়েছে
      const cookieStore = await cookies();
      cookieStore.set('fb_page_access_token', page.access_token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30 Days
      });

      const pageName = encodeURIComponent(page.name);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/social-studio/accounts?success=true&pageName=${pageName}&pageId=${page.id}`);
    } else {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/social-studio/accounts?success=true&no_pages=true`);
    }
  } catch (error) {
    console.error('OAuth Error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/social-studio/accounts?error=server_error`);
  }
}