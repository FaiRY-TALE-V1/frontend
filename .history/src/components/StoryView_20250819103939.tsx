import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Home,
  RotateCcw,
} from "lucide-react";
import { Button } from "./ui/Button";
import { CompleteStoryResponse } from "../types";

interface StoryViewProps {
  story: CompleteStoryResponse;
  onBackToHome: () => void;
}

const StoryView: React.FC<StoryViewProps> = ({ story, onBackToHome }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  // 현재 장면의 오디오 재생/정지
  const toggleAudio = () => {
    if (!audioElement) {
      const audio = new Audio(
        `http://localhost:8000${story.scenes[currentScene].audio_url}`
      );
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        console.error("오디오 재생 실패");
        setIsPlaying(false);
      };
      setAudioElement(audio);
      audio.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    }
  };

  // 장면 변경 시 오디오 정리
  useEffect(() => {
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
      setIsPlaying(false);
    }
  }, [currentScene]);

  // 컴포넌트 언마운트 시 오디오 정리
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, [audioElement]);

  const nextScene = () => {
    if (currentScene < story.scenes.length - 1) {
      setCurrentScene((prev) => prev + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene((prev) => prev - 1);
    }
  };

  const goToScene = (sceneIndex: number) => {
    setCurrentScene(sceneIndex);
  };

  const scene = story.scenes[currentScene];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{story.title}</h1>
            <p className="text-sm text-gray-600">
              {currentScene + 1} / {story.total_scenes} 장면
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onBackToHome}>
              <Home className="w-4 h-4 mr-2" />
              처음으로
            </Button>
          </div>
        </div>
      </div>

      {/* 메인 스토리 영역 */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-200px)]">
          {/* 이미지 영역 */}
          <motion.div
            key={`image-${currentScene}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white">
              {scene.image_url ? (
                <img
                  src={`http://localhost:8000${scene.image_url}`}
                  alt={`장면 ${scene.scene_number}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/api/placeholder/400/400";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">이미지 로딩 중...</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* 텍스트 및 컨트롤 영역 */}
          <motion.div
            key={`text-${currentScene}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 space-y-6"
          >
            {/* 스토리 텍스트 */}
            <div className="card">
              <p className="text-lg leading-relaxed text-gray-800 mb-6">
                {scene.text}
              </p>

              {/* 오디오 컨트롤 */}
              <div className="flex items-center justify-center">
                <Button
                  onClick={toggleAudio}
                  variant={isPlaying ? "secondary" : "default"}
                  size="lg"
                  className="w-full max-w-xs"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      일시정지
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      음성 듣기
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* 네비게이션 컨트롤 */}
            <div className="flex items-center justify-between">
              <Button
                onClick={prevScene}
                disabled={currentScene === 0}
                variant="outline"
                size="lg"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                이전
              </Button>

              <div className="flex space-x-2">
                {story.scenes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToScene(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentScene
                        ? "bg-primary-500"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextScene}
                disabled={currentScene === story.scenes.length - 1}
                variant="outline"
                size="lg"
              >
                다음
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 키보드 네비게이션 */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-white rounded-lg shadow-lg p-3 text-xs text-gray-600">
          <p>키보드: ← → 방향키로 이동</p>
          <p>스페이스바: 음성 재생/정지</p>
        </div>
      </div>
    </div>
  );
};

export default StoryView;

