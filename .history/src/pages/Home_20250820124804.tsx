import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Star, ChevronDown, Play } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-lg border-gray-200/20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                FaiRY TALE
              </span>
            </div>
            <button
              onClick={handleStartClick}
              className="px-6 py-2 text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:scale-105"
            >
              시작하기
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 border border-purple-200 rounded-full bg-gradient-to-r from-purple-100 to-pink-100">
                <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">
                  AI 기반 개인화 동화
                </span>
                <div className="w-2 h-2 ml-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
                우리 아이만의
                <br />
                <span className="text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text">
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
                  className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform group bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl hover:shadow-2xl hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                  무료로 시작하기
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
              <div className="relative z-10 p-8 transition-transform duration-500 transform bg-white shadow-2xl rounded-3xl rotate-3 hover:rotate-0">
                <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 flex flex-col items-center justify-center">
                  <div className="mb-4 text-6xl">📚</div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-800">
                    지우의 우주 모험
                  </h3>
                  <p className="text-sm text-center text-gray-600">
                    5살 지우가 우주선을 타고 별들 사이를 여행하며 용기를 배우는
                    이야기
                  </p>
                  <div className="flex items-center mt-4 space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute w-full h-full -top-4 -left-4 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl -z-10"></div>
              <div className="absolute w-full h-full -bottom-4 -right-4 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl -z-20"></div>
            </div>
          </div>
        </div>

        <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>

        <div className="absolute rounded-full top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-3xl"></div>
        <div className="absolute rounded-full bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 blur-3xl"></div>
      </section>



      {/* Footer */}
      <footer className="py-16 text-white bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6 space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
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
            <p>&copy; 2024 FaiRY TALE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
