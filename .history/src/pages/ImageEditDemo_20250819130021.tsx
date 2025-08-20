import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Wand2,
  Image as ImageIcon,
  Sparkles,
  BookOpen,
  Users,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageEditor from "../components/ui/ImageEditor";

const ImageEditDemo: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<
    "character" | "scene" | "text" | "custom"
  >("character");
  const [generatedImage, setGeneratedImage] = useState<string>("");

  const modes = [
    {
      id: "character" as const,
      title: "캐릭터 생성",
      description: "아이 사진을 동화 캐릭터로 변환",
      icon: <Users className="w-6 h-6" />,
      color: "blue" as const,
      example: "실제 아이 사진 → 귀여운 동화 주인공",
    },
    {
      id: "scene" as const,
      title: "장면 생성",
      description: "캐릭터를 동화 속 장면에 배치",
      icon: <ImageIcon className="w-6 h-6" />,
      color: "green" as const,
      example: "마법의 숲, 우주 모험, 바닷속 여행",
    },
    {
      id: "text" as const,
      title: "텍스트 추가",
      description: "동화 삽화에 아이 이름이나 제목 추가",
      icon: <BookOpen className="w-6 h-6" />,
      color: "purple",
      example: "지우의 모험, 서준이와 친구들",
    },
    {
      id: "custom" as const,
      title: "자유 편집",
      description: "원하는 대로 이미지 수정",
      icon: <Wand2 className="w-6 h-6" />,
      color: "orange",
      example: "배경 바꾸기, 색상 변경, 요소 추가",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      button: "bg-blue-600 hover:bg-blue-700",
      selected: "ring-blue-500 bg-blue-100",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      button: "bg-green-600 hover:bg-green-700",
      selected: "ring-green-500 bg-green-100",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-800",
      button: "bg-purple-600 hover:bg-purple-700",
      selected: "ring-purple-500 bg-purple-100",
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-800",
      button: "bg-orange-600 hover:bg-orange-700",
      selected: "ring-orange-500 bg-orange-100",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-lg border-white/20">
        <div className="px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 transition-colors rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  AI 이미지 편집 데모
                </h1>
                <p className="text-gray-600">
                  Qwen-Image-Edit으로 동화 이미지를 마법처럼 만들어보세요
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center px-4 py-2 text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:scale-105"
            >
              <Home className="w-4 h-4 mr-2" />
              홈으로
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 mx-auto max-w-7xl">
        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            어떤 AI 마법을 체험해볼까요?
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {modes.map((mode, index) => (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMode(mode.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-lg transform hover:scale-105 ${
                  selectedMode === mode.id
                    ? `ring-2 ${colorClasses[mode.color].selected} ${
                        colorClasses[mode.color].border
                      }`
                    : `${colorClasses[mode.color].bg} ${
                        colorClasses[mode.color].border
                      } hover:${colorClasses[mode.color].selected}`
                }`}
              >
                <div
                  className={`inline-flex p-3 rounded-lg ${
                    colorClasses[mode.color].button
                  } text-white mb-4`}
                >
                  {mode.icon}
                </div>
                <h3
                  className={`text-xl font-bold ${
                    colorClasses[mode.color].text
                  } mb-2`}
                >
                  {mode.title}
                </h3>
                <p className="mb-3 text-sm text-gray-600">{mode.description}</p>
                <p className="text-xs italic text-gray-500">
                  예: {mode.example}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Selected Mode Info */}
        <motion.div
          key={selectedMode}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div
            className={`p-6 rounded-2xl ${
              colorClasses[
                modes.find((m) => m.id === selectedMode)?.color || "blue"
              ].bg
            } border ${
              colorClasses[
                modes.find((m) => m.id === selectedMode)?.color || "blue"
              ].border
            }`}
          >
            <div className="flex items-center mb-4 space-x-3">
              <Sparkles
                className={`w-6 h-6 ${
                  colorClasses[
                    modes.find((m) => m.id === selectedMode)?.color || "blue"
                  ].text
                }`}
              />
              <h3
                className={`text-2xl font-bold ${
                  colorClasses[
                    modes.find((m) => m.id === selectedMode)?.color || "blue"
                  ].text
                }`}
              >
                {modes.find((m) => m.id === selectedMode)?.title} 모드
              </h3>
            </div>
            <p className="text-gray-700">
              {modes.find((m) => m.id === selectedMode)?.description}
            </p>
          </div>
        </motion.div>

        {/* Image Editor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ImageEditor
            mode={selectedMode}
            onImageGenerated={setGeneratedImage}
            childName="지우"
            theme="우정"
          />
        </motion.div>

        {/* Results Gallery */}
        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <h3 className="flex items-center mb-4 text-2xl font-bold text-gray-800">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
                AI가 만든 마법의 결과
              </h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-700">
                    생성된 이미지
                  </h4>
                  <img
                    src={generatedImage}
                    alt="AI 생성 이미지"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                    <h5 className="mb-2 font-semibold text-green-800">
                      🎯 활용 방법
                    </h5>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• 개인화된 동화책 제작</li>
                      <li>• 교육용 스토리텔링 자료</li>
                      <li>• 특별한 선물용 콘텐츠</li>
                      <li>• 아이의 상상력 자극</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <h5 className="mb-2 font-semibold text-blue-800">
                      ✨ AI 기술
                    </h5>
                    <p className="text-sm text-blue-700">
                      Qwen-Image-Edit 모델을 사용하여 시맨틱 편집과 외관 제어를
                      동시에 수행, 캐릭터 일관성을 유지하며 고품질 이미지를
                      생성합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid gap-6 mt-12 md:grid-cols-3"
        >
          <div className="p-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-800">AI 개인화</h3>
            <p className="text-gray-600">
              아이의 특징을 정확히 반영한 캐릭터 생성
            </p>
          </div>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-800">
              실시간 편집
            </h3>
            <p className="text-gray-600">즉시 확인 가능한 빠른 이미지 처리</p>
          </div>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-800">
              교육적 가치
            </h3>
            <p className="text-gray-600">의미 있는 학습 콘텐츠로 활용 가능</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageEditDemo;
