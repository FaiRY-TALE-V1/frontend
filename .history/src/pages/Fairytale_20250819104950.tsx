import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { CompleteStoryResponse, StoryRequest } from "../types";
import { apiService } from "../services/api";

const FairytaleePage: React.FC = () => {
  const navigate = useNavigate();
  const [story, setStory] = useState<CompleteStoryResponse | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateStory = async () => {
      try {
        setIsLoading(true);

        // localStorage에서 스토리 요청 데이터 가져오기
        const savedRequest = localStorage.getItem("storyRequest");
        if (!savedRequest) {
          navigate("/main");
          return;
        }

        const storyRequest: StoryRequest = JSON.parse(savedRequest);
        console.log("Generating story with:", storyRequest);

        // API 호출하여 스토리 생성
        const generatedStory = await apiService.generateCompleteStory(
          storyRequest
        );
        setStory(generatedStory);
      } catch (err: any) {
        console.error("Story generation failed:", err);
        setError(
          err.response?.data?.detail ||
            err.message ||
            "동화 생성 중 오류가 발생했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    generateStory();
  }, [navigate]);

  // 오디오 재생/정지
  const toggleAudio = () => {
    if (!story?.scenes[currentScene]?.audio_url) return;

    if (audioRef) {
      audioRef.pause();
      setAudioRef(null);
      setIsAudioPlaying(false);
    } else {
      const audio = new Audio(story.scenes[currentScene].audio_url);
      audio.onended = () => {
        setIsAudioPlaying(false);
        setAudioRef(null);
      };
      audio.play();
      setAudioRef(audio);
      setIsAudioPlaying(true);
    }
  };

  // 이전 장면
  const goToPreviousScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
      if (audioRef) {
        audioRef.pause();
        setAudioRef(null);
        setIsAudioPlaying(false);
      }
    }
  };

  // 다음 장면
  const goToNextScene = () => {
    if (story && currentScene < story.scenes.length - 1) {
      setCurrentScene(currentScene + 1);
      if (audioRef) {
        audioRef.pause();
        setAudioRef(null);
        setIsAudioPlaying(false);
      }
    }
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPreviousScene();
      } else if (e.key === "ArrowRight") {
        goToNextScene();
      } else if (e.key === " ") {
        e.preventDefault();
        toggleAudio();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentScene, story, audioRef]);

  // 컴포넌트 언마운트 시 오디오 정리
  useEffect(() => {
    return () => {
      if (audioRef) {
        audioRef.pause();
        setAudioRef(null);
      }
    };
  }, [audioRef]);

  // 로딩 화면
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-8">
            <Loader2 className="w-16 h-16 text-primary-500 animate-spin mx-auto" />
            <motion.div
              className="absolute inset-0 border-4 border-primary-200 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            AI가 동화를 만들고 있어요...
          </h2>
          <p className="text-lg text-gray-600 mb-6">잠시만 기다려주세요</p>
          <div className="max-w-md mx-auto">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 30, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 에러 화면
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md"
        >
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            동화 생성에 실패했어요
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button onClick={() => window.location.reload()} className="w-full">
              다시 시도하기
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/theme")}
              className="w-full"
            >
              테마 다시 선택하기
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!story) return null;

  const currentSceneData = story.scenes[currentScene];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* 상단 네비게이션 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-20 p-4"
      >
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            <Home className="w-4 h-4 mr-2" />
            홈으로
          </Button>

          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
            {currentScene + 1} / {story.scenes.length}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleAudio}
            disabled={!currentSceneData.audio_url}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            {isAudioPlaying ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </motion.div>

      {/* 메인 콘텐츠 */}
      <div className="flex h-screen">
        {/* 왼쪽: 삽화 */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center p-8"
            >
              {currentSceneData.image_url ? (
                <img
                  src={currentSceneData.image_url}
                  alt={`Scene ${currentScene + 1}`}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl shadow-2xl flex items-center justify-center text-white text-6xl w-96 h-96">
                  📖
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 오른쪽: 스토리 텍스트 */}
        <div className="flex-1 relative bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm">
          <div className="h-full flex flex-col justify-center p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* 동화 제목 (첫 번째 장면에서만) */}
                {currentScene === 0 && (
                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold text-gray-800 mb-8 text-center"
                  >
                    {story.title}
                  </motion.h1>
                )}

                {/* 스토리 텍스트 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl leading-relaxed text-gray-700 font-medium"
                  style={{ lineHeight: "1.8" }}
                >
                  {currentSceneData.text.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-0 left-0 right-0 p-6"
      >
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            onClick={goToPreviousScene}
            disabled={currentScene === 0}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            이전
          </Button>

          {/* 진행 표시기 */}
          <div className="flex space-x-2">
            {story.scenes.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentScene
                    ? "bg-white scale-125"
                    : index < currentScene
                    ? "bg-white/60"
                    : "bg-white/30"
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentScene(index)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={goToNextScene}
            disabled={currentScene === story.scenes.length - 1}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
          >
            다음
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>

        {/* 키보드 단축키 안내 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-white/60 text-sm mt-4"
        >
          키보드로 조작: ← → (페이지 이동) | 스페이스바 (음성 재생/정지)
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FairytaleePage;
