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

// Mock data - 실제로는 API에서 가져올 예정
const themes = [
  {
    value: "friendship",
    title: "우정과 협력",
    emoji: "🤝",
    description: "친구와 함께하는 모험을 통해 협력의 소중함을 배우는 이야기",
    moral:
      "진정한 친구는 어려울 때 서로 도와주는 사람이에요. 함께하면 혼자서는 할 수 없는 일도 해낼 수 있답니다.",
    keywords: ["우정", "협력", "팀워크"],
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    examples: [
      "🏰 마법의 성 탐험",
      "🌈 무지개 다리 건설",
      "🦄 유니콘과의 모험",
    ],
  },
  {
    value: "courage",
    title: "용기와 도전",
    emoji: "💪",
    description: "두려움을 극복하고 용기내어 도전하는 성장 이야기",
    moral:
      "무서운 일이 생겨도 용기를 내어 한 걸음씩 나아가면 할 수 있어요. 포기하지 않는 마음이 가장 중요해요.",
    keywords: ["용기", "도전", "성장"],
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
    examples: [
      "🏔️ 높은 산 오르기",
      "⚔️ 용감한 기사 되기",
      "🦸 슈퍼히어로 모험",
    ],
  },
  {
    value: "kindness",
    title: "친절과 배려",
    emoji: "❤️",
    description: "다른 사람을 도와주며 친절의 기쁨을 느끼는 따뜻한 이야기",
    moral:
      "작은 친절도 상대방에게는 큰 기쁨이 될 수 있어요. 서로 도우며 사는 세상이 더 아름다워요.",
    keywords: ["친절", "배려", "도움"],
    color: "from-pink-400 to-pink-600",
    bgColor: "bg-pink-50",
    examples: ["🌸 꽃밭 가꾸기", "🐰 토끼 친구 돕기", "🌟 별님의 선물"],
  },
  {
    value: "honesty",
    title: "정직과 신뢰",
    emoji: "🗣️",
    description: "거짓말의 결과를 깨닫고 정직함의 가치를 배우는 이야기",
    moral:
      "거짓말은 더 큰 문제를 만들어요. 정직하게 말하면 때로는 혼날 수 있지만, 믿음을 얻을 수 있어요.",
    keywords: ["정직", "신뢰", "약속"],
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    examples: ["🏆 정직한 경주", "🌞 해님과의 약속", "📚 마법의 도서관"],
  },
  {
    value: "perseverance",
    title: "끈기와 노력",
    emoji: "🎯",
    description: "포기하지 않고 계속 노력해서 목표를 이루는 성장 이야기",
    moral:
      "처음에는 어려워도 계속 연습하면 잘할 수 있게 돼요. 포기하지 않는 마음이 성공의 비결이에요.",
    keywords: ["끈기", "노력", "목표"],
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    examples: ["🏃 마라톤 완주하기", "🎪 서커스단 입단", "🎨 명화 그리기"],
  },
  {
    value: "sharing",
    title: "나누기와 배려",
    emoji: "🤲",
    description: "다른 사람과 나누며 함께하는 기쁨을 배우는 이야기",
    moral:
      "나눌수록 행복은 더 커져요. 혼자 가지는 것보다 함께 나누는 것이 더 즐거워요.",
    keywords: ["나눔", "배려", "함께"],
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
    examples: ["🍰 생일 케이크 나누기", "🎁 선물 교환하기", "🌺 꽃다발 만들기"],
  },
];

const ThemePage = () => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [childProfile, setChildProfile] = useState({ name: "아이" }); // Mock data
  const [hoveredTheme, setHoveredTheme] = useState("");

  const handleThemeSelect = (themeValue) => {
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
