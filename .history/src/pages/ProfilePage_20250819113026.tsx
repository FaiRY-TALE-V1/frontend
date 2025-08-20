import React, { useState } from "react";
import {
  User,
  Calendar,
  Upload,
  X,
  Camera,
  Check,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

interface ProfileData {
  name: string;
  age: number;
  gender: "boy" | "girl";
  photos: string[];
}

interface ErrorData {
  name?: string;
  photos?: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    age: 5,
    gender: "boy",
    photos: [],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ErrorData>({});
  const [isUploading, setIsUploading] = useState(false);

  // 사진 업로드 처리
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setIsUploading(true);

    if (previewImages.length + files.length > 5) {
      setErrors({ ...errors, photos: "최대 5장까지 업로드 가능합니다." });
      setIsUploading(false);
      return;
    }

    files.forEach((file: File) => {
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, photos: "이미지 파일만 업로드 가능합니다." });
        setIsUploading(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setPreviewImages((prev) => [...prev, base64]);
        setProfile((prev) => ({
          ...prev,
          photos: [...prev.photos, base64],
        }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    });

    // 에러 클리어
    if (errors.photos) {
      const newErrors = { ...errors };
      delete newErrors.photos;
      setErrors(newErrors);
    }
  };

  // 사진 삭제
  const removePhoto = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setProfile((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // 유효성 검증
  const validateForm = () => {
    const newErrors: ErrorData = {};

    if (!profile.name.trim()) {
      newErrors.name = "아이 이름을 입력해주세요.";
    } else if (profile.name.trim().length > 10) {
      newErrors.name = "이름은 10자 이내로 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 다음 단계로
  const handleNext = () => {
    if (!validateForm()) return;

    // 실제 서비스에서는 API 호출
    console.log("프로필 저장:", profile);
    alert("프로필이 저장되었습니다! 다음 단계로 진행합니다.");
  };

  const ageEmojis: { [key: number]: string } = {
    3: "🍼",
    4: "🧸",
    5: "🎈",
    6: "🎨",
    7: "📚",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 헤더 */}
      <div className="relative px-4 py-6 bg-white shadow-sm">
        <button className="absolute p-2 transition-colors transform -translate-y-1/2 rounded-full left-4 top-1/2 hover:bg-gray-100">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">프로필 설정</h1>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-2">
              <div className="w-8 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-8 h-1.5 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-1.5 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 메인 타이틀 */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-gray-800">
              우리 아이를 소개해주세요
            </h2>
            <p className="text-lg text-gray-600">
              아이의 정보를 입력하시면 더욱 특별한 동화를 만들어드려요
            </p>
          </div>

          {/* 프로필 입력 폼 */}
          <div className="p-8 space-y-8 bg-white shadow-xl rounded-2xl">
            {/* 아이 이름 */}
            <div className="space-y-3">
              <label className="flex items-center text-lg font-semibold text-gray-800">
                <div className="flex items-center justify-center w-6 h-6 mr-3 bg-blue-100 rounded-full">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                아이 이름 *
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="예: 지우, 서준, 하은"
                className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg ${
                  errors.name
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-gray-50 focus:bg-white"
                }`}
              />
              {errors.name && (
                <div className="flex items-center mt-2 text-sm text-red-500">
                  <X className="w-4 h-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* 나이 선택 */}
            <div className="space-y-4">
              <label className="flex items-center text-lg font-semibold text-gray-800">
                <div className="flex items-center justify-center w-6 h-6 mr-3 bg-purple-100 rounded-full">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                나이 *
              </label>
              <div className="grid grid-cols-5 gap-3">
                {[3, 4, 5, 6, 7].map((age) => (
                  <button
                    key={age}
                    onClick={() => setProfile((prev) => ({ ...prev, age }))}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      profile.age === age
                        ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    {profile.age === age && (
                      <div className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full -top-2 -right-2">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="mb-2 text-2xl">{ageEmojis[age]}</div>
                    <div
                      className={`text-sm font-semibold ${
                        profile.age === age ? "text-blue-700" : "text-gray-700"
                      }`}
                    >
                      {age}세
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 성별 선택 */}
            <div className="space-y-4">
              <label className="flex items-center text-lg font-semibold text-gray-800">
                <div className="flex items-center justify-center w-6 h-6 mr-3 bg-pink-100 rounded-full">
                  <User className="w-4 h-4 text-pink-600" />
                </div>
                성별 *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() =>
                    setProfile((prev) => ({ ...prev, gender: "boy" }))
                  }
                  className={`relative p-8 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
                    profile.gender === "boy"
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {profile.gender === "boy" && (
                    <div className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full top-3 right-3">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="mb-3 text-5xl">👦</div>
                  <div
                    className={`font-semibold text-lg ${
                      profile.gender === "boy"
                        ? "text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    남자아이
                  </div>
                </button>

                <button
                  onClick={() =>
                    setProfile((prev) => ({ ...prev, gender: "girl" }))
                  }
                  className={`relative p-8 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
                    profile.gender === "girl"
                      ? "border-pink-500 bg-pink-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {profile.gender === "girl" && (
                    <div className="absolute flex items-center justify-center w-6 h-6 bg-pink-500 rounded-full top-3 right-3">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="mb-3 text-5xl">👧</div>
                  <div
                    className={`font-semibold text-lg ${
                      profile.gender === "girl"
                        ? "text-pink-700"
                        : "text-gray-700"
                    }`}
                  >
                    여자아이
                  </div>
                </button>
              </div>
            </div>

            {/* 사진 업로드 */}
            <div className="space-y-4">
              <label className="flex items-center text-lg font-semibold text-gray-800">
                <div className="flex items-center justify-center w-6 h-6 mr-3 bg-green-100 rounded-full">
                  <Camera className="w-4 h-4 text-green-600" />
                </div>
                아이 사진 (선택사항)
              </label>
              <p className="p-4 text-gray-600 rounded-lg bg-blue-50">
                💡 아이의 특징을 담은 사진을 업로드하면 더욱 닮은 캐릭터로
                동화를 만들어드려요 (최대 5장)
              </p>

              {/* 사진 미리보기 */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="object-cover w-full h-full border-gray-200 shadow-md border-3 rounded-xl"
                      />
                      <div className="absolute inset-0 flex items-center justify-center transition-all duration-200 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-xl">
                        <button
                          onClick={() => removePhoto(index)}
                          className="p-2 text-white transition-all duration-200 transform bg-red-500 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:scale-110"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 파일 선택 */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                  disabled={previewImages.length >= 5}
                />
                <label
                  htmlFor="photo-upload"
                  className={`block transition-all duration-200 ${
                    previewImages.length >= 5
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div
                    className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl transition-all duration-200 ${
                      isUploading
                        ? "border-blue-500 bg-blue-50"
                        : previewImages.length >= 5
                        ? "border-gray-200 bg-gray-50"
                        : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    {isUploading ? (
                      <div className="w-8 h-8 mb-3 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                    ) : (
                      <Upload className="w-12 h-12 mb-4 text-gray-400" />
                    )}
                    <p className="text-lg font-semibold text-gray-700">
                      {previewImages.length >= 5
                        ? "사진 업로드 완료"
                        : "사진 선택하기"}
                    </p>
                    <p className="mt-2 text-gray-500">
                      {previewImages.length >= 5
                        ? "최대 5장까지 업로드됨"
                        : `JPG, PNG 파일 (${previewImages.length}/5장)`}
                    </p>
                  </div>
                </label>
              </div>

              {errors.photos && (
                <div className="flex items-center text-sm text-red-500">
                  <X className="w-4 h-4 mr-1" />
                  {errors.photos}
                </div>
              )}
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-center justify-between pt-6 mt-8">
            <button className="px-6 py-3 font-medium text-gray-600 transition-colors rounded-xl hover:bg-gray-100">
              이전
            </button>

            <button
              onClick={handleNext}
              disabled={!profile.name.trim()}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                !profile.name.trim()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 shadow-lg hover:shadow-xl"
              }`}
            >
              테마 선택하기 →
            </button>
          </div>

          {/* 프로그레스 정보 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              1단계 / 3단계 - 프로필 설정 중
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
