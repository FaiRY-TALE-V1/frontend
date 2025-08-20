import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Heart, BookOpen, Users, Star } from "lucide-react";
import { Button } from "../components/ui/Button";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "아이 맞춤형",
      description: "우리 아이의 이름, 나이, 성격에 맞춘 특별한 동화",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "AI 생성",
      description: "최신 AI 기술로 만드는 유일무이한 스토리",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "교육적 가치",
      description: "재미와 교훈을 모두 담은 의미 있는 이야기",
    },
  ];

  const testimonials = [
    {
      name: "김지우 맘",
      age: "5세",
      comment: "아이가 자기 이름이 나오는 동화를 너무 좋아해요!",
      rating: 5,
    },
    {
      name: "박서준 맘",
      age: "4세", 
      comment: "매일 밤 새로운 동화로 재워줄 수 있어서 정말 좋아요.",
      rating: 5,
    },
    {
      name: "이하은 맘",
      age: "6세",
      comment: "아이가 스스로 책을 읽게 되었어요!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-8 py-4 mb-12 space-x-3 glass-card"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white">FaiRY TALE</h1>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-pink-400" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-6xl font-bold text-white md:text-8xl leading-tight"
          >
            우리 아이만의
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              마법같은 동화
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto mb-12 text-2xl leading-relaxed text-gray-200"
          >
            첨단 AI 기술로 만드는 세상에 하나뿐인 맞춤형 동화책
            <br />
            <span className="text-yellow-300">상상력과 교훈이 함께 자라는 특별한 경험</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              onClick={() => navigate("/main")}
              size="lg"
              className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-2xl shadow-2xl hover:shadow-pink-500/25 transform hover:scale-110 transition-all duration-300"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              지금 바로 시작하기
            </Button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card px-6 py-3 text-white/80"
            >
              <span className="text-sm">✨ 무료로 체험해보세요</span>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
          >
            {[
              { number: "10K+", label: "만족한 가족" },
              { number: "50K+", label: "생성된 동화" },
              { number: "99%", label: "만족도" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="text-center glass-card p-6"
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-6xl top-20 left-10 opacity-20"
        >
          🦄
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-5xl top-32 right-20 opacity-20"
        >
          🌟
        </motion.div>
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-4xl bottom-20 left-20 opacity-20"
        >
          📚
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-32 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full mb-6">
              ✨ 특별한 기능들
            </span>
            <h3 className="text-5xl font-bold mb-6 gradient-text">
              왜 FaiRY TALE일까요?
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              최첨단 AI 기술과 교육 전문가의 노하우가 만나 탄생한 혁신적인 동화 서비스
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group floating-card"
              >
                <div className="card h-full text-center relative overflow-hidden">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-white text-3xl">
                        {feature.icon}
                      </div>
                    </motion.div>
                    
                    <h4 className="mb-4 text-2xl font-bold text-gray-800">
                      {feature.title}
                    </h4>
                    
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                    
                    <motion.div
                      className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "4rem" }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Feature Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="card max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-8xl">🎨</div>
                <div className="text-left">
                  <h4 className="text-3xl font-bold mb-4">AI 이미지 생성 기술</h4>
                  <p className="text-xl opacity-90">
                    아이의 사진을 분석하여 꼭 닮은 캐릭터로 동화 속 주인공이 됩니다. 
                    매 장면마다 생생한 일러스트레이션과 함께 몰입감 있는 경험을 제공해요.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="relative px-4 py-32 bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-6 py-2 bg-white/20 text-white text-sm font-semibold rounded-full mb-6 backdrop-blur-sm">
              💬 실제 후기
            </span>
            <h3 className="text-5xl font-bold mb-6 text-white">
              행복한 가족들의 이야기
            </h3>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              전국의 수많은 가족들이 FaiRY TALE과 함께 특별한 순간을 만들고 있어요
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group floating-card"
              >
                <div className="glass-card p-8 h-full relative overflow-hidden backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                        >
                          <Star className="w-6 h-6 text-yellow-400 fill-current mr-1" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <blockquote className="mb-6 text-lg italic text-white leading-relaxed">
                      "{testimonial.comment}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-white/70 text-sm">{testimonial.age} 아이 엄마</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <span className="text-6xl mb-6 block">✨</span>
            <h3 className="text-6xl font-bold mb-8 text-white leading-tight">
              마법 같은 동화 여행을
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                지금 시작하세요
              </span>
            </h3>
            <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              단 몇 분만에 우리 아이만의 특별한 동화책이 완성됩니다
              <br />
              <span className="text-yellow-300">무료로 첫 번째 동화를 만들어보세요!</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              onClick={() => navigate("/main")}
              size="lg"
              className="px-16 py-8 text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-2xl shadow-2xl hover:shadow-pink-500/25 transform hover:scale-110 transition-all duration-300"
            >
              <BookOpen className="w-8 h-8 mr-4" />
              무료로 동화책 만들기
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {[
              { icon: "⚡", text: "3분 만에 완성" },
              { icon: "🎨", text: "AI 삽화 생성" },
              { icon: "🔊", text: "음성 내레이션" },
              { icon: "💝", text: "100% 무료" }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-white text-sm font-medium">{item.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
