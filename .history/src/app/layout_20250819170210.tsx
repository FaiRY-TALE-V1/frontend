import React from "react";
import "../index.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta
          name="description"
          content="🧚‍♀️ FaiRY TALE - AI가 만드는 맞춤형 동화 서비스"
        />
        <title>FaiRY TALE - AI 맞춤형 동화</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        {/* 글로벌 배경 효과 */}
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-indigo-100/20" />

        {/* 메인 콘텐츠 */}
        <main className="relative min-h-screen">{children}</main>

        {/* 글로벌 스크립트 */}
        <div id="modal-root" />
      </body>
    </html>
  );
}
