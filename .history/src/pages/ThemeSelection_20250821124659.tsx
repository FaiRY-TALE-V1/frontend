import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { apiService } from "../services/api";
import {
  Sparkles,
  BookOpen,
  ChevronRight,
  Heart,
  Check,
  ChevronLeft,
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
    value: "financial_literacy",
    title: "경제관념",
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
    value: "emotional_intelligence",
    title: "감정표현",
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
];

const ThemeSelection = () => {
  const navigate = useNavigate();
  const { state, setSelectedTheme: setAppSelectedTheme, canProceedToTheme } = useAppContext();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [childProfile, setChildProfile] = useState<{ name: string } | null>(null);
  const [hoveredTheme, setHoveredTheme] = useState("");
  const [apiThemes, setApiThemes] = useState<any[]>([]);
  const [isLoadingThemes, setIsLoadingThemes] = useState(true);

  useEffect(() => {
    if (!canProceedToTheme) {
      navigate("/profile");
      return;
    }

    if (state.childProfile) {
      setChildProfile(state.childProfile);
    } else {
      const savedProfile = localStorage.getItem("childProfile");
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          setChildProfile(profile);
        } catch (error) {
          console.error("프로필 파싱 오류:", error);
          navigate("/profile");
          return;
        }
      } else {
        navigate("/profile");
        return;
      }
    }

    if (state.selectedTheme) {
      setSelectedTheme(state.selectedTheme);
    }
  }, [state, navigate, canProceedToTheme]);

  // API에서 테마 가져오기
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setIsLoadingThemes(true);
        console.log("테마 API 호출 시작...");
        
        const response = await apiService.getThemes();
        console.log("테마 API 응답:", response);
        
        if (response.success && response.data?.themes) {
          console.log("API 테마 사용:", response.data.themes);
          setApiThemes(response.data.themes);
        } else {
          console.warn("API 테마 로드 실패, 기본 테마 사용");
          setApiThemes(themes);
        }
      } catch (error) {
        console.error("테마 로드 오류:", error);
        console.log("기본 테마 사용");
        setApiThemes(themes);
      } finally {
        setIsLoadingThemes(false);
        console.log("테마 로딩 완료");
      }
    };

    fetchThemes();
  }, []);

  const handleThemeSelect = (themeValue: string) => {
    setSelectedTheme(themeValue);
  };

  const handleNext = () => {
    if (!selectedTheme || !childProfile) return;

    setAppSelectedTheme(selectedTheme as any);
    localStorage.setItem("selectedTheme", selectedTheme);
    console.log("다음 단계로:", selectedTheme);
    navigate("/story");
  };

  const selectedThemeData = (apiThemes.length > 0 ? apiThemes : themes).find((t) => t.value === selectedTheme);

  if (!childProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-600">프로필을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div className="relative px-4 py-6 bg-white shadow-sm">
        <button
          onClick={() => navigate("/profile")}
          className="absolute p-2 transition-colors transform -translate-y-1/2 rounded-full left-4 top-1/2 hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">테마 선택</h1>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-2">
              <div className="w-8 h-1.5 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-8 h-1.5 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-6 py-8 mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-800">
            어떤 주제의 동화를 만들까요?
          </h2>
          <p className="text-lg text-gray-600">
            <span className="font-medium text-indigo-600">
              {childProfile.name}
            </span>
            이의 성장에 도움이 될 교훈을 선택해주세요
          </p>
        </motion.div>

        {/* Theme Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {isLoadingThemes ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-2xl animate-pulse bg-gray-50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                    <div className="w-16 h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-3 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            (apiThemes.length > 0 ? apiThemes : themes).map((theme, index) => (
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
                          {theme.keywords.map((keyword: string, i: number) => (
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
                      {theme.examples.slice(0, 2).map((example: string, i: number) => (
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
          ))
          )}
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
            onClick={() => navigate("/profile")}
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
            <div className="w-2 h-2 bg-indigo-300 rounded-full" />
            <div
              className={`w-2 h-2 rounded-full ${
                selectedTheme ? "bg-indigo-500" : "bg-slate-300"
              }`}
            />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* Progress text */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">2단계 / 3단계 - 테마 선택 중</p>
        </div>
      </div>
      
      {/* 하단 grass SVG */}
      <div className="absolute bottom-0 left-0 right-0 -z-10 pointer-events-none">
        <img 
          src="/grass.svg" 
          alt="grass decoration" 
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ThemeSelection;