import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { apiService } from "../services/api";
import { Check, ChevronLeft } from "lucide-react";
import { addKoreanParticle } from "../utils/koreanParticle";

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
    emoji: "🚦",
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
    emoji: "💕",
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
  const {
    state,
    setSelectedTheme: setAppSelectedTheme,
    canProceedToTheme,
  } = useAppContext();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [childProfile, setChildProfile] = useState<{ name: string } | null>(
    null
  );
  const [apiThemes, setApiThemes] = useState<any[]>([]);
  const [isLoadingThemes, setIsLoadingThemes] = useState(true);

  useEffect(() => {
    // localStorage에서 프로필 확인
    const hasProfileInStorage = Boolean(localStorage.getItem("childProfile"));

    if (!canProceedToTheme && !hasProfileInStorage) {
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

        // 5초 타임아웃 설정
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("API 타임아웃")), 5000)
        );

        const apiPromise = apiService.getThemes();

        const response = (await Promise.race([
          apiPromise,
          timeoutPromise,
        ])) as any;
        console.log("테마 API 응답:", response);
        console.log("응답 타입:", typeof response);
        console.log("response.success:", response.success);
        console.log("response.data:", response.data);

        if (response.success && response.data?.themes) {
          console.log("API 테마 사용:", response.data.themes);
          console.log("API 테마 개수:", response.data.themes.length);
          setApiThemes(response.data.themes);
        } else {
          console.warn("API 테마 로드 실패, 기본 테마 사용");
          console.log("기본 테마 개수:", themes.length);
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
    console.log("ThemeSelection handleNext 시작");
    console.log("selectedTheme:", selectedTheme);
    console.log("childProfile:", childProfile);

    if (!selectedTheme || !childProfile) {
      console.log("테마 또는 프로필 없음 - 실행 중단");
      return;
    }

    setAppSelectedTheme(selectedTheme as any);
    localStorage.setItem("selectedTheme", selectedTheme);
    console.log("다음 단계로:", selectedTheme);
    console.log("스토리 페이지로 이동 시도...");
    navigate("/story");
    console.log("navigate 호출 완료");
  };

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
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <div className="relative z-20 px-4 py-6 bg-white shadow-sm">
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

      <div className="relative z-10 max-w-4xl px-6 py-8 mx-auto">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            어떤 주제의 동화를 만들까요?
          </h2>
          <p className="text-gray-600">
            <span className="font-medium text-blue-600">
              {addKoreanParticle(childProfile.name, "을")}
            </span>{" "}
            위한 교훈 테마를 선택해주세요
          </p>
        </div>

        {/* Theme Grid */}
        <div className="mb-12 space-y-4">
          {(() => {
            console.log("렌더링 상태 - isLoadingThemes:", isLoadingThemes);
            console.log("렌더링 상태 - apiThemes.length:", apiThemes.length);
            console.log("렌더링 상태 - themes.length:", themes.length);
            return null;
          })()}
          {isLoadingThemes
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-200 border border-gray-400 rounded-lg animate-pulse"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-32 h-5 bg-gray-300 rounded"></div>
                      <div className="w-full h-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            : (apiThemes.length > 0 ? apiThemes : themes).map((theme) => (
                <div
                  key={theme.value}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedTheme === theme.value
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => handleThemeSelect(theme.value)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{theme.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {theme.title}
                        </h3>
                        {selectedTheme === theme.value && (
                          <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="mt-2 leading-relaxed text-gray-600">
                        {theme.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
          {selectedTheme ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 transform shadow-lg rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 hover:shadow-xl hover:-translate-y-0.5 hover:scale-105"
            >
              동화 만들기 시작 →
            </button>
          ) : (
            <div className="text-center text-gray-500">테마를 선택해주세요</div>
          )}
        </div>

        {/* Progress text */}
        <div className="px-8 pb-8 mt-8 text-center">
          <p className="text-sm text-gray-500">2단계 / 3단계 - 테마 선택</p>
        </div>
      </div>

      {/* 배경 데코레이션 아이콘들 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* 왼쪽 상단 */}
        <img
          src="/star.svg"
          alt="star"
          className="absolute w-6 h-6 top-20 left-10 opacity-90"
        />
        <img
          src="/circle.svg"
          alt="circle"
          className="absolute w-8 h-8 top-32 left-32 opacity-85"
        />

        {/* 오른쪽 상단 */}
        <img
          src="/spark.svg"
          alt="spark"
          className="absolute w-5 h-5 top-16 right-16 opacity-95"
        />
        <img
          src="/sun.svg"
          alt="sun"
          className="absolute w-10 h-10 opacity-90 top-40 right-8"
        />

        {/* 왼쪽 중간 */}
        <img
          src="/circle.svg"
          alt="circle"
          className="absolute w-4 h-4 top-64 left-8 opacity-90"
        />
        <img
          src="/spark.svg"
          alt="spark"
          className="absolute w-6 h-6 top-80 left-24 opacity-95"
        />

        {/* 오른쪽 중간 */}
        <img
          src="/star.svg"
          alt="star"
          className="absolute opacity-90 top-72 right-20 w-7 h-7"
        />
        <img
          src="/circle.svg"
          alt="circle"
          className="absolute w-5 h-5 top-96 right-12 opacity-95"
        />

        {/* 하단 */}
        <img
          src="/sun.svg"
          alt="sun"
          className="absolute w-8 h-8 bottom-80 left-16 opacity-85"
        />
        <img
          src="/spark.svg"
          alt="spark"
          className="absolute w-4 h-4 bottom-72 right-24 opacity-90"
        />
        <img
          src="/star.svg"
          alt="star"
          className="absolute w-6 h-6 opacity-90 bottom-64 left-40"
        />
        <img
          src="/circle.svg"
          alt="circle"
          className="absolute bottom-56 right-32 w-9 h-9 opacity-80"
        />
      </div>

      {/* 하단 grass SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
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
