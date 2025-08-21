import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Star, Play, ArrowRight, Menu, X } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartClick = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-200 shadow-sm">
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

            <div className="flex items-center space-x-4">
              <button
                onClick={handleStartClick}
                className="px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                시작하기
              </button>

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
      <section
        className="relative flex items-center min-h-screen pt-20 pb-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)",
        }}
      >
        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 opacity-30">
          <div
            className="w-4 h-4 bg-yellow-300 rounded-full"
            style={{
              animation: "float 3s ease-in-out infinite",
              animationDelay: "0s",
            }}
          ></div>
        </div>
        <div className="absolute opacity-25 top-32 right-32">
          <div
            className="w-6 h-6 bg-pink-300 rounded-full"
            style={{
              animation: "float 3s ease-in-out infinite",
              animationDelay: "1s",
            }}
          ></div>
        </div>
        <div className="absolute bottom-40 left-20 opacity-20">
          <div
            className="w-8 h-8 bg-blue-300 rounded-full"
            style={{
              animation: "float 3s ease-in-out infinite",
              animationDelay: "0.5s",
            }}
          ></div>
        </div>
        <div className="absolute opacity-25 top-1/3 left-32">
          <div
            className="w-3 h-3 bg-purple-300 rounded-full"
            style={{
              animation: "float 3s ease-in-out infinite",
              animationDelay: "1.5s",
            }}
          ></div>
        </div>

        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-full text-emerald-700 bg-emerald-50 border-emerald-200">
                <div className="w-2 h-2 mr-2 rounded-full bg-emerald-500 animate-pulse"></div>
                최신 AI 기반 개인화 동화 서비스
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 lg:text-6xl">
                우리 아이만의
                <br />
                <span className="text-emerald-600">마법같은 동화책</span>
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-gray-600">
                최신 AI 기술로 아이의 성향과 관심사를 분석하여
                <br />
                세상에 단 하나뿐인 특별한 이야기를 만들어드립니다.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={handleStartClick}
                  className="flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-200 rounded-xl bg-emerald-600 group hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  동화 만들기 시작
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            <div className="relative lg:pl-8">
              <div className="relative transition-transform duration-500 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl rotate-6 opacity-20"></div>
                <div className="relative p-6 bg-white border border-gray-200 shadow-2xl rounded-3xl">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src="/lion-family.png"
                      alt="FaiRY TALE 동화책 미리보기"
                      className="object-cover w-full h-80"
                      style={{
                        background: "linear-gradient(45deg, #fef3c7, #fed7aa)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#92400e",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.background =
                          "linear-gradient(45deg, #fef3c7, #fed7aa)";
                        target.innerHTML = "🦁 라이온 가족 동화";
                        target.style.display = "flex";
                        target.style.alignItems = "center";
                        target.style.justifyContent = "center";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
             @keyframes float {
               0%, 100% {
                 transform: translateY(0px);
               }
               50% {
                 transform: translateY(-10px);
               }
             }
           `,
          }}
        />
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              단, 3단계로 완성되는 맞춤 동화
            </h2>
            <p className="text-xl text-gray-600">
              복잡한 과정 없이 몇 분만에 아이만의 특별한 동화를 만나보세요.
            </p>
          </div>

          <div className="grid gap-16 lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "아이 정보 입력",
                description:
                  "아이의 이름, 나이, 성격, 관심사 등 기본 정보를 입력해주세요. 더 자세할수록 더욱 특별한 이야기가 만들어집니다.",
                icon: "👶",
                bgColor: "bg-blue-50",
                iconBg: "bg-blue-500",
              },
              {
                step: "2",
                title: "AI가 맞춤 스토리 생성",
                description:
                  "고도화된 AI가 입력된 정보를 바탕으로 아이에게 딱 맞는 이야기를 창작합니다.",
                icon: "🤖",
                bgColor: "bg-purple-50",
                iconBg: "bg-purple-500",
              },
              {
                step: "3",
                title: "동화책 완성!",
                description:
                  "아름다운 일러스트와 함께 완성된 동화책을 확인하고 저장하세요.",
                icon: "📖",
                bgColor: "bg-emerald-50",
                iconBg: "bg-emerald-500",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`relative mb-8 p-6 rounded-3xl ${step.bgColor}`}
                  >
                    <div className="mb-4 text-4xl">{step.icon}</div>
                    <div
                      className={`absolute flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full ${step.iconBg} -top-2 -right-2`}
                    >
                      {step.step}
                    </div>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="max-w-sm text-lg leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>

                {index < 2 && (
                  <div className="absolute hidden w-full lg:block top-16 left-full">
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-gray-300 transform translate-x-8" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
              지금 바로 시작해보세요
            </h2>
            <p className="mb-10 text-xl text-emerald-100">
              아이를 위한 특별한 동화를 만들어보는 데는 단 몇 분이면 충분합니다.
            </p>
            <button
              onClick={handleStartClick}
              className="px-12 py-4 text-lg font-medium transition-all duration-200 transform bg-white shadow-2xl rounded-xl text-emerald-600 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 hover:shadow-3xl hover:-translate-y-1"
            >
              무료로 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-8 space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">FaiRY TALE</span>
            </div>

            <div className="w-full pt-8 text-sm text-center text-gray-400 border-t border-gray-800">
              <p>&copy; 2025 FaiRY TALE. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
