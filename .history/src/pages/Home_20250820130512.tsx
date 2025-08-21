import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Star,
  ChevronDown,
  Play,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartClick = () => {
    // 실제 구현에서는 라우팅 처리
    console.log("동화 만들기 시작");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 20
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center rounded-lg shadow-sm w-9 h-9 bg-gradient-to-r from-emerald-600 to-teal-600">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-gray-900">
                FaiRY TALE
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden space-x-8 md:flex">
              <button className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600">
                서비스 소개
              </button>
              <button className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600">
                예시 보기
              </button>
              <button className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600">
                고객 지원
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleStartClick}
                className="px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                시작하기
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 md:hidden hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="bg-white border-t border-gray-200 shadow-lg md:hidden">
            <div className="px-6 py-4 space-y-3">
              <button className="block w-full py-2 text-sm font-medium text-left text-gray-700">
                서비스 소개
              </button>
              <button className="block w-full py-2 text-sm font-medium text-left text-gray-700">
                예시 보기
              </button>
              <button className="block w-full py-2 text-sm font-medium text-left text-gray-700">
                고객 지원
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-full text-emerald-700 bg-emerald-50 border-emerald-200">
                <div className="w-2 h-2 mr-2 rounded-full bg-emerald-500 animate-pulse"></div>
                AI 기반 개인화 동화 서비스
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-6xl">
                아이만을 위한
                <br />
                <span className="text-emerald-600">맞춤형 동화책</span>
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-gray-600">
                최신 AI 기술로 아이의 성향과 관심사를 분석하여
                <br />
                세상에 하나뿐인 특별한 이야기를 만들어드립니다.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={handleStartClick}
                  className="flex items-center justify-center px-8 py-3 text-base font-medium text-white transition-all duration-200 rounded-lg bg-emerald-600 group hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  동화 만들기 시작
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button className="flex items-center px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:text-emerald-600">
                  <Play className="w-4 h-4 mr-2" />
                  데모 영상 보기
                </button>
              </div>

              <div className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">4.9/5</span> ·
                    2,500+ 부모님들의 선택
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl rotate-6 opacity-20"></div>
                <div className="relative p-8 bg-white border border-gray-200 shadow-xl rounded-2xl">
                  <img
                    src="/api/placeholder/500/400"
                    alt="FaiRY TALE 동화책 미리보기"
                    className="object-cover w-full h-64 rounded-lg"
                  />
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        지우의 용감한 모험
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium rounded text-emerald-600 bg-emerald-50">
                        맞춤 제작
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      7세 지우가 마법의 숲에서 친구들과 함께하는 특별한 이야기
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
              간단한 3단계로 완성
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              복잡한 과정 없이 몇 분만에 아이만의 특별한 동화를 만나보세요.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "아이 정보 입력",
                description:
                  "아이의 이름, 나이, 성격, 관심사 등 기본 정보를 입력해주세요.",
                icon: "👶",
                color: "emerald",
              },
              {
                step: "2",
                title: "AI 스토리 생성",
                description:
                  "고도화된 AI가 입력된 정보를 바탕으로 맞춤 이야기를 창작합니다.",
                icon: "✨",
                color: "blue",
              },
              {
                step: "3",
                title: "동화책 완성",
                description:
                  "아름다운 일러스트와 함께 완성된 동화책을 확인하고 저장하세요.",
                icon: "📖",
                color: "purple",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="flex items-center justify-center w-16 h-16 text-2xl border-2 border-gray-200 rounded-full bg-gray-50">
                      {step.icon}
                    </div>
                    <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full bg-emerald-600 -top-1 -right-1">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>

                {index < 2 && (
                  <div className="absolute hidden w-full lg:block top-8 left-full">
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-gray-300 transform translate-x-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
              특별한 기능들
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "개인화 스토리",
                description:
                  "아이의 성향을 분석하여 완전히 맞춤화된 이야기를 생성합니다.",
                icon: "🎯",
              },
              {
                title: "고품질 일러스트",
                description:
                  "전문 작가 수준의 아름다운 삽화가 함께 제공됩니다.",
                icon: "🎨",
              },
              {
                title: "교육적 가치",
                description:
                  "재미와 함께 교훈과 학습 효과까지 고려된 스토리입니다.",
                icon: "📚",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white border border-gray-200 rounded-xl"
              >
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              지금 바로 시작해보세요
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              아이를 위한 특별한 동화를 만들어보는 데는 단 몇 분이면 충분합니다.
            </p>
            <button
              onClick={handleStartClick}
              className="px-8 py-3 mt-8 text-base font-medium transition-all duration-200 bg-white rounded-lg text-emerald-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
            >
              무료로 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4 space-x-3">
                <div className="flex items-center justify-center rounded-lg w-9 h-9 bg-gradient-to-r from-emerald-600 to-teal-600">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">
                  FaiRY TALE
                </span>
              </div>
              <p className="max-w-md leading-relaxed text-gray-400">
                AI 기술로 만드는 아이 맞춤형 동화 서비스입니다.
                <br />
                상상력과 창의력을 키우는 특별한 경험을 제공합니다.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                서비스
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <button className="transition-colors hover:text-white">
                    동화 생성
                  </button>
                </li>
                <li>
                  <button className="transition-colors hover:text-white">
                    예시 보기
                  </button>
                </li>
                <li>
                  <button className="transition-colors hover:text-white">
                    API
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                지원
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <button className="transition-colors hover:text-white">
                    도움말
                  </button>
                </li>
                <li>
                  <button className="transition-colors hover:text-white">
                    문의하기
                  </button>
                </li>
                <li>
                  <button className="transition-colors hover:text-white">
                    개인정보처리방침
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 text-sm text-center text-gray-400 border-t border-gray-800">
            <p>&copy; 2025 FaiRY TALE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
