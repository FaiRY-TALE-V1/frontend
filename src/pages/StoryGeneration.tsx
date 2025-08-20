import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { apiService } from "../services/api";
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
import { CompleteStoryResponse, ChildProfile, StoryRequest } from "../types";

const StoryGeneration = () => {
  const navigate = useNavigate();
  const { 
    state, 
    setCurrentStory, 
    setCurrentScene: setAppCurrentScene,
    canProceedToStory 
  } = useAppContext();
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
        // 이미 동화가 있으면 다시 생성하지 않음
        if (state.currentStory || story) {
          setIsLoading(false);
          console.log("이미 생성된 동화가 있습니다. 다시 생성하지 않습니다.");
          return;
        }

        setIsLoading(true);
        setError(null);

        if (!canProceedToStory) {
          navigate("/theme");
          return;
        }

        let childProfile: ChildProfile;
        let selectedTheme: string;

        if (state.childProfile && state.selectedTheme) {
          childProfile = state.childProfile;
          selectedTheme = state.selectedTheme;
        } else {
          const savedProfile = localStorage.getItem("childProfile");
          const savedTheme = localStorage.getItem("selectedTheme");

          if (!savedProfile || !savedTheme) {
            throw new Error(
              "프로필 또는 테마 정보가 없습니다. 처음부터 다시 시작해주세요."
            );
          }

          childProfile = JSON.parse(savedProfile);
          selectedTheme = savedTheme;
        }

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
        }, 2000);

        // 실제 API 호출
        const storyRequest: StoryRequest = {
          child_profile: {
            name: childProfile.name,
            age: childProfile.age,
            gender: childProfile.gender,
            photo: childProfile.photo
          },
          theme: themeName
        };

        console.log("백엔드 API 호출 중...");
        const response = await apiService.generateCompleteStory(storyRequest);
        
        clearInterval(messageInterval);
        
        if (response.success && response.data) {
          console.log("동화 생성 완료:", response.data);
          setStory(response.data);
          setCurrentStory(response.data);
          
          // 상태 업데이트를 강제로 처리
          setTimeout(() => {
            setIsLoading(false);
            console.log("로딩 상태 해제 완료");
          }, 100);
        } else {
          throw new Error(response.error || "API 응답 오류");
        }
      } catch (err: any) {
        console.error("동화 생성 실패:", err);
        setError(err.message || "동화 생성 중 오류가 발생했습니다.");
        setIsLoading(false);
      }
    };

    generateStory();
  }, [state, navigate, canProceedToStory, setCurrentStory]);

  useEffect(() => {
    if (state.currentStory && !story) {
      setStory(state.currentStory);
      setCurrentScene(state.currentScene);
      setIsLoading(false);
      console.log("기존 동화 로드됨:", state.currentStory.story.title);
    }
  }, [state.currentStory, state.currentScene, story]);

  const stopAudio = useCallback(() => {
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }
    setIsAudioPlaying(false);
    setAudioProgress(0);
  }, [audioRef]);

  const handleSceneChange = useCallback((newScene: number) => {
    setCurrentScene(newScene);
    setAppCurrentScene(newScene);
    stopAudio();
  }, [setAppCurrentScene, stopAudio]);

  const goToPreviousScene = useCallback(() => {
    if (currentScene > 0) {
      handleSceneChange(currentScene - 1);
    }
  }, [currentScene, handleSceneChange]);

  const goToNextScene = useCallback(() => {
    if (story && currentScene < story.story.scenes.length - 1) {
      handleSceneChange(currentScene + 1);
    }
  }, [currentScene, story, handleSceneChange]);

  const toggleAudio = useCallback(() => {
    if (!story?.story.scenes[currentScene]?.audio_url) {
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
              onClick={() => {
                setError(null);
                window.location.reload();
              }}
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
            AI가 맞춤형 동화를 생성하고 있습니다
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200">
      {/* 동화책 스타일 배경 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 구름들 */}
        <div className="absolute top-10 left-10 w-32 h-20 bg-white rounded-full opacity-70 animate-float">
          <div className="absolute top-2 left-6 w-20 h-12 bg-white rounded-full"></div>
          <div className="absolute top-4 right-4 w-16 h-10 bg-white rounded-full"></div>
        </div>
        <div className="absolute top-20 right-20 w-28 h-16 bg-white rounded-full opacity-60 animate-float-delayed">
          <div className="absolute top-1 left-4 w-16 h-10 bg-white rounded-full"></div>
        </div>
        <div className="absolute bottom-32 left-16 w-24 h-14 bg-white rounded-full opacity-50 animate-float">
          <div className="absolute top-2 left-3 w-14 h-8 bg-white rounded-full"></div>
        </div>
        
        {/* 반짝이는 별들 */}
        <div className="absolute text-4xl text-yellow-400 top-16 right-1/4 animate-bounce-slow">
          ⭐
        </div>
        <div className="absolute text-3xl text-yellow-300 delay-1000 top-1/3 right-12 animate-bounce-slow">
          ✨
        </div>
        <div className="absolute text-2xl text-pink-400 bottom-1/3 left-24 animate-bounce-slow delay-2000">
          🌟
        </div>
        <div className="absolute text-3xl text-blue-400 top-1/4 left-1/4 animate-bounce-slow">
          💫
        </div>
        
        {/* 무지개 */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 h-32 opacity-30">
          <div className="w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full mb-1"></div>
          <div className="w-11/12 h-2 bg-gradient-to-r from-red-300 via-yellow-300 via-green-300 via-blue-300 to-purple-300 rounded-full ml-4 mb-1"></div>
          <div className="w-5/6 h-2 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200 rounded-full ml-8"></div>
        </div>
      </div>

      {/* 상단 헤더 - 동화책 스타일 */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center px-6 py-3 text-purple-700 transition-all duration-300 bg-white border-2 border-purple-200 rounded-full shadow-lg hover:bg-purple-50 hover:scale-105 hover:shadow-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            <span className="font-bold">🏠 홈으로</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="px-6 py-3 text-purple-700 bg-white border-2 border-purple-200 rounded-full shadow-lg">
              <BookOpen className="inline w-5 h-5 mr-2 text-purple-500" />
              <span className="font-bold text-lg">{currentScene + 1} / {story.story.scenes.length}</span>
            </div>
            <div className="flex items-center px-6 py-3 space-x-2 text-purple-700 bg-white border-2 border-purple-200 rounded-full shadow-lg">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-lg">{story.story.title}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 border-2 shadow-lg ${
                autoPlay
                  ? "bg-green-500 text-white border-green-400 hover:bg-green-600"
                  : "bg-white text-purple-700 border-purple-200 hover:bg-purple-50"
              }`}
            >
              {autoPlay ? "🔄 자동재생 중" : "▶️ 자동재생"}
            </button>
          </div>
        </div>

        {/* 진행률 바 - 더 귀여운 스타일 */}
        <div className="w-full h-3 mt-4 overflow-hidden bg-white border-2 border-purple-200 rounded-full shadow-inner">
          <div
            className="h-full transition-all duration-500 ease-out rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 메인 콘텐츠 - 동화책 페이지 스타일 */}
      <div className="flex h-screen pt-32 pb-40">
        <div className="relative flex-1 p-8">
          <div className="relative h-full">
            <div
              key={currentScene}
              className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
            >
              <div className="relative">
                {/* 동화책 페이지 프레임 */}
                <div className="relative p-4 bg-white border-4 border-purple-300 rounded-3xl shadow-2xl">
                  {currentSceneData.image_url ? (
                    <img
                      src={currentSceneData.image_url}
                      alt={`Scene ${currentScene + 1}`}
                      className="object-cover w-full h-96 rounded-2xl border-2 border-purple-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://picsum.photos/400/400?random=${
                          currentScene + 1
                        }&blur=1`;
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-96 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-300 to-pink-300">
                      <div className="text-center text-white">
                        <BookOpen className="w-20 h-20 mx-auto mb-4" />
                        <p className="text-2xl font-bold">
                          장면 {currentScene + 1}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* 페이지 번호 스티커 */}
                  <div className="absolute -top-2 -left-2 px-4 py-2 text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg border-2 border-white">
                    📖 {currentScene + 1}
                  </div>
                  
                  {/* 스티커 장식들 */}
                  <div className="absolute -top-1 -right-1 text-2xl animate-bounce-slow">
                    ⭐
                  </div>
                  <div className="absolute -bottom-1 -left-1 text-2xl animate-bounce-slow delay-1000">
                    💖
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="flex flex-col justify-center h-full p-12">
            {/* 동화책 텍스트 페이지 */}
            <div className="relative p-8 mx-8 bg-white border-4 border-purple-300 rounded-3xl shadow-2xl">
              <div key={currentScene} className="space-y-6 animate-fadeIn">
                {currentScene === 0 && (
                  <div className="mb-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-purple-800">
                      {story.story.title}
                    </h1>
                    <div className="flex items-center justify-center space-x-4 text-purple-600">
                      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"></div>
                      <span className="text-3xl">📚</span>
                      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"></div>
                    </div>
                  </div>
                )}

                {/* 텍스트 내용을 더 아이 친화적으로 */}
                <div className="text-2xl font-bold leading-relaxed text-gray-800 text-center">
                  {(currentSceneData.text || "")
                    .split("\n")
                    .map((paragraph: string, index: number) => (
                      <p
                        key={index}
                        className="mb-6 animate-slideUp"
                        style={{ 
                          animationDelay: `${index * 0.3}s`,
                          lineHeight: '1.8'
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>

                {/* 페이지 하단 장식 */}
                <div className="flex justify-center mt-8 space-x-4">
                  <span className="text-xl animate-bounce-slow">🌸</span>
                  <span className="text-xl animate-bounce-slow delay-500">🦋</span>
                  <span className="text-xl animate-bounce-slow delay-1000">🌸</span>
                </div>
              </div>
              
              {/* 페이지 모서리 장식 */}
              <div className="absolute top-2 left-2 text-purple-300">
                <div className="w-8 h-8 border-l-4 border-t-4 border-purple-300 rounded-tl-lg"></div>
              </div>
              <div className="absolute top-2 right-2 text-purple-300">
                <div className="w-8 h-8 border-r-4 border-t-4 border-purple-300 rounded-tr-lg"></div>
              </div>
              <div className="absolute bottom-2 left-2 text-purple-300">
                <div className="w-8 h-8 border-l-4 border-b-4 border-purple-300 rounded-bl-lg"></div>
              </div>
              <div className="absolute bottom-2 right-2 text-purple-300">
                <div className="w-8 h-8 border-r-4 border-b-4 border-purple-300 rounded-br-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오디오 컨트롤 바 - 아이 친화적 디자인 */}
      {currentSceneData.audio_url && (
        <div className="absolute p-6 transform -translate-x-1/2 bg-white border-4 border-purple-300 bottom-24 left-1/2 rounded-3xl shadow-2xl min-w-96">
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleAudio}
              className="flex items-center justify-center w-16 h-16 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-110 hover:shadow-xl border-4 border-white"
            >
              {isAudioPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 ml-1" />
              )}
            </button>

            <div className="flex-1 space-y-3">
              <div className="flex justify-between text-base font-bold text-purple-700">
                <span className="flex items-center">
                  <span className="mr-2 text-xl">🎵</span>
                  동화 내레이션
                </span>
                <span className="text-purple-500">
                  {Math.floor(audioProgress)}초 / {Math.floor(audioDuration)}초
                </span>
              </div>
              <div className="w-full h-3 overflow-hidden bg-purple-100 border-2 border-purple-200 rounded-full">
                <div
                  className="h-full transition-all duration-100 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 shadow-sm"
                  style={{
                    width: `${(audioProgress / audioDuration) * 100 || 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={stopAudio}
              className="flex items-center justify-center w-12 h-12 text-purple-600 transition-all duration-300 bg-purple-100 border-2 border-purple-300 rounded-full hover:bg-purple-200 hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
          
          {/* 오디오 컨트롤러 장식 */}
          <div className="absolute -top-1 left-4 text-xl animate-bounce-slow">
            🎼
          </div>
          <div className="absolute -top-1 right-4 text-xl animate-bounce-slow delay-1000">
            🎶
          </div>
        </div>
      )}

      {/* 하단 네비게이션 - 아이 친화적 큰 버튼 */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center justify-center space-x-8">
          <button
            onClick={goToPreviousScene}
            disabled={currentScene === 0}
            className="flex items-center px-8 py-4 text-xl font-bold text-purple-700 transition-all duration-300 bg-white border-4 border-purple-300 rounded-full shadow-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-xl"
          >
            <ChevronLeft className="w-6 h-6 mr-2" />
            <span>⬅️ 이전</span>
          </button>

          {/* 페이지 인디케이터 - 더 크고 귀여운 스타일 */}
          <div className="flex items-center space-x-3">
            {story.story.scenes.map((_, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full transition-all duration-300 hover:scale-125 border-2 ${
                  index === currentScene
                    ? "bg-gradient-to-r from-pink-400 to-purple-400 border-white shadow-lg scale-125"
                    : index < currentScene
                    ? "bg-green-400 border-green-300 hover:bg-green-500"
                    : "bg-white border-purple-300 hover:bg-purple-100"
                }`}
                onClick={() => handleSceneChange(index)}
              >
                {index === currentScene && (
                  <span className="flex items-center justify-center w-full h-full text-xs text-white font-bold">
                    {index + 1}
                  </span>
                )}
                {index < currentScene && (
                  <span className="flex items-center justify-center w-full h-full text-xs text-white">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextScene}
            disabled={currentScene === story.story.scenes.length - 1}
            className="flex items-center px-8 py-4 text-xl font-bold text-purple-700 transition-all duration-300 bg-white border-4 border-purple-300 rounded-full shadow-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-xl"
          >
            <span>다음 ➡️</span>
            <ChevronRight className="w-6 h-6 ml-2" />
          </button>
        </div>

        <div className="mt-6 text-lg font-medium text-center text-purple-600">
          <div className="inline-flex items-center space-x-6 px-8 py-3 bg-white border-2 border-purple-200 rounded-full shadow-lg">
            <span className="flex items-center">
              <span className="mr-2">🖱️</span>
              클릭으로 페이지 이동
            </span>
            <span>•</span>
            <span className="flex items-center">
              <span className="mr-2">⌨️</span>
              스페이스바로 음성 재생
            </span>
            <span>•</span>
            <span className="flex items-center">
              <span className="mr-2">🎧</span>
              헤드폰 착용 권장
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryGeneration;