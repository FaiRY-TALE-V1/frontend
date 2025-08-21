import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Heart,
  ChevronRight,
  Check,
} from "lucide-react";

const themes = [
  {
    value: "healthy_eating",
    title: "식습관 개선",
    emoji: "🥕",
    description: "편식하지 않고 다양한 음식을 골고루 먹는 건강한 습관 이야기",
    moral:
      "몸에 좋은 음식들은 우리를 튼튼하게 만들어줘요. 다양한 음식을 먹으면 더 건강하고 활기차게 자랄 수 있어요.",
    keywords: ["건강", "영양", "균형"],
    color: "from-green-400 to-emerald-600",
    bgColor: "bg-green-50",
    examples: [
      "🥬 채소 친구들의 모험",
      "🍎 과일 왕국 여행",
      "🥛 우유와 칼슘 요정",
    ],
  },
  {
    value: "financial_literacy",
    title: "올바른 경제관념",
    emoji: "💰",
    description: "용돈을 계획적으로 사용하고 저축하는 경제 습관 이야기",
    moral:
      "필요한 것과 갖고 싶은 것을 구분해서 현명하게 용돈을 써요. 조금씩 모으면 더 큰 꿈을 이룰 수 있어요.",
    keywords: ["저축", "계획", "현명함"],
    color: "from-yellow-400 to-amber-600",
    bgColor: "bg-yellow-50",
    examples: [
      "🐷 저금통 돼지의 여행",
      "💎 보물섬의 지혜",
      "🏪 꼬마 상인의 이야기",
    ],
  },
  {
    value: "friendship_skills",
    title: "교우관계",
    emoji: "🤝",
    description: "친구 사귀기와 갈등 해결을 통해 소중한 우정을 키우는 이야기",
    moral:
      "친구와 다툰 후에는 서로 이야기하며 화해해요. 새로운 친구를 따뜻하게 맞이하면 더 많은 즐거움을 나눌 수 있어요.",
    keywords: ["우정", "화해", "소통"],
    color: "from-blue-400 to-sky-600",
    bgColor: "bg-blue-50",
    examples: [
      "🌈 화해의 무지개",
      "🎭 새친구 환영 파티",
      "🤲 마음을 나누는 다리",
    ],
  },
  {
    value: "hygiene_habits",
    title: "양치 & 위생 습관",
    emoji: "🦷",
    description: "양치질, 손 씻기, 목욕 등 깨끗한 위생 습관을 기르는 이야기",
    moral:
      "매일매일 깨끗하게 씻으면 병균들이 도망가요. 건강한 몸을 위해 위생 습관은 꼭 필요해요.",
    keywords: ["청결", "건강", "습관"],
    color: "from-cyan-400 to-teal-600",
    bgColor: "bg-cyan-50",
    examples: ["🦷 치아 요정의 모험", "🧼 비누 거품 친구들", "🛁 목욕탕 파티"],
  },
  {
    value: "environmental_care",
    title: "환경 보호",
    emoji: "🌍",
    description: "지구를 아끼고 환경을 보호하는 작은 실천들의 이야기",
    moral:
      "우리가 사는 지구를 깨끗하게 지키는 건 모든 생명체를 위한 일이에요. 작은 실천이 큰 변화를 만들어요.",
    keywords: ["환경", "실천", "사랑"],
    color: "from-emerald-400 to-green-600",
    bgColor: "bg-emerald-50",
    examples: [
      "🐢 바다거북의 부탁",
      "🌳 숲속 친구들의 분리수거",
      "♻️ 재활용 로봇의 모험",
    ],
  },
  {
    value: "emotional_intelligence",
    title: "감정 표현과 공감",
    emoji: "💝",
    description:
      "다양한 감정을 이해하고 표현하며 친구의 마음을 공감하는 이야기",
    moral:
      "기쁘거나 슬플 때 마음을 표현하는 건 자연스러운 일이에요. 친구의 기분을 이해하고 위로해주면 더 좋은 친구가 될 수 있어요.",
    keywords: ["감정", "공감", "소통"],
    color: "from-pink-400 to-rose-600",
    bgColor: "bg-pink-50",
    examples: [
      "😊 감정 요정들의 여행",
      "🤗 마음을 나누는 숲",
      "💕 위로의 마법사",
    ],
  },
  {
    value: "responsibility",
    title: "자기 주도성 & 책임감",
    emoji: "⭐",
    description: "스스로 할 수 있는 일을 찾아 책임감 있게 해내는 성장 이야기",
    moral:
      "작은 일부터 스스로 해내면 점점 더 많은 일을 할 수 있게 돼요. '내가 할 수 있어!'라는 마음이 가장 큰 힘이에요.",
    keywords: ["독립", "책임", "성장"],
    color: "from-purple-400 to-violet-600",
    bgColor: "bg-purple-50",
    examples: ["🌟 별빛 임무 수행", "🎒 혼자서도 척척", "🏆 나만의 작은 성취"],
  },
  {
    value: "diversity_respect",
    title: "다양성 존중",
    emoji: "🌈",
    description: "서로 다른 모습과 생각을 인정하고 존중하는 포용의 이야기",
    moral:
      "모두가 다른 모습이고 다른 생각을 가지고 있어요. 그 다름이 세상을 더 아름답고 재미있게 만들어줘요.",
    keywords: ["존중", "다양성", "포용"],
    color: "from-indigo-400 to-purple-600",
    bgColor: "bg-indigo-50",
    examples: [
      "🎨 색깔별 나라 여행",
      "🎵 다양한 악기 오케스트라",
      "🌸 각기 다른 꽃밭",
    ],
  },
  {
    value: "safety_habits",
    title: "안전 습관",
    emoji: "🛡️",
    description: "일상생활에서 안전을 지키는 올바른 습관들을 배우는 이야기",
    moral:
      "안전 규칙을 잘 지키면 다치지 않고 즐겁게 생활할 수 있어요. 위험한 상황에서는 어른에게 도움을 요청해요.",
    keywords: ["안전", "조심", "보호"],
    color: "from-red-400 to-orange-600",
    bgColor: "bg-red-50",
    examples: [
      "🚦 신호등 친구의 가르침",
      "👮 안전 경찰관과 모험",
      "🏠 우리 집 안전 점검",
    ],
  },
  {
    value: "creativity",
    title: "창의력 & 상상력",
    emoji: "🎨",
    description: "무한한 상상력을 발휘하여 창의적인 모험을 떠나는 이야기",
    moral:
      "상상하는 모든 것들이 특별하고 소중해요. 창의적인 생각으로 세상을 더 재미있게 만들 수 있어요.",
    keywords: ["상상", "창의", "표현"],
    color: "from-orange-400 to-pink-600",
    bgColor: "bg-orange-50",
    examples: [
      "🖍️ 크레용의 마법 세계",
      "📚 상상 속 모험가",
      "🎭 꿈꾸는 예술가들",
    ],
  },
];

