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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg mb-8"
          >
            <Sparkles className="text-primary-500 w-8 h-8" />
            <h1 className="text-4xl font-bold text-gray-800">FaiRY TALE</h1>
            <Sparkles className="text-secondary-500 w-8 h-8" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            우리 아이만의
            <br />
            <span className="text-primary-500">특별한 동화책</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            AI가 만드는 아이 맞춤형 동화로<br />
            상상력과 교훈을 함께 키워보세요
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => navigate("/main")}
              size="lg"
              className="px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              동화책 만들기 시작
            </Button>
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
          className="absolute top-20 left-10 text-6xl opacity-20"
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
          className="absolute top-32 right-20 text-5xl opacity-20"
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
          className="absolute bottom-20 left-20 text-4xl opacity-20"
        >
          📚
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-16">
            왜 FaiRY TALE일까요?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className="text-primary-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white/50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-16">
            부모님들의 후기
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="mx-2">•</span>
                  <span>{testimonial.age} 아이 엄마</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            지금 바로 시작해보세요!
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            단 몇 분만에 우리 아이만의 특별한 동화책이 완성됩니다
          </p>
          <Button
            onClick={() => navigate("/main")}
            size="lg"
            className="px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <BookOpen className="w-6 h-6 mr-2" />
            무료로 동화책 만들기
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
