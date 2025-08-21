import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
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
  gender: "boy" | "girl" | "";
  photo: string;
}

interface ErrorData {
  name?: string;
  age?: string;
  gender?: string;
  photo?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    age: 0,
    gender: "",
    photo: "",
  });
  const [previewImage, setPreviewImage] = useState<string>("");
  const [errors, setErrors] = useState<ErrorData>({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // 페이지 새로고침 시 로컬스토리지 초기화
    const clearStorageOnRefresh = () => {
      localStorage.removeItem("childProfile");
      localStorage.removeItem("selectedTheme");
    };

    // 컴포넌트 마운트 시 로컬스토리지 초기화
    clearStorageOnRefresh();

    // 페이지 언로드 시에도 초기화 (새로고침, 탭 닫기 등)
    const handleBeforeUnload = () => {
      localStorage.removeItem("childProfile");
      localStorage.removeItem("selectedTheme");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, photo: "이미지 파일만 업로드 가능합니다." });
      setIsUploading(false);
      return;
    }

    try {
      // 로컬에서 이미지 미리보기 생성 (백엔드 없이도 작동)
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setPreviewImage(imageUrl);
        setProfile((prev) => ({
          ...prev,
          photo: imageUrl,
        }));
        console.log("사진 업로드 성공 (로컬)");
      };
      reader.readAsDataURL(file);

      // 백엔드가 있다면 API 업로드도 시도
      try {
        const uploadResponse = await apiService.uploadPhoto(file);
        if (uploadResponse.success && uploadResponse.data) {
          const serverImageUrl = uploadResponse.data.image_url;
          setPreviewImage(serverImageUrl);
          setProfile((prev) => ({
            ...prev,
            photo: serverImageUrl,
          }));
          console.log("서버 업로드 성공:", uploadResponse.message);
        }
      } catch (serverError) {
        console.log("서버 업로드 실패, 로컬 미리보기 사용");
      }

    } catch (error: any) {
      console.error("사진 업로드 실패:", error);
      setErrors({
        ...errors,
        photo: error.message || "사진 업로드 중 오류가 발생했습니다.",
      });
    } finally {
      setIsUploading(false);
    }

    if (errors.photo) {
      const newErrors = { ...errors };
      delete newErrors.photo;
      setErrors(newErrors);
    }
  };

  const removePhoto = () => {
    setPreviewImage("");
    setProfile((prev) => ({
      ...prev,
      photo: "",
    }));
  };

  const validateForm = () => {
    const newErrors: ErrorData = {};

    if (!profile.name.trim()) {
      newErrors.name = "아이 이름을 입력해주세요.";
    } else if (profile.name.trim().length > 10) {
      newErrors.name = "이름은 10자 이내로 입력해주세요.";
    }

    if (profile.age === 0) {
      newErrors.age = "나이를 선택해주세요.";
    }

    if (profile.gender === "") {
      newErrors.gender = "성별을 선택해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    const childProfile = {
      name: profile.name,
      age: profile.age as 3 | 4 | 5 | 6 | 7,
      gender: profile.gender as "boy" | "girl",
      photo: profile.photo,
    };

    // 로컬스토리지에만 저장 (상태관리 불필요)
    localStorage.setItem("childProfile", JSON.stringify(childProfile));
    console.log("프로필 저장:", childProfile);
    navigate("/theme");
  };

  const ageEmojis: { [key: number]: string } = {
    3: "🍼",
    4: "🧸",
    5: "🎈",
    6: "🎨",
    7: "📚",
  };

  return (
    <div className="relative min-h-screen">
      {/* 헤더 */}
      <div className="relative z-20 px-4 py-6 bg-white shadow-sm">
        <button
          onClick={() => navigate("/")}
          className="absolute p-2 transition-colors transform -translate-y-1/2 rounded-full left-4 top-1/2 hover:bg-gray-100"
        >
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

      <div className="relative z-10 px-4 py-8">
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
              {errors.age && (
                <div className="flex items-center mt-2 text-sm text-red-500">
                  <X className="w-4 h-4 mr-1" />
                  {errors.age}
                </div>
              )}
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
              {errors.gender && (
                <div className="flex items-center mt-2 text-sm text-red-500">
                  <X className="w-4 h-4 mr-1" />
                  {errors.gender}
                </div>
              )}
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
                동화를 만들어드려요 (1장)
              </p>

              {previewImage && (
                <div className="mb-6">
                  <div className="relative max-w-xs mx-auto group aspect-square">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="object-cover w-full h-full border-gray-200 shadow-md border-3 rounded-xl"
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-200 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-xl">
                      <button
                        onClick={removePhoto}
                        className="p-2 text-white transition-all duration-200 transform bg-red-500 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:scale-110"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                  disabled={!!previewImage}
                />
                <label
                  htmlFor="photo-upload"
                  className={`block transition-all duration-200 ${
                    previewImage
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div
                    className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl transition-all duration-200 ${
                      isUploading
                        ? "border-blue-500 bg-blue-50"
                        : previewImage
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
                      {previewImage ? "사진 업로드 완료" : "사진 선택하기"}
                    </p>
                    <p className="mt-2 text-gray-500">
                      {previewImage
                        ? "더 나은 캐릭터 생성을 위해 1장의 사진을 사용합니다"
                        : "JPG, PNG 파일"}
                    </p>
                  </div>
                </label>
              </div>

              {errors.photo && (
                <div className="flex items-center text-sm text-red-500">
                  <X className="w-4 h-4 mr-1" />
                  {errors.photo}
                </div>
              )}
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-center pt-6 mt-8">
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

      {/* 배경 데코레이션 아이콘들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* 왼쪽 상단 */}
        <img src="/star.svg" alt="star" className="absolute top-20 left-10 w-6 h-6 opacity-30" />
        <img src="/circle.svg" alt="circle" className="absolute top-32 left-32 w-8 h-8 opacity-20" />
        
        {/* 오른쪽 상단 */}
        <img src="/spark.svg" alt="spark" className="absolute top-16 right-16 w-5 h-5 opacity-40" />
        <img src="/sun.svg" alt="sun" className="absolute top-40 right-8 w-10 h-10 opacity-25" />
        
        {/* 왼쪽 중간 */}
        <img src="/circle.svg" alt="circle" className="absolute top-64 left-8 w-4 h-4 opacity-30" />
        <img src="/spark.svg" alt="spark" className="absolute top-80 left-24 w-6 h-6 opacity-35" />
        
        {/* 오른쪽 중간 */}
        <img src="/star.svg" alt="star" className="absolute top-72 right-20 w-7 h-7 opacity-25" />
        <img src="/circle.svg" alt="circle" className="absolute top-96 right-12 w-5 h-5 opacity-40" />
        
        {/* 하단 */}
        <img src="/sun.svg" alt="sun" className="absolute bottom-80 left-16 w-8 h-8 opacity-20" />
        <img src="/spark.svg" alt="spark" className="absolute bottom-72 right-24 w-4 h-4 opacity-30" />
        <img src="/star.svg" alt="star" className="absolute bottom-64 left-40 w-6 h-6 opacity-25" />
        <img src="/circle.svg" alt="circle" className="absolute bottom-56 right-32 w-9 h-9 opacity-15" />
      </div>

      {/* 하단 grass SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
        <img
          src="/grass.svg"
          alt="grass decoration"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Profile;
