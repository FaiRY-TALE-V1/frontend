import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Star,
} from "lucide-react";
import { CompleteStoryResponse, ChildProfile } from "../types";
import { generateMockStory } from "../data/mockStory";

const StoryGeneration = () => {
  const navigate = useNavigate();
  const [story, setStory] = useState<CompleteStoryResponse | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] =
    useState("AI가 동화를 만들고 있어요...");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 동화 생성 및 로딩
  useEffect(() => {
    const generateStory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const savedProfile = localStorage.getItem("childProfile");
        const selectedTheme = localStorage.getItem("selectedTheme");

        if (!savedProfile || !selectedTheme) {
          throw new Error(
            "프로필 또는 테마 정보가 없습니다. 처음부터 다시 시작해주세요."
          );
        }

        const childProfile: ChildProfile = JSON.parse(savedProfile);

        const themeMap: { [key: string]: string } = {
          healthy_eating: "식습관 개선",
          friendship_skills: "교우관계",
          safety_habits: "안전습관",
          financial_literacy: "경제관념",
          emotional_intelligence: "감정표현",
        };

        const themeName = themeMap[selectedTheme] || selectedTheme;

        console.log("동화 생성 요청:", { childProfile, theme: themeName });

        const loadingMessages = [
          "AI가 동화를 만들고 있어요...",
          "캐릭터를 생성하고 있어요...",
          "장면들을 그리고 있어요...",
          "내레이션을 녹음하고 있어요...",
          "마지막 마무리 중이에요...",
        ];

        let messageIndex = 0;
        const messageInterval = setInterval(() => {
          messageIndex = (messageIndex + 1) % loadingMessages.length;
          setLoadingMessage(loadingMessages[messageIndex]);
        }, 1000);

        setTimeout(() => {
          const response = generateMockStory(childProfile.name, themeName);

          clearInterval(messageInterval);
          setStory(response);
          setIsLoading(false);

          console.log("동화 생성 완료:", response);
        }, 5000);
      } catch (err: any) {
        console.error("동화 생성 실패:", err);
        setError(err.message || "동화 생성 중 오류가 발생했습니다.");
        setIsLoading(false);
      }
    };

    generateStory();
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }
    setIsAudioPlaying(false);
    setAudioProgress(0);
  }, [audioRef]);

  const goToPreviousScene = useCallback(() => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
      stopAudio();
    }
  }, [currentScene, stopAudio]);

  const goToNextScene = useCallback(() => {
    if (story && currentScene < story.story.scenes.length - 1) {
      setCurrentScene(currentScene + 1);
      stopAudio();
    }
  }, [currentScene, story, stopAudio]);

  const toggleAudio = useCallback(() => {
    if (!story?.story.scenes[currentScene]?.audio_url) {
      alert("음성 기능은 백엔드 연결 시 사용할 수 있습니다!");
      return;
    }

    if (audioRef && isAudioPlaying) {
      audioRef.pause();
      setIsAudioPlaying(false);
    } else if (audioRef && !isAudioPlaying) {
      audioRef.play();
      setIsAudioPlaying(true);
    } else {
      const audio = new Audio(story.story.scenes[currentScene].audio_url);
      setAudioRef(audio);

      audio.addEventListener("loadedmetadata", () => {
        setAudioDuration(audio.duration);
      });

      audio.addEventListener("timeupdate", () => {
        setAudioProgress(audio.currentTime);
      });

      audio.addEventListener("ended", () => {
        setIsAudioPlaying(false);
        setAudioProgress(0);
        if (autoPlay && currentScene < story.story.scenes.length - 1) {
          setTimeout(() => goToNextScene(), 1000);
        }
      });

      audio.play();
      setIsAudioPlaying(true);
    }
  }, [story, currentScene, audioRef, isAudioPlaying, autoPlay, goToNextScene]);

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
  }, [goToPreviousScene, goToNextScene, toggleAudio]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-orange-100">
        <div className="max-w-md text-center">
          <div className="mb-6 text-6xl">😔</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            앗, 문제가 발생했어요
          </h2>
          <p className="mb-6 text-gray-600">{error}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/theme")}
              className="px-6 py-3 text-white transition-all duration-300 bg-blue-500 rounded-xl hover:bg-blue-600 hover:scale-105"
            >
              다시 시도하기
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center px-6 py-3 text-gray-600 transition-all duration-300 border border-gray-300 rounded-xl hover:bg-gray-50"
            >
              <Home className="w-4 h-4 mr-2" />
              처음으로
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center px-6 py-3 font-medium text-purple-600 transition-all duration-200 border border-purple-300 rounded-xl hover:bg-purple-50 hover:border-purple-400"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              다시 만들기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto mb-4">
              <Loader2 className="w-full h-full text-purple-500 animate-spin" />
            </div>
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-ping opacity-20"></div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            ✨ {loadingMessage}
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            마법 같은 이야기가 곧 시작됩니다
          </p>
          <div className="max-w-md mx-auto">
            <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            고품질 동화 생성에는 1-2분이 소요됩니다
          </p>
        </div>
      </div>
    );
  }

  if (!story) return null;

  const currentSceneData = story.story.scenes[currentScene];
  const progressPercentage =
    ((currentScene + 1) / story.story.scenes.length) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-20 h-20 rounded-full top-10 left-10 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-20 animate-pulse"></div>
        <div className="absolute w-16 h-16 delay-1000 rounded-full top-32 right-20 bg-gradient-to-r from-pink-300 to-purple-300 opacity-20 animate-pulse"></div>
        <div className="absolute w-24 h-24 rounded-full bottom-20 left-32 bg-gradient-to-r from-blue-300 to-teal-300 opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute text-yellow-300 top-20 right-1/4 opacity-30 animate-twinkle">
          ⭐
        </div>
        <div className="absolute text-yellow-200 delay-1000 top-1/3 right-10 opacity-40 animate-twinkle">
          ✨
        </div>
        <div className="absolute text-yellow-300 bottom-1/3 left-20 opacity-30 animate-twinkle delay-2000">
          🌟
        </div>
      </div>

      {/* 상단 네비게이션 */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center px-4 py-2 text-white transition-all duration-300 border rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 hover:scale-105"
          >
            <Home className="w-4 h-4 mr-2" />
            홈으로
          </button>

          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 text-white border rounded-full bg-white/10 backdrop-blur-md border-white/20">
              <BookOpen className="inline w-4 h-4 mr-2" />
              {currentScene + 1} / {story.story.scenes.length}
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm text-white">{story.story.title}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-3 py-2 text-xs rounded-full transition-all duration-300 border ${
                autoPlay
                  ? "bg-green-500 text-white border-green-400"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              자동재생
            </button>
          </div>
        </div>

        <div className="w-full h-1 mt-4 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full transition-all duration-500 ease-out rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex h-screen pt-24 pb-32">
        <div className="relative flex-1 p-8">
          <div className="relative h-full">
            <div
              key={currentScene}
              className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
            >
              <div className="relative">
                {currentSceneData.image_url ? (
                  <img
                    src={currentSceneData.image_url}
                    alt={`Scene ${currentScene + 1}`}
                    className="object-cover w-full shadow-2xl h-96 rounded-3xl ring-4 ring-white/20"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x400/6366F1/FFFFFF?text=장면+${
                        currentScene + 1
                      }`;
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full shadow-2xl h-96 rounded-3xl ring-4 ring-white/20 bg-gradient-to-br from-purple-400 to-pink-400">
                    <div className="text-center text-white">
                      <BookOpen className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-xl font-semibold">
                        장면 {currentScene + 1}
                      </p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                <div className="absolute px-3 py-1 text-sm font-bold text-gray-800 rounded-full top-4 left-4 bg-white/90 backdrop-blur-sm">
                  장면 {currentScene + 1}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex-1 bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-sm">
          <div className="flex flex-col justify-center h-full p-12">
            <div key={currentScene} className="space-y-6 animate-fadeIn">
              {currentScene === 0 && (
                <div className="mb-8 text-center">
                  <h1 className="mb-2 text-4xl font-bold text-gray-800">
                    {story.story.title}
                  </h1>
                  <div className="flex items-center justify-center space-x-2 text-purple-600">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
                    <span className="text-2xl">📖</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></div>
                  </div>
                </div>
              )}

              <div className="text-xl font-medium leading-relaxed text-gray-700">
                {currentSceneData.content
                  .split("\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-4 animate-slideUp"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오디오 컨트롤 바 */}
      {currentSceneData.audio_url && (
        <div className="absolute p-4 transform -translate-x-1/2 border bottom-20 left-1/2 bg-white/10 backdrop-blur-md rounded-2xl border-white/20 min-w-80">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleAudio}
              className="flex items-center justify-center w-12 h-12 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105"
            >
              {isAudioPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-sm text-white">
                <span>🎵 동화 내레이션</span>
                <span>
                  {Math.floor(audioProgress)}s / {Math.floor(audioDuration)}s
                </span>
              </div>
              <div className="w-full h-2 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full transition-all duration-100 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                  style={{
                    width: `${(audioProgress / audioDuration) * 100 || 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={stopAudio}
              className="flex items-center justify-center w-10 h-10 text-white transition-all duration-300 rounded-full bg-white/20 hover:bg-white/30"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={goToPreviousScene}
            disabled={currentScene === 0}
            className="flex items-center px-6 py-3 text-white transition-all duration-300 border rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            이전
          </button>

          <div className="flex items-center space-x-2">
            {story.story.scenes.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentScene
                    ? "bg-white shadow-lg ring-2 ring-white/50"
                    : index < currentScene
                    ? "bg-white/60 hover:bg-white/80"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => {
                  setCurrentScene(index);
                  stopAudio();
                }}
              />
            ))}
          </div>

          <button
            onClick={goToNextScene}
            disabled={currentScene === story.story.scenes.length - 1}
            className="flex items-center px-6 py-3 text-white transition-all duration-300 border rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            다음
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        <div className="mt-4 text-sm text-center text-white/60">
          <span className="inline-flex items-center space-x-4">
            <span>← → 페이지 이동</span>
            <span>•</span>
            <span>스페이스바 음성 재생</span>
            <span>•</span>
            <span>🎧 헤드폰 착용 권장</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryGeneration;