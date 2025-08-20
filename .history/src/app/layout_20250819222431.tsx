import React from "react";
import "../index.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* 글로벌 배경 효과 */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-indigo-100/20" />

      {/* 메인 콘텐츠 */}
      <main className="relative min-h-screen">{children}</main>

            {/* 글로벌 스크립트 */}
      <div id="modal-root" />
    </div>
  );
}
