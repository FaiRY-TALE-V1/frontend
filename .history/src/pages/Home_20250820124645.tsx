import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Heart,
  BookOpen,
  Star,
  ChevronDown,
  Play,
  Check,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "아이 맞춤형 스토리",
      description:
        "우리 아이의 이름, 나이, 관심사를 반영한 완전히 개인화된 동화책",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI 창작 엔진",
      description: "최신 생성형 AI가 만드는 창의적이고 교육적인 스토리텔링",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "무제한 생성",
      description:
        "매일 새로운 이야기로 아이의 상상력과 독서 습관을 키워보세요",
      color: "from-purple-500 to-violet-500",
    },
  ];

  const testimonials = [
    {
      name: "김지우",
      age: "5세 맘",
      avatar: "👩‍💼",
      comment:
        "아이가 자기 이름이 나오는 동화를 너무 좋아해요! 매일 밤 새로운 이야기를 기다려요.",
      rating: 5,
    },
    {
      name: "박서준",
      age: "4세 맘",
      avatar: "👩‍🏫",
      comment:
        "교육적 가치가 뛰어나면서도 재미있어서 아이가 스스로 책을 찾게 되었어요.",
      rating: 5,
    },
    {
      name: "이하은",
      age: "6세 맘",
      avatar: "👩‍⚕️",
      comment: "AI가 만든 이야기라고는 믿을 수 없을 정도로 완성도가 높아요!",
      rating: 5,
    },
  ];

  const pricingFeatures = [
    "무제한 동화 생성",
    "고화질 일러스트레이션",
    "PDF 다운로드",
    "프리미엄 템플릿",
    "24시간 고객지원",
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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



      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              10,000+ 가족의 선택
            </h2>
            <p className="text-xl text-gray-600">
              전국의 부모님들이 보내주신 생생한 후기
            </p>
          </div>

          <div className="relative">
            <div className="max-w-4xl p-8 mx-auto bg-white shadow-2xl rounded-3xl lg:p-12">
              <div className="text-center">
                <div className="mb-4 text-6xl">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-current"
                      />
                    )
                  )}
                </div>
                <blockquote className="mb-8 text-2xl font-medium leading-relaxed text-gray-800">
                  "{testimonials[currentTestimonial].comment}"
                </blockquote>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-500">
                    {testimonials[currentTestimonial].age}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-purple-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              간단하고 투명한 요금제
            </h2>
            <p className="text-xl text-gray-600">
              부담없이 시작해서 필요한 만큼 사용하세요
            </p>
          </div>

          <div className="grid max-w-5xl gap-8 mx-auto lg:grid-cols-3">
            <div className="p-8 bg-white shadow-lg rounded-3xl">
              <div className="mb-8 text-center">
                <h3 className="mb-4 text-2xl font-bold">무료 체험</h3>
                <div className="mb-2 text-5xl font-bold">₩0</div>
                <div className="text-gray-500">첫 동화책 무료</div>
              </div>
              <ul className="mb-8 space-y-4">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span>동화책 1권 무료 생성</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span>기본 템플릿 이용</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span>PDF 다운로드</span>
                </li>
              </ul>
              <button
                onClick={handleStartClick}
                className="w-full py-3 font-semibold text-purple-600 transition-colors border-2 border-purple-600 rounded-2xl hover:bg-purple-50"
              >
                무료로 시작하기
              </button>
            </div>

            <div className="relative p-8 transform scale-105 shadow-2xl bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl">
              <div className="absolute px-4 py-1 text-sm font-bold text-white transform -translate-x-1/2 bg-orange-400 rounded-full -top-4 left-1/2">
                가장 인기
              </div>
              <div className="mb-8 text-center text-white">
                <h3 className="mb-4 text-2xl font-bold">프리미엄</h3>
                <div className="mb-2 text-5xl font-bold">₩9,900</div>
                <div className="text-purple-100">월 구독</div>
              </div>
              <ul className="mb-8 space-y-4 text-white">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 font-semibold text-purple-600 transition-all duration-300 transform bg-white rounded-2xl hover:shadow-lg hover:scale-105">
                지금 시작하기
              </button>
            </div>

            <div className="p-8 bg-white shadow-lg rounded-3xl">
              <div className="mb-8 text-center">
                <h3 className="mb-4 text-2xl font-bold">패밀리</h3>
                <div className="mb-2 text-5xl font-bold">₩19,900</div>
                <div className="text-gray-500">월 구독 (가족용)</div>
              </div>
              <ul className="mb-8 space-y-4">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 mr-3 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span>최대 5명 아이 등록</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3 text-green-500" />
                  <span>가족 공유 라이브러리</span>
                </li>
              </ul>
              <button className="w-full py-3 font-semibold text-purple-600 transition-colors border-2 border-purple-600 rounded-2xl hover:bg-purple-50">
                가족 플랜 선택
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-8 text-4xl font-bold lg:text-6xl">
            우리 아이의 특별한 이야기,
            <br />
            지금 바로 시작하세요
          </h2>
          <p className="mb-10 text-xl opacity-90">
            단 몇 분만에 평생 간직할 소중한 추억을 만들어보세요
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={handleStartClick}
              className="flex items-center justify-center px-10 py-4 text-lg font-bold text-purple-600 transition-all duration-300 transform bg-white rounded-2xl hover:shadow-2xl hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              무료로 시작하기
            </button>
            <button className="flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all duration-300 border-2 border-white/30 rounded-2xl hover:bg-white/10">
              <Play className="w-5 h-5 mr-2" />
              데모 보기
            </button>
          </div>
        </div>
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
