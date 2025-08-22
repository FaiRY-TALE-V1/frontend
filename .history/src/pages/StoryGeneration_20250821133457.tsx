import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, Pause, BookOpen, Loader2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { apiService } from "../services/api";
import { ChildProfile, StoryRequest, CompleteStoryResponse } from "../types";

export default function StoryGeneration() {
  const { state, setCurrentStory, setCurrentScene: setAppCurrentScene } = useAppContext();
  const navigate = useNavigate();
  
  // State
  const [story, setStory] = useState<CompleteStoryResponse | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("AI가 동화를 만들고 있어요...");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 유효성 검사
  const canProceedToStory = (state.childProfile && state.selectedTheme) || 
    (localStorage.getItem("childProfile") && localStorage.getItem("selectedTheme"));

  // 동화 생성
  useEffect(() => {
    let messageInterval: NodeJS.Timeout | null = null;
    let isCancelled = false;

    const generateStory = async () => {
      try {
        if (state.currentStory || story) {
          setIsLoading(false);
          return;
        }

        if (isCancelled) return;

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
            throw new Error("프로필 또는 테마 정보가 없습니다. 처음부터 다시 시작해주세요.");
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

        const loadingMessages = [
          "AI가 동화를 만들고 있어요... (약 3-5분 소요)",
          "캐릭터를 생성하고 있어요... 🎨", 
          "6개 장면을 그리고 있어요... 🖼️",
          "내레이션을 녹음하고 있어요... 🎵",
          "마지막 마무리 중이에요... ✨",
          "완성까지 조금만 기다려주세요! 🙏",
        ];

        let messageIndex = 0;
        messageInterval = setInterval(() => {
          if (isCancelled) return;
          messageIndex = (messageIndex + 1) % loadingMessages.length;
          setLoadingMessage(loadingMessages[messageIndex]);
        }, 2000);

        const storyRequest: StoryRequest = {
          child_profile: {
            name: childProfile.name,
            age: childProfile.age,
            gender: childProfile.gender,
            photo: childProfile.photo
          },
          theme: themeName
        };

        const response = await apiService.generateCompleteStory(storyRequest);
        
        if (messageInterval) {
          clearInterval(messageInterval);
          messageInterval = null;
        }
        
        if (isCancelled) return;
        
        if (response.success && response.data) {
          setStory(response.data);
          setCurrentStory(response.data);
          
          setTimeout(() => {
            if (!isCancelled) {
              setIsLoading(false);
            }
          }, 100);
        } else {
          throw new Error(response.error || "API 응답 오류");
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err.message || "동화 생성 중 오류가 발생했습니다.");
          setIsLoading(false);
        }
      }
    };

    generateStory();

    return () => {
      isCancelled = true;
      if (messageInterval) {
        clearInterval(messageInterval);
        messageInterval = null;
      }
    };
  }, [state, navigate, canProceedToStory, setCurrentStory]);

  // 기존 동화 로드
  useEffect(() => {
    if (state.currentStory && !story) {
      setStory(state.currentStory);
      setCurrentScene(state.currentScene || 0);
      setIsLoading(false);
    }
  }, [state.currentStory, state.currentScene, story]);

  // 오디오 정리
  const stopAudio = useCallback(() => {
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }
    setIsAudioPlaying(false);
    setAudioRef(null);
  }, [audioRef]);

  // 장면 변경
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

  // 오디오 토글
  const toggleAudio = useCallback(() => {
    if (!story?.story.scenes[currentScene]?.audio_url) return;

    const currentSceneAudio = story.story.scenes[currentScene]?.audio_url;
    if (!currentSceneAudio) return;
    
    const audioUrl = currentSceneAudio.startsWith('http') 
      ? currentSceneAudio 
      : `http://localhost:8000${currentSceneAudio}`;

    if (audioRef && isAudioPlaying) {
      audioRef.pause();
      setIsAudioPlaying(false);
      return;
    }

    if (audioRef && !isAudioPlaying && audioRef.src === audioUrl) {
      audioRef.play().catch((error) => {
        console.log('Audio play failed:', error);
        setIsAudioPlaying(false);
      });
      setIsAudioPlaying(true);
      return;
    }

    const audio = new Audio(audioUrl);
    setAudioRef(audio);

    audio.addEventListener("loadedmetadata", () => {
      // Audio loaded
    });

    audio.addEventListener("ended", () => {
      setIsAudioPlaying(false);
    });

    audio.play().catch((error) => {
      console.log('Audio play failed:', error);
      setIsAudioPlaying(false);
    });
    setIsAudioPlaying(true);
  }, [story, currentScene, audioRef, isAudioPlaying]);

  // 키보드 이벤트
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPreviousScene();
      } else if (e.key === "ArrowRight") {
        goToNextScene();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPreviousScene, goToNextScene]);

  // 컴포넌트 언마운트 시 오디오 정리
  useEffect(() => {
    return () => {
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
        setIsAudioPlaying(false);
        setAudioRef(null);
      }
    };
  }, [audioRef]);

  // 에러 화면
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-orange-100">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl border-4 border-red-300">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">동화 생성에 실패했어요</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/theme")}
            className="px-6 py-3 bg-purple-500 text-white rounded-full font-bold hover:bg-purple-600 transition-all"
          >
            다시 시도하기
          </button>
        </div>
      </div>
    );
  }

  // 로딩 화면
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto mb-4">
              <Loader2 className="w-full h-full text-purple-500 animate-spin" />
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            ✨ {loadingMessage}
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            AI가 맞춤형 동화를 생성하고 있습니다
          </p>
        </div>
      </div>
    );
  }

  if (!story) return null;

  const currentSceneData = story.story.scenes[currentScene];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200">
      
      {/* 메인 콘텐츠 - 아이들을 위한 깔끔한 레이아웃 */}
      <div className="relative flex h-screen pt-10 pb-10">
        
        {/* 왼쪽 이전 버튼 */}
        <div className="flex items-center justify-center w-20">
          <button
            onClick={goToPreviousScene}
            disabled={currentScene === 0}
            className="w-16 h-16 text-white transition-all duration-300 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-8 h-8 mx-auto" />
          </button>
        </div>

        {/* 중앙 콘텐츠 영역 */}
        <div className="flex-1 px-8">
          <div className="flex h-full gap-8">
            
            {/* 이미지 영역 (60%) */}
            <div className="w-3/5">
              <div className="relative h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative max-w-full max-h-full">
                    <div className="relative p-6 bg-white border-4 border-purple-300 rounded-3xl shadow-2xl">
                      {currentSceneData.image_url ? (
                        <img
                          src={currentSceneData.image_url}
                          alt={`Scene ${currentScene + 1}`}
                          className="object-contain w-full max-w-2xl h-auto max-h-[500px] rounded-2xl border-2 border-purple-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://picsum.photos/600/600?random=${
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
                      
                      {/* 페이지 번호 */}
                      <div className="absolute -top-2 -left-2 px-4 py-2 text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg">
                        {currentScene + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 텍스트 + 오디오 영역 (40%) */}
            <div className="w-2/5">
              <div className="relative h-full">
                <div className="absolute inset-0 flex flex-col justify-center">
                  <div className="relative p-8 bg-white border-4 border-purple-300 rounded-3xl shadow-2xl">
                    
                    {/* 제목 (첫 번째 장면만) */}
                    {currentScene === 0 && (
                      <div className="mb-6 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-purple-800">
                          {story.story.title}
                        </h1>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-12 h-1 bg-purple-400 rounded-full"></div>
                          <span className="text-2xl">📚</span>
                          <div className="w-12 h-1 bg-purple-400 rounded-full"></div>
                        </div>
                      </div>
                    )}

                    {/* 스토리 텍스트 */}
                    <div className="mb-6 text-center">
                      <div className="text-2xl font-bold leading-relaxed text-gray-800">
                        {(currentSceneData.text || "")
                          .split("\n")
                          .map((paragraph: string, index: number) => (
                            <p key={index} className="mb-4" style={{ lineHeight: '1.6' }}>
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </div>

                    {/* 오디오 재생 버튼 */}
                    {currentSceneData.audio_url && (
                      <div className="text-center">
                        <button
                          onClick={toggleAudio}
                          className="flex items-center justify-center w-16 h-16 mx-auto text-white transition-all duration-300 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg hover:scale-110"
                        >
                          {isAudioPlaying ? (
                            <Pause className="w-8 h-8" />
                          ) : (
                            <Play className="w-8 h-8 ml-1" />
                          )}
                        </button>
                        <p className="mt-2 text-sm text-purple-600 font-semibold">
                          {isAudioPlaying ? "일시정지" : "들려줘"}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 오른쪽 다음 버튼 */}
        <div className="flex items-center justify-center w-20">
          <button
            onClick={goToNextScene}
            disabled={currentScene === story.story.scenes.length - 1}
            className="w-16 h-16 text-white transition-all duration-300 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-8 h-8 mx-auto" />
          </button>
        </div>

      </div>

      {/* 하단 페이지 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-3">
          {story.story.scenes.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentScene
                  ? "bg-purple-500 scale-125"
                  : index < currentScene
                  ? "bg-green-400"
                  : "bg-white border-2 border-purple-300"
              }`}
              onClick={() => handleSceneChange(index)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}