import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { caption, pageId, scheduledUnixTime, mediaBase64 } = await request.json();
    
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('fb_page_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized: Please reconnect your Facebook Page.' }, { status: 401 });
    }

    let fbApiUrl = `https://graph.facebook.com/v18.0/${pageId}/feed`;
    let fetchOptions: RequestInit = {};

    // 🔴 jodi image thake, tahole /photos endpoint use hobe abong FormData pathate hobe
    if (mediaBase64) {
      fbApiUrl = `https://graph.facebook.com/v18.0/${pageId}/photos`;
      
      const formData = new FormData();
      formData.append('message', caption || '');
      formData.append('access_token', accessToken);

      if (scheduledUnixTime) {
        formData.append('published', 'false');
        formData.append('scheduled_publish_time', scheduledUnixTime.toString());
      }

      // Base64 string ke Binary Buffer/Blob a convert kora
      const base64Data = mediaBase64.split(',')[1];
      const mimeType = mediaBase64.split(';')[0].split(':')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      const blob = new Blob([buffer], { type: mimeType });

      formData.append('source', blob, 'post_image.jpg');

      fetchOptions = {
        method: 'POST',
        body: formData, // FormData pathale header automatic set hoy
      };
    } 
    // 🔴 jodi sudhu text thake, tahole /feed endpoint use hobe
    else {
      let fbBody: any = {
        message: caption || '',
        access_token: accessToken,
      };

      if (scheduledUnixTime) {
        fbBody.published = false;
        fbBody.scheduled_publish_time = scheduledUnixTime;
      }

      fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fbBody)
      };
    }

    const response = await fetch(fbApiUrl, fetchOptions);
    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, postId: data.id || data.post_id });
    
  } catch (error) {
    console.error('Publish Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}