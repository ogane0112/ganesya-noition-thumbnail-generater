import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// Edge Runtimeを使用する設定
export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    // クエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text") ?? "Default Text";
    const bgColor1 = `#${searchParams.get("bgColor1") ?? "f3f3f3"}`; // 背景色1
    const bgColor2 = `#${searchParams.get("bgColor2") ?? "ffffff"}`; // 背景色2
    const textColor = `#${searchParams.get("textColor") ?? "333333"}`;
    const design = searchParams.get("design") ?? "default"; // デザインタイプ

    // デザインごとのスタイル設定
    let backgroundStyle: React.CSSProperties;
    switch (design) {
      case "polka-dots":
        backgroundStyle = {
          backgroundColor: bgColor1,
          backgroundImage: `radial-gradient(${bgColor2} 10%, transparent 10%)`,
          backgroundSize: "50px 50px",
        };
        break;
      case "retro":
        backgroundStyle = {
          backgroundColor: bgColor1,
          backgroundImage: `
            linear-gradient(45deg, ${bgColor2} 25%, transparent 25%, transparent 75%, ${bgColor2} 75%, ${bgColor2}),
            linear-gradient(45deg, ${bgColor2} 25%, ${bgColor1} 25%, ${bgColor1} 75%, ${bgColor2} 75%, ${bgColor2})
          `,
          backgroundSize: "50px 50px",
          backgroundPosition: "0 0, 25px 25px",
        };
        break;
      case "gradient":
        backgroundStyle = {
          backgroundImage: `linear-gradient(to right, ${bgColor1}, ${bgColor2})`,
        };
        break;
      default:
        backgroundStyle = {
          backgroundColor: bgColor1,
        };
        break;
    }

    // ImageResponseで画像を生成
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "1200px",
            height: "630px",
            color: textColor,
            fontSize: "48px",
            fontWeight: "bold",
            ...backgroundStyle, // 背景スタイルを適用
          }}
        >
          <h1 style={{ marginBottom: "20px", textAlign: "center" }}>{text}</h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}





