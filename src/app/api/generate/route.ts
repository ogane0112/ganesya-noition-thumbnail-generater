import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const text = searchParams.get('text') || 'Hello, World!'
  const bgColor = searchParams.get('bgColor') || 'f3f3f3'
  const textColor = searchParams.get('textColor') || '333333'

  const svg:any = `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#${bgColor}" />
      <text
        x="300"
        y="200"
        font-family="Arial, sans-serif"
        font-size="24"
        font-weight="bold"
        fill="#${textColor}"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `

  return new ImageResponse(svg, {
    width: 600,
    height: 400,
  })
}



