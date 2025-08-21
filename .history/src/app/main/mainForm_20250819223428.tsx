import React, { useState } from "react";
import { ChevronLeft, Upload, Sparkles, User, Camera, X } from "lucide-react";

interface ProfileData {
  name: string;
  age: number;
  gender: "boy" | "girl";
  photo: string;
}

interface ErrorData {
  name?: string;
  photo?: string;
}

const MainForm = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    age: 7, // 피그마 디자인에서 7세가 선택됨
    gender: "boy", // 피그마 디자인에서 남자아이가 선택됨
    photo: "",
  });
  const [previewImage, setPreviewImage] = useState<string>("");
  const [errors, setErrors] = useState<ErrorData>({});
  const [isUploading, setIsUploading] = useState(false);

  // 나이 옵션들 (이모지와 함께)
  const ageOptions = [
    { value: 3, emoji: "🍼", label: "3세" },
    { value: 4, emoji: "🧸", label: "4세" },
    { value: 5, emoji: "❤️", label: "5세" },
    { value: 6, emoji: "🍪", label: "6세" },
    { value: 7, emoji: "📚", label: "7세" },
  ];

  // 성별 옵션들
  const genderOptions = [
    { value: "boy" as const, emoji: "👦", label: "남자아이" },
    { value: "girl" as const, emoji: "👧", label: "여자아이" },
  ];

  // 사진 업로드 처리
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, photo: "이미지 파일만 업로드 가능합니다." });
      setIsUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setProfile({ ...profile, photo: result });
      setPreviewImage(result);
      setErrors({ ...errors, photo: undefined });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // 폼 검증
  const validateForm = () => {
    const newErrors: ErrorData = {};

    if (!profile.name.trim()) {
      newErrors.name = "아이 이름을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 다음 단계로 이동
  const handleNext = () => {
    if (!validateForm()) return;

    // localStorage에 프로필 저장
    localStorage.setItem("childProfile", JSON.stringify(profile));
    console.log("프로필 저장:", profile);

    // 테마 페이지로 이동
    window.location.href = "/theme";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 반짝이는 별들 */}
        <div className="absolute top-20 left-10 text-yellow-300 animate-twinkle">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute top-32 right-16 text-pink-300 animate-twinkle" style={{ animationDelay: "1s" }}>
          ⭐
        </div>
        <div className="absolute top-48 left-20 text-blue-300 animate-twinkle" style={{ animationDelay: "2s" }}>
          ✨
        </div>
        <div className="absolute bottom-32 right-10 text-purple-300 animate-twinkle" style={{ animationDelay: "0.5s" }}>
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute bottom-20 left-16 text-green-300 animate-twinkle" style={{ animationDelay: "1.5s" }}>
          🌟
        </div>
        <div className="absolute top-60 right-32 text-yellow-400 animate-twinkle" style={{ animationDelay: "2.5s" }}>
          ✨
        </div>
      </div>

      {/* 상단 헤더 */}
      <div className="relative px-6 py-6 bg-white/80 backdrop-blur-sm shadow-sm">
        <button
          onClick={() => (window.location.href = "/")}
          className="absolute p-2 transition-colors transform -translate-y-1/2 rounded-full left-4 top-1/2 hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-medium text-gray-600">2. 아이 정보 입력</h1>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* 제목 */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              우리 아이를 소개해주세요! 
            </h2>
            <p className="text-gray-600">
              아이에게 꼭 맞는 동화를 만들어 드려요
            </p>
          </div>

          {/* 입력 폼 */}
          <div className="space-y-8">
            {/* 아이 이름 입력 */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <User className="w-4 h-4 mr-2 text-blue-500" />
                아이 이름 *
              </label>
              <input
                type="text"
                placeholder="예: 지우, 서준, 하은"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* 나이 선택 */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                📅 나이 *
              </label>
              <div className="grid grid-cols-5 gap-3">
                {ageOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setProfile({ ...profile, age: option.value })}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-200 ${
                      profile.age === option.value
                        ? "border-blue-400 bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white/80 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-xs font-medium text-gray-600">
                      {option.label}
                    </div>
                    {profile.age === option.value && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 성별 선택 */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                👶 성별 *
              </label>
              <div className="grid grid-cols-2 gap-4">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setProfile({ ...profile, gender: option.value })}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                      profile.gender === option.value
                        ? "border-blue-400 bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white/80 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="text-sm font-medium text-gray-700">
                      {option.label}
                    </div>
                    {profile.gender === option.value && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 사진 업로드 */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Camera className="w-4 h-4 mr-2 text-green-500" />
                아이 사진 (선택사항)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                아이의 특징을 담은 사진을 업로드하면 더 닮은 캐릭터를 만들어드려요 (최대 5장)
              </p>
              
              <div className="relative">
                {previewImage ? (
                  <div className="relative p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-white/80">
                    <img
                      src={previewImage}
                      alt="미리보기"
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => {
                        setPreviewImage("");
                        setProfile({ ...profile, photo: "" });
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl bg-white/80 hover:border-gray-300 transition-colors cursor-pointer text-center">
                      <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        사진 선택하기
                      </p>
                      <p className="text-xs text-gray-400">
                        JPG, PNG 파일 (0/5장)
                      </p>
                    </div>
                  </label>
                )}
              </div>
              {errors.photo && (
                <p className="mt-2 text-sm text-red-500">{errors.photo}</p>
              )}
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="mt-12 pt-6">
            <button
              onClick={handleNext}
              disabled={isUploading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "업로드 중..." : "테마 선택하기"}
            </button>
          </div>
        </div>
      </div>

      {/* 하단 장식 - 언덕과 나무들 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-200 via-green-100 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-300 rounded-t-[100px]">
          {/* 나무들 */}
          <div className="absolute bottom-4 left-8 text-green-600">🌳</div>
          <div className="absolute bottom-6 left-24 text-green-700">🌲</div>
          <div className="absolute bottom-4 right-8 text-green-600">🌳</div>
          <div className="absolute bottom-5 right-24 text-green-700">🌲</div>
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-green-600">🌳</div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;