// File: app/api/facebook/callback/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/social-studio/accounts?error=missing_code`);
  }

  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/facebook/callback`;

  try {
    // Step 1: Code exchange kore Access Token neya
    const tokenResponse = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`);
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Facebook Token Error:', tokenData.error);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/social-studio/accounts?error=token_failed`);
    }

    const accessToken = tokenData.access_token;

    // Step 2: Access token diye user er Connected Pages fetch kora
    const pagesResponse = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${accessToken}`);
    const pagesData = await pagesResponse.json();

    if (pagesData.error) {
      console.error('Facebook Pages Error:', pagesData.error);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/social-studio/accounts?error=pages_failed`);
    }

    // Ekhane amra pore Firebase database e page er data (pagesData.data) save korbo.
    // Console log to check data in terminal
    console.log("Successfully Fetched Facebook Pages:", pagesData.data);

    if (pagesData.data && pagesData.data.length > 0) {
      // যদি পেজ পাওয়া যায়, তবে প্রথম পেজের নাম URL-এর মাধ্যমে ফ্রন্টএন্ডে পাঠিয়ে দিচ্ছি
      const pageName = encodeURIComponent(pagesData.data[0].name);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/social-studio/accounts?success=true&pageName=${pageName}`);
    } else {
      // পেজ না থাকলে no_pages=true পাঠাবো
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/social-studio/accounts?success=true&no_pages=true`);
    }

  } catch (error) {
    console.error('OAuth Callback Error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/social-studio/accounts?error=server_error`);
  }
}