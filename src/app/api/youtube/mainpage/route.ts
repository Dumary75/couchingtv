
import { NextRequest } from 'next/server';

interface YoutubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('searchitem') || 'trending';

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
        new URLSearchParams({
          part: 'snippet',
          q: query,
          type: 'video',
          maxResults: '6',
          key: process.env.YOUTUBE_API_KEY!,
        })
    );

    const data = await response.json();

    // Nur relevante Daten zurückgeben
    const videos = data.items.map((item: YoutubeSearchItem) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    return Response.json({ videos });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}