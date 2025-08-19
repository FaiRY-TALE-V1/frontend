import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Volume2,
  VolumeX,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Star,
} from "lucide-react";

// 더미 스토리 데이터
const dummyStory = {
  title: "마법의 숲과 용감한 토끼",
  scenes: [
    {
      text: "옛날 옛적, 깊은 숲 속에 토리라는 작은 토끼가 살고 있었어요.\n\n토리는 다른 토끼들과는 달리 모험을 좋아하고, 새로운 것을 탐험하는 것을 무척 좋아했답니다. 어느 화창한 아침, 토리는 숲 너머에 무지개빛 빛이 나는 것을 발견했어요.",
      image_url:
        "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&h=600&fit=crop&crop=center",
      audio_url: "/audio/scene1.mp3",
    },
    {
      text: "호기심 많은 토리는 그 신비한 빛을 따라가기로 결심했어요.\n\n길을 걷다 보니 평소에 보지 못했던 아름다운 꽃들이 피어 있었고, 나비들이 춤을 추며 날아다니고 있었답니다. '와! 이곳은 정말 마법 같아!' 토리는 감탄하며 말했어요.",
      image_url:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&crop=center",
      audio_url: "/audio/scene2.mp3",
    },
    {
      text: "그때 갑자기 길 앞에 거대한 바위가 나타났어요. 바위에는 이상한 글씨가 새겨져 있었답니다.\n\n'용기 있는 자만이 진정한 보물을 찾을 수 있다.' 토리는 잠시 고민했지만, 용기를 내어 바위를 밀어보기로 했어요. 그러자 놀랍게도 바위가 움직이기 시작했답니다!",
      image_url:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop&crop=center",
      audio_url: "/audio/scene3.mp3",
    },
    {
      text: "바위 뒤에는 반짝이는 크리스탈 동굴이 숨어 있었어요!\n\n동굴 안에서는 아름다운 음악이 흘러나오고 있었고, 벽면에는 수많은 보석들이 반짝이고 있었답니다. 그리고 동굴 가장 깊숙한 곳에서는... 작은 요정이 토리를 기다리고 있었어요!",
      image_url:
        "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=600&h=600&fit=crop&crop=center",
      audio_url: "/audio/scene4.mp3",
    },
    {
      text: "'안녕, 용감한 토끼야!' 요정이 반갑게 인사했어요.\n\n'너의 용기와 모험심 덕분에 이곳을 찾을 수 있었구나. 이제 너는 진정한 보물을 얻을 자격이 있어!' 요정은 토리에게 마법의 목걸이를 건네주었어요. 그 목걸이는 언제나 토리를 보호해 줄 거라고 했답니다.",
      image_url:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center",
      audio_url: "/audio/scene5.mp3",
    },
    {
      text: "토리는 마법의 목걸이를 받고 집으로 돌아왔어요.\n\n그날 밤부터 토리는 더욱 용감하고 지혜로운 토끼가 되었답니다. 그리고 숲의 다른 동물 친구들에게도 용기의 중요성을 가르쳐주며, 모두 함께 행복하게 살았답니다.\n\n- 끝 -",
      image_url:
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop&crop=center",
      audio_url: "/audio/scene6.mp3",
    },
  ],
};

