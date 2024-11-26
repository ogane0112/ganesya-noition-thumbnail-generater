import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const text = searchParams.get('text') || 'Hello, World!'
  const bgColor = searchParams.get('bgColor') || 'f3f3f3'
  const textColor = searchParams.get('textColor') || '333333'

  return new ImageResponse(
    (
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="400" fill={`#${bgColor}`} />
        <text
          x="300"
          y="200"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill={`#${textColor}`}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {text}
        </text>
      </svg>
    ),
    {
      width: 600,
      height: 400,
    }
  )
}






