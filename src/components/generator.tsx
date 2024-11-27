'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ThumbnailGenerator() {
  const [text, setText] = useState('');
  const [bgColor1, setBgColor1] = useState('f3f3f3'); // 背景色1
  const [bgColor2, setBgColor2] = useState('ffffff'); // 背景色2
  const [textColor, setTextColor] = useState('333333');
  const [design, setDesign] = useState('default'); // デザインタイプの選択

  const generateThumbnailUrl = () => {
    const baseUrl = `/api/generate`;
    const params = new URLSearchParams({
      text,
      bgColor1,
      bgColor2,
      textColor,
      design,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Notion Thumbnail Generator</h1>
      <div className="space-y-4">
        {/* テキスト入力 */}
        <div>
          <Label htmlFor="text-input">Enter text for thumbnail</Label>
          <Input
            id="text-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here"
            className="mt-1"
          />
        </div>

        {/* 背景色1 */}
        <div>
          <Label htmlFor="bg-color-1">Background Color #1</Label>
          <Input
            id="bg-color-1"
            type="color"
            value={`#${bgColor1}`}
            onChange={(e) => setBgColor1(e.target.value.slice(1))}
            className="mt-1"
          />
        </div>

        {/* 背景色2 */}
        <div>
          <Label htmlFor="bg-color-2">Background Color #2</Label>
          <Input
            id="bg-color-2"
            type="color"
            value={`#${bgColor2}`}
            onChange={(e) => setBgColor2(e.target.value.slice(1))}
            className="mt-1"
          />
        </div>

        {/* テキスト色 */}
        <div>
          <Label htmlFor="text-color">Text Color</Label>
          <Input
            id="text-color"
            type="color"
            value={`#${textColor}`}
            onChange={(e) => setTextColor(e.target.value.slice(1))}
            className="mt-1"
          />
        </div>

        {/* デザイン選択 */}
        <div>
          <Label htmlFor="design-select">Select Design</Label>
          <select
            id="design-select"
            value={design}
            onChange={(e) => setDesign(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          >
            <option value="default">Default</option>
            <option value="polka-dots">Polka Dots</option>
            <option value="retro">Retro</option>
            <option value="gradient">Gradient</option>
          </select>
        </div>
      </div>

      {/* サムネイルプレビュー */}
      <div className="mt-4">
        <img
          src={generateThumbnailUrl()}
          alt="Generated Thumbnail"
          className="w-full h-auto border border-gray-300"
        />
      </div>

      {/* サムネイルダウンロードボタン */}
      <Button
        onClick={() => window.open(generateThumbnailUrl(), '_blank')}
        className="w-full mt-4"
      >
        Download Thumbnail
      </Button>
    </div>
  );
}