const ThemePage = () => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [childProfile, setChildProfile] = useState({ name: "아이" }); // Mock data
  const [hoveredTheme, setHoveredTheme] = useState("");

  const handleThemeSelect = (themeValue: string) => {
    setSelectedTheme(themeValue);
  };

  const handleNext = () => {
    if (!selectedTheme) return;
    // Navigation logic here
    console.log("다음 단계로:", selectedTheme);
  };

  const selectedThemeData = themes.find((t) => t.value === selectedTheme);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b shadow-sm backdrop-blur-md bg-white/80 border-white/20">
        <div className="max-w-6xl px-6 py-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-2 text-2xl font-bold md:text-3xl text-slate-800">
              어떤 주제의 동화를 만들까요?
            </h1>
            <p className="text-slate-600">
              <span className="font-medium text-indigo-600">
                {childProfile.name}
              </span>
              이의 성장에 도움이 될 교훈을 선택해주세요
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl px-6 py-8 mx-auto">
        {/* Theme Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {themes.map((theme, index) => (
            <motion.div
              key={theme.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onHoverStart={() => setHoveredTheme(theme.value)}
              onHoverEnd={() => setHoveredTheme("")}
              className="relative group"
            >
              <div
                className={`relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedTheme === theme.value
                    ? "ring-2 ring-indigo-500 shadow-lg scale-[1.02] border-indigo-200"
                    : "border-slate-200 hover:shadow-lg hover:scale-[1.02] hover:border-slate-300"
                } ${theme.bgColor} bg-opacity-50`}
                onClick={() => handleThemeSelect(theme.value)}
              >
                {/* Selection indicator */}
                <AnimatePresence>
                  {selectedTheme === theme.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute z-10 flex items-center justify-center w-6 h-6 bg-indigo-500 rounded-full top-4 right-4"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative p-6">
                  {/* Theme header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{theme.emoji}</div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">
                          {theme.title}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {theme.keywords.map((keyword, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs font-medium rounded-full text-slate-600 bg-white/60"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-slate-600">
                    {theme.description}
                  </p>

                  {/* Examples preview */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium tracking-wide uppercase text-slate-500">
                      이야기 예시
                    </h4>
                    <div className="space-y-1">
                      {theme.examples.slice(0, 2).map((example, i) => (
                        <div
                          key={i}
                          className="flex items-center text-sm text-slate-600"
                        >
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2" />
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover effect - show moral */}
                  <AnimatePresence>
                    {(hoveredTheme === theme.value ||
                      selectedTheme === theme.value) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="pt-4 border-t border-white/50"
                      >
                        <div className="flex items-start space-x-2">
                          <Heart className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <p className="text-xs leading-relaxed text-slate-600">
                            {theme.moral}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected theme summary */}
        <AnimatePresence>
          {selectedTheme && selectedThemeData && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="p-6 mb-8 border shadow-lg bg-white/80 backdrop-blur-md border-white/20 rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 text-2xl bg-indigo-100 rounded-xl">
                    {selectedThemeData.emoji}
                  </div>
                  <div>
                    <h3 className="flex items-center text-lg font-bold text-slate-800">
                      <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
                      선택한 테마
                    </h3>
                    <p className="font-medium text-indigo-600">
                      {selectedThemeData.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="flex items-center px-8 py-3 space-x-2 font-medium text-white transition-all duration-200 group bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:scale-105 hover:shadow-lg"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>동화 만들기</span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            className="px-6 py-3 font-medium transition-colors duration-200 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50"
            onClick={() => console.log("이전 페이지")}
          >
            이전
          </button>

          {!selectedTheme && (
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
              <span>테마를 선택해주세요</span>
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
            <div
              className={`w-2 h-2 rounded-full ${
                selectedTheme ? "bg-indigo-500" : "bg-slate-300"
              }`}
            />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePage;
