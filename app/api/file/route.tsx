import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || "";

  console.log(filename)

  if (!filename) {
    throw new Error("Missing filename to create blob");
  }

  if (!request.body) {
    throw new Error("Missing filename to create blob");
  }

  const blob = await put(filename, request.body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
