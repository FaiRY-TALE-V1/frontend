import React, { useState, useEffect } from "react";
import { Sparkles, Heart, BookOpen, Users, Star, ChevronDown, Play, Check, ArrowRight, Zap, Shield, Clock } from "lucide-react";

const FairyTaleLanding = () => {
  const [isVisible, setIsVisible] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "아이 맞춤형 스토리",
      description: "우리 아이의 이름, 나이, 관심사를 반영한 완전히 개인화된 동화책",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI 창작 엔진",
      description: "최신 생성형 AI가 만드는 창의적이고 교육적인 스토리텔링",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "무제한 생성",
      description: "매일 새로운 이야기로 아이의 상상력과 독서 습관을 키워보세요",
      color: "from-purple-500 to-violet-500"
    },
  ];

  const testimonials = [
    {
      name: "김지우",
      age: "5세 맘",
      avatar: "👩‍💼",
      comment: "아이가 자기 이름이 나오는 동화를 너무 좋아해요! 매일 밤 새로운 이야기를 기다려요.",
      rating: 5,
    },
    {
      name: "박서준",
      age: "4세 맘", 
      avatar: "👩‍🏫",
      comment: "교육적 가치가 뛰어나면서도 재미있어서 아이가 스스로 책을 찾게 되었어요.",
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
    "24시간 고객지원"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FaiRY TALE
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                기능
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                후기
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                요금제
              </button>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              시작하기
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200">
                <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-800">AI 기반 개인화 동화</span>
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                우리 아이만의
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  마법같은 동화책
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                최첨단 AI가 아이의 이름, 성격, 관심사를 바탕으로 
                세상에 단 하나뿐인 특별한 이야기를 만들어드립니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  무료로 시작하기
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-purple-300 hover:text-purple-600 transition-all duration-300 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  샘플 동화 보기
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {['👨', '👩', '👴', '👵'].map((emoji, i) => (
                      <div key={i} className="w-10 h-10 bg-white rounded-full border-2 border-white flex items-center justify-center text-lg shadow-lg">
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-900">10,000+ 가족</div>
                    <div className="text-xs text-gray-500">이미 함께하고 있어요</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 flex flex-col items-center justify-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">지우의 우주 모험</h3>
                  <p className="text-gray-600 text-center text-sm">
                    5살 지우가 우주선을 타고 별들 사이를 여행하며 용기를 배우는 이야기
                  </p>
                  <div className="flex items-center mt-4 space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl -z-20"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>

        {/* Background decoration */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "생성된 동화책" },
              { number: "98%", label: "만족도" },
              { number: "15분", label: "평균 생성시간" },
              { number: "24/7", label: "고객지원" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              왜 <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">FaiRY TALE</span>인가요?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              첨단 AI 기술과 교육학적 전문성이 만나 만들어내는 완벽한 개인화 동화 경험
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-6 flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              단 3단계로 완성되는 맞춤 동화
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "아이 정보 입력",
                description: "아이의 이름, 나이, 성격, 좋아하는 것들을 알려주세요",
                icon: "👶"
              },
              {
                step: "02", 
                title: "AI가 창작",
                description: "첨단 AI가 아이만을 위한 특별한 이야기를 만들어냅니다",
                icon: "🤖"
              },
              {
                step: "03",
                title: "동화책 완성",
                description: "아름다운 일러스트와 함께 완성된 동화책을 받아보세요",
                icon: "📖"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto text-3xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              10,000+ 가족의 선택
            </h2>
            <p className="text-xl text-gray-600">전국의 부모님들이 보내주신 생생한 후기</p>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-6xl mb-4">{testimonials[currentTestimonial].avatar}</div>
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl text-gray-800 font-medium mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].comment}"
                </blockquote>
                <div>
                  <div className="font-bold text-lg text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-500">{testimonials[currentTestimonial].age}</div>
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
                      ? 'bg-purple-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              간단하고 투명한 요금제
            </h2>
            <p className="text-xl text-gray-600">부담없이 시작해서 필요한 만큼 사용하세요</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">무료 체험</h3>
                <div className="text-5xl font-bold mb-2">₩0</div>
                <div className="text-gray-500">첫 동화책 무료</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>동화책 1권 무료 생성</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>기본 템플릿 이용</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>PDF 다운로드</span>
                </li>
              </ul>
              <button className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-2xl font-semibold hover:bg-purple-50 transition-colors">
                무료로 시작하기
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-400 text-white px-4 py-1 rounded-full text-sm font-bold">
                가장 인기
              </div>
              <div className="text-center mb-8 text-white">
                <h3 className="text-2xl font-bold mb-4">프리미엄</h3>
                <div className="text-5xl font-bold mb-2">₩9,900</div>
                <div className="text-purple-100">월 구독</div>
              </div>
              <ul className="space-y-4 mb-8 text-white">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-purple-600 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                지금 시작하기
              </button>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">패밀리</h3>
                <div className="text-5xl font-bold mb-2">₩19,900</div>
                <div className="text-gray-500">월 구독 (가족용)</div>
              </div>
              <ul className="space-y-4 mb-8">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>최대 5명 아이 등록</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>가족 공유 라이브러리</span>
                </li>
              </ul>
              <button className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-2xl font-semibold hover:bg-purple-50 transition-colors">
                가족 플랜 선택
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            우리 아이의 특별한 이야기,<br />
            지금 바로 시작하세요
          </h2>
          <p className="text-xl mb-10 opacity-90">
            단 몇 분만에 평생 간직할 소중한 추억을 만들어보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2" />
              무료로 시작하기
            </button>
            <button className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              데모 보기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">FaiRY TALE</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                AI가 만드는 아이 맞춤형 동화로 상상력과 교훈을 함께 키우는 특별한 경험을 제공합니다.
              </p>
              <div className="flex space-x-4">
                {['📧', '📱', '💬'].map((emoji, index) => (
                  <div key={index} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    <span className="text-lg">{emoji}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">동화 생성</a></li>
                <li><a href="#" className="hover:text-white transition-colors">템플릿</a></li>
                <li><a href="#" className="hover:text-white transition-colors">일러스트</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">도움말</a></li>
                <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FaiRY TALE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FairyTaleLanding;