import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Star, ChevronDown, Play, ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur-lg border-green-200/20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
                FaiRY TALE
              </span>
            </div>
            <button
              onClick={handleStartClick}
              className="px-6 py-3 text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg hover:scale-105"
            >
              바로 시작하기
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 border border-green-200 rounded-full bg-gradient-to-r from-green-100 to-emerald-100">
                <Sparkles className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  AI 기반 개인화 동화
                </span>
                <div className="w-2 h-2 ml-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <h1 className="text-5xl font-bold leading-tight text-gray-800 lg:text-7xl">
                우리 아이만의
                <br />
                <span className="text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 bg-clip-text">
                  마법같은 동화책
                </span>
              </h1>

              <p className="max-w-xl text-xl leading-relaxed text-gray-600">
                최첨단 AI가 아이의 이름, 성격, 관심사를 바탕으로 세상에 단
                하나뿐인 특별한 이야기를 만들어드립니다.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleStartClick}
                  className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform group bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl hover:shadow-2xl hover:scale-105"
                >
                  동화 만들기
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="flex items-center pt-4 space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {["👨", "👩", "👴", "👵"].map((emoji, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center w-10 h-10 text-lg bg-white border-2 border-white rounded-full shadow-lg"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-900">
                      10,000+ 가족
                    </div>
                    <div className="text-xs text-gray-500">
                      이미 함께하고 있어요
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 flex items-center justify-center">
                                 <img
                   src="/line-family.png"
                   alt="사자 가족이 함께 책을 읽는 모습"
                   className="object-contain w-96 h-96 drop-shadow-2xl"
                 />
              </div>

              <div className="absolute w-full h-full -top-4 -left-4 bg-gradient-to-br from-green-200 to-emerald-200 rounded-3xl -z-10"></div>
              <div className="absolute w-full h-full -bottom-4 -right-4 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl -z-20"></div>
            </div>
          </div>
        </div>

        <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-green-400" />
        </div>

        <div className="absolute rounded-full top-20 right-20 w-72 h-72 bg-gradient-to-r from-green-300/10 to-emerald-300/10 blur-3xl"></div>
        <div className="absolute rounded-full bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-teal-300/10 to-cyan-300/10 blur-3xl"></div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              단, 3단계로 완성되는 맞춤 동화
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "아이 정보 입력",
                description:
                  "아이의 이름, 나이, 성격, 좋아하는 것들을 알려주세요",
                icon: "👶",
              },
              {
                step: "02",
                title: "AI가 창작",
                description:
                  "첨단 AI가 아이만을 위한 특별한 이야기를 만들어줍니다",
                icon: "🎁",
              },
              {
                step: "03",
                title: "동화책 완성",
                description:
                  "아름다운 일러스트와 함께 완성된 동화책을 받아보세요",
                icon: "📖",
              },
            ].map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="relative mb-8">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto text-3xl transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-green-100 to-emerald-100 group-hover:scale-110 group-hover:shadow-xl">
                    {step.icon}
                  </div>
                  <div className="absolute flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full shadow-lg -top-2 -right-2 bg-gradient-to-r from-green-600 to-emerald-600">
                    {step.step}
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-600">
                  {step.title}
                </h3>
                <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  {step.description}
                </p>

                {/* 연결선과 장식 */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-green-200 to-emerald-200 transform translate-x-1/2">
                    <div className="absolute top-0 w-2 h-2 transform -translate-x-1/2 bg-green-300 rounded-full left-1/2 animate-pulse"></div>
                    <div className="absolute top-0 w-1 h-1 bg-yellow-300 rounded-full left-1/4 animate-bounce"></div>
                    <div className="absolute top-0 w-1 h-1 bg-blue-300 rounded-full right-1/4 animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-white bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6 space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">FaiRY TALE</span>
              </div>
              <p className="max-w-md mb-6 text-gray-400">
                AI가 만드는 아이 맞춤형 동화로 상상력과 교훈을 함께 키우는
                특별한 경험을 제공합니다.
              </p>
              <div className="flex space-x-4">
                {["📧", "📱", "💬"].map((emoji, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                  >
                    <span className="text-lg">{emoji}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="transition-colors hover:text-white">
                    동화 생성
                  </button>
                </li>
                <li>
                  <button className="transition-colors hover:text-white">
                    템플릿
                  </button>
                </li>
                <li>
                  <button className="transition-colors hover:text-white">
                    일러스트
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
              <h4 className="mb-4 font-semibold">지원</h4>
              <ul className="space-y-2 text-gray-400">
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
                    FAQ
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

          <div className="pt-8 mt-12 text-center text-gray-400 border-t border-gray-800">
            <p>&copy; 2025 FaiRY TALE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