const FairytaleePage = () => {
  const [story] = useState(dummyStory);
  const [currentScene, setCurrentScene] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  // 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 오디오 재생/정지
  const toggleAudio = () => {
    if (!story?.scenes[currentScene]?.audio_url) return;

    if (audioRef && isAudioPlaying) {
      audioRef.pause();
      setIsAudioPlaying(false);
    } else if (audioRef && !isAudioPlaying) {
      audioRef.play();
      setIsAudioPlaying(true);
    } else {
      // 실제 서비스에서는 실제 오디오 파일을 사용
      // 여기서는 더미로 처리
      console.log("Playing audio for scene:", currentScene + 1);
      setIsAudioPlaying(true);
      setAudioDuration(30); // 30초 더미 길이

      // 더미 오디오 진행 시뮬레이션
      const interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 30) {
            setIsAudioPlaying(false);
            clearInterval(interval);
            if (autoPlay && currentScene < story.scenes.length - 1) {
              setTimeout(() => goToNextScene(), 1000);
            }
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
  };

  const stopAudio = () => {
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }
    setIsAudioPlaying(false);
    setAudioProgress(0);
  };

  // 장면 이동
  const goToPreviousScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
      stopAudio();
    }
  };

  const goToNextScene = () => {
    if (story && currentScene < story.scenes.length - 1) {
      setCurrentScene(currentScene + 1);
      stopAudio();
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

  // 로딩 화면
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
            ✨ AI가 동화를 만들고 있어요
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            마법 같은 이야기가 곧 시작됩니다
          </p>
          <div className="max-w-md mx-auto">
            <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!story) return null;

  const currentSceneData = story.scenes[currentScene];
  const progressPercentage = ((currentScene + 1) / story.scenes.length) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-20 h-20 rounded-full top-10 left-10 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-20 animate-pulse"></div>
        <div className="absolute w-16 h-16 delay-1000 rounded-full top-32 right-20 bg-gradient-to-r from-pink-300 to-purple-300 opacity-20 animate-pulse"></div>
        <div className="absolute w-24 h-24 rounded-full bottom-20 left-32 bg-gradient-to-r from-blue-300 to-teal-300 opacity-20 animate-pulse delay-2000"></div>
        {/* 별 장식 */}
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
          <button className="flex items-center px-4 py-2 text-white transition-all duration-300 border rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 hover:scale-105">
            <Home className="w-4 h-4 mr-2" />
            홈으로
          </button>

          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 text-white border rounded-full bg-white/10 backdrop-blur-md border-white/20">
              <BookOpen className="inline w-4 h-4 mr-2" />
              {currentScene + 1} / {story.scenes.length}
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm text-white">동화 읽기</span>
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

        {/* 진행률 바 */}
        <div className="w-full h-1 mt-4 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full transition-all duration-500 ease-out rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex h-screen pt-24 pb-32">
        {/* 왼쪽: 삽화 */}
        <div className="relative flex-1 p-8">
          <div className="relative h-full">
            <div
              key={currentScene}
              className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
            >
              <div className="relative">
                <img
                  src={currentSceneData.image_url}
                  alt={`Scene ${currentScene + 1}`}
                  className="object-cover w-full shadow-2xl h-96 rounded-3xl ring-4 ring-white/20"
                />
                {/* 이미지 오버레이 효과 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                {/* 장면 번호 표시 */}
                <div className="absolute px-3 py-1 text-sm font-bold text-gray-800 rounded-full top-4 left-4 bg-white/90 backdrop-blur-sm">
                  장면 {currentScene + 1}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 스토리 텍스트 */}
        <div className="relative flex-1 bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-sm">
          <div className="flex flex-col justify-center h-full p-12">
            <div key={currentScene} className="space-y-6 animate-fadeIn">
              {/* 동화 제목 (첫 번째 장면에서만) */}
              {currentScene === 0 && (
                <div className="mb-8 text-center">
                  <h1 className="mb-2 text-4xl font-bold text-gray-800">
                    {story.title}
                  </h1>
                  <div className="flex items-center justify-center space-x-2 text-purple-600">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
                    <span className="text-2xl">📖</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></div>
                  </div>
                </div>
              )}

              {/* 스토리 텍스트 */}
              <div className="text-xl font-medium leading-relaxed text-gray-700">
                {currentSceneData.text.split("\n").map((paragraph, index) => (
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
                {Math.floor(audioProgress)}s / {audioDuration}s
              </span>
            </div>
            <div className="w-full h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full transition-all duration-100 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                style={{ width: `${(audioProgress / audioDuration) * 100}%` }}
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

          {/* 장면 도트 표시기 */}
          <div className="flex items-center space-x-2">
            {story.scenes.map((_, index) => (
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
            disabled={currentScene === story.scenes.length - 1}
            className="flex items-center px-6 py-3 text-white transition-all duration-300 border rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            다음
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        {/* 키보드 단축키 안내 */}
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

export default FairytaleePage;
