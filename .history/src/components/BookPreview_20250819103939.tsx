import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Home,
  BookOpen,
} from "lucide-react";
import { Button } from "./ui/Button";
import { CompleteStoryResponse } from "../types";

interface BookPreviewProps {
  story: CompleteStoryResponse;
  onBackToHome: () => void;
}

const BookPreview: React.FC<BookPreviewProps> = ({ story, onBackToHome }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [isFlipping, setIsFlipping] = useState(false);

  // 총 페이지 수 (표지 + 장면들 + 뒷표지)
  const totalPages = story.scenes.length + 2;

  // 오디오 재생/정지
  const toggleAudio = () => {
    if (currentPage === 0 || currentPage === totalPages - 1) return; // 표지에서는 오디오 없음

    const sceneIndex = currentPage - 1;
    if (!audioElement) {
      const audio = new Audio(
        `http://localhost:8000${story.scenes[sceneIndex].audio_url}`
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

  // 페이지 변경 시 오디오 정리
  useEffect(() => {
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
      setIsPlaying(false);
    }
  }, [currentPage]);

  // 다음 페이지
  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  // 이전 페이지
  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "ArrowRight") nextPage();
      if (e.key === " ") {
        e.preventDefault();
        toggleAudio();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPage, audioElement, isPlaying]);

  // 페이지 컨텐츠 렌더링
  const renderPageContent = () => {
    if (currentPage === 0) {
      // 표지
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary-100 to-secondary-100">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <BookOpen className="w-16 h-16 text-primary-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {story.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              우리 아이만의 특별한 동화
            </p>
            <div className="text-sm text-gray-500">
              <p>총 {story.total_scenes}개의 장면</p>
            </div>
          </motion.div>
        </div>
      );
    }

    if (currentPage === totalPages - 1) {
      // 뒷표지
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-100 to-pink-100">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">끝</h2>
            <p className="text-lg text-gray-600 mb-8">
              즐거운 동화 읽기였나요?
            </p>
            <Button onClick={onBackToHome} variant="secondary" size="lg">
              <Home className="w-5 h-5 mr-2" />
              새로운 동화 만들기
            </Button>
          </motion.div>
        </div>
      );
    }

    // 스토리 페이지
    const sceneIndex = currentPage - 1;
    const scene = story.scenes[sceneIndex];

    return (
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
        {/* 이미지 영역 */}
        <div className="flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-lg"
          >
            {scene.image_url ? (
              <img
                src={`http://localhost:8000${scene.image_url}`}
                alt={`장면 ${scene.scene_number}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/api/placeholder/300/300";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">이미지 로딩 중...</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col justify-center p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed text-gray-800 mb-6">
              {scene.text}
            </p>

            {/* 오디오 컨트롤 */}
            <div className="flex justify-center">
              <Button
                onClick={toggleAudio}
                variant={isPlaying ? "secondary" : "default"}
                size="lg"
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
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* 책 컨테이너 */}
      <div className="relative max-w-6xl w-full">
        {/* 책 그림자 */}
        <div className="absolute inset-0 bg-black opacity-10 transform translate-x-2 translate-y-2 rounded-2xl"></div>

        {/* 책 본체 */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ aspectRatio: "16/11" }}
          animate={{
            rotateY: isFlipping ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* 책 바인딩 라인 */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 z-10"></div>

          {/* 페이지 컨텐츠 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {renderPageContent()}
            </motion.div>
          </AnimatePresence>

          {/* 네비게이션 버튼 */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <Button
              onClick={prevPage}
              disabled={currentPage === 0 || isFlipping}
              variant="outline"
              size="lg"
              className="bg-white/80 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              이전
            </Button>

            {/* 페이지 인디케이터 */}
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm font-medium text-gray-600">
                {currentPage + 1} / {totalPages}
              </span>
            </div>

            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 || isFlipping}
              variant="outline"
              size="lg"
              className="bg-white/80 backdrop-blur-sm"
            >
              다음
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>

          {/* 홈 버튼 */}
          <div className="absolute top-4 right-4">
            <Button
              onClick={onBackToHome}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm"
            >
              <Home className="w-4 h-4 mr-2" />
              처음으로
            </Button>
          </div>
        </motion.div>
      </div>

      {/* 도움말 */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs text-gray-600">
          <p>← → 방향키: 페이지 이동</p>
          <p>스페이스바: 음성 재생/정지</p>
        </div>
      </div>
    </div>
  );
};

export default BookPreview;

