// File: app/api/facebook/login/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/facebook/callback`;

  // Ei permission gulo amader darkar post kora o page er data anar jonno
  const scope = 'pages_show_list,pages_read_engagement,pages_manage_posts';

  const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;

  return NextResponse.redirect(facebookAuthUrl);
}