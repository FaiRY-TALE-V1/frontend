import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, BookOpen, ArrowRight, Heart } from "lucide-react";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/Accordion";
import { ChildProfile, Theme } from "../types";

const ThemePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [childProfile, setChildProfile] = useState<ChildProfile | null>(null);

  // 테마 데이터 (실제로는 API에서 가져올 예정)
  const themes: Theme[] = [
    {
      value: "friendship",
      label: "🤝 우정과 협력",
      description: "친구와 함께 모험을 떠나며 우정의 소중함을 배우는 이야기",
      moral:
        "진정한 친구는 어려울 때 서로 도와주는 사람이에요. 함께 하면 혼자서는 할 수 없는 일도 해낼 수 있답니다.",
      exampleImages: ["🏰", "🌈", "🦄"],
    },
    {
      value: "courage",
      label: "💪 용기와 도전",
      description: "두려움을 극복하고 용기내어 도전하는 모험 이야기",
      moral:
        "무서운 일이 생겨도 용기를 내어 한 걸음씩 나아가면 할 수 있어요. 포기하지 않는 마음이 가장 중요해요.",
      exampleImages: ["🏔️", "⚔️", "🦸"],
    },
    {
      value: "kindness",
      label: "❤️ 친절과 배려",
      description: "다른 사람을 도와주며 친절의 기쁨을 느끼는 따뜻한 이야기",
      moral:
        "작은 친절도 상대방에게는 큰 기쁨이 될 수 있어요. 서로 도우며 사는 세상이 더 아름다워요.",
      exampleImages: ["🌸", "🐰", "🌟"],
    },
    {
      value: "honesty",
      label: "🗣️ 정직과 신뢰",
      description: "거짓말의 결과를 깨닫고 정직함의 가치를 배우는 이야기",
      moral:
        "거짓말은 더 큰 문제를 만들어요. 정직하게 말하면 때로는 혼날 수 있지만, 믿음을 얻을 수 있어요.",
      exampleImages: ["🏆", "🌞", "📚"],
    },
    {
      value: "perseverance",
      label: "🎯 끈기와 노력",
      description: "포기하지 않고 계속 노력해서 목표를 이루는 성장 이야기",
      moral:
        "처음에는 어려워도 계속 연습하면 잘할 수 있게 돼요. 포기하지 않는 마음이 성공의 비결이에요.",
      exampleImages: ["🏃", "🎪", "🎨"],
    },
    {
      value: "sharing",
      label: "🤲 나누기와 배려",
      description: "다른 사람과 나누며 함께하는 기쁨을 배우는 이야기",
      moral:
        "나눌수록 행복은 더 커져요. 혼자 가지는 것보다 함께 나누는 것이 더 즐거워요.",
      exampleImages: ["🍰", "🎁", "🌺"],
    },
    {
      value: "respect",
      label: "🙏 존중과 이해",
      description: "서로 다름을 인정하고 존중하는 법을 배우는 이야기",
      moral:
        "모든 사람은 서로 달라요. 다른 점을 이해하고 존중하면 더 좋은 친구가 될 수 있어요.",
      exampleImages: ["🌍", "🎭", "🤝"],
    },
    {
      value: "responsibility",
      label: "🎒 책임감과 약속",
      description: "자신의 책임을 다하고 약속을 지키는 중요함을 배우는 이야기",
      moral:
        "약속은 꼭 지켜야 해요. 작은 책임부터 잘 지키면 더 큰 일도 믿고 맡길 수 있어요.",
      exampleImages: ["⏰", "📝", "🏠"],
    },
    {
      value: "creativity",
      label: "🎨 창의성과 상상력",
      description: "상상력을 발휘해 새로운 것을 만들어내는 창작 이야기",
      moral:
        "상상하는 모든 것은 가능해요. 자유롭게 생각하고 표현하면 놀라운 일들이 일어날 수 있어요.",
      exampleImages: ["🎪", "🎨", "✨"],
    },
    {
      value: "gratitude",
      label: "🙏 감사와 고마움",
      description: "일상의 소중함을 깨닫고 감사하는 마음을 배우는 이야기",
      moral:
        "우리 주변에는 고마운 것들이 많아요. 작은 것에도 감사하는 마음을 가지면 더 행복해져요.",
      exampleImages: ["🌱", "☀️", "🏡"],
    },
  ];

  useEffect(() => {
    // localStorage에서 아이 프로필 불러오기
    const savedProfile = localStorage.getItem("childProfile");
    if (savedProfile) {
      setChildProfile(JSON.parse(savedProfile));
    } else {
      // 프로필이 없으면 이전 페이지로
      navigate("/main");
    }
  }, [navigate]);

  const handleThemeSelect = (themeValue: string) => {
    setSelectedTheme(themeValue);
  };

  const handleNext = () => {
    if (!selectedTheme || !childProfile) return;

    // 선택된 테마와 프로필을 localStorage에 저장
    const storyRequest = {
      child_profile: childProfile,
      theme: selectedTheme,
    };
    localStorage.setItem("storyRequest", JSON.stringify(storyRequest));
    navigate("/fairytale");
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-primary-50 via-secondary-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 text-3xl font-bold text-gray-800"
          >
            어떤 주제의 동화를 만들까요?
          </motion.h1>
          <p className="text-gray-600">
            {childProfile?.name}이의 성장에 도움이 될 교훈을 선택해주세요
          </p>
        </div>

        {/* 테마 선택 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {themes.map((theme, index) => (
              <motion.div
                key={theme.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  className={`transition-all duration-300 hover:shadow-lg ${
                    selectedTheme === theme.value
                      ? "ring-2 ring-primary-500 shadow-lg"
                      : ""
                  }`}
                >
                  <AccordionItem value={theme.value} className="border-none">
                    <CardHeader className="pb-2">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-3">
                            <CardTitle className="text-lg font-semibold">
                              {theme.label}
                            </CardTitle>
                          </div>
                        </div>
                      </AccordionTrigger>
                    </CardHeader>

                    <AccordionContent>
                      <CardContent className="pt-0">
                        <CardDescription className="mb-4 text-base leading-relaxed">
                          {theme.description}
                        </CardDescription>

                        {/* 교훈 */}
                        <div className="p-4 mb-4 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50">
                          <h4 className="flex items-center mb-2 font-medium text-gray-800">
                            <Heart className="w-4 h-4 mr-2 text-primary-500" />
                            이런 교훈을 얻을 수 있어요
                          </h4>
                          <p className="text-sm leading-relaxed text-gray-700">
                            {theme.moral}
                          </p>
                        </div>

                        {/* 예시 이미지 (이모지로 대체) */}
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {theme.exampleImages.map((emoji, i) => (
                              <span key={i} className="text-2xl">
                                {emoji}
                              </span>
                            ))}
                          </div>

                          <Button
                            onClick={() => handleThemeSelect(theme.value)}
                            variant={
                              selectedTheme === theme.value
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="transition-all duration-200"
                          >
                            {selectedTheme === theme.value ? (
                              <>선택됨 ✓</>
                            ) : (
                              <>이 테마 선택</>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* 선택된 테마 요약 */}
        {selectedTheme && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 mb-8 bg-white shadow-lg rounded-xl"
          >
            <h3 className="flex items-center mb-2 font-semibold text-gray-800">
              <Sparkles className="w-5 h-5 mr-2 text-primary-500" />
              선택한 테마
            </h3>
            <p className="font-medium text-primary-600">
              {themes.find((t) => t.value === selectedTheme)?.label}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {themes.find((t) => t.value === selectedTheme)?.description}
            </p>
          </motion.div>
        )}

        {/* 버튼 */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/main")}
            className="px-6"
          >
            이전
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selectedTheme}
            className="px-8"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            동화 만들기
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemePage;
