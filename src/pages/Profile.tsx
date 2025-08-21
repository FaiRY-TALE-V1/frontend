import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { apiService } from "../services/api";
import {
  User,
  Calendar,
  Upload,
  X,
  Camera,
  Check,
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

const Profile = () => {
  const navigate = useNavigate();
  const { state, setChildProfile } = useAppContext();
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    age: 5,
    gender: "boy",
    photos: [],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ErrorData>({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("childProfile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
        setPreviewImage(parsedProfile.photo || "");
      } catch (error) {
        console.error("프로필 로드 실패:", error);
      }
    } else if (state.childProfile) {
      setProfile({
        name: state.childProfile.name,
        age: state.childProfile.age,
        gender: state.childProfile.gender,
        photo: state.childProfile.photo,
      });
      setPreviewImage(state.childProfile.photo || "");
    }
  }, [state.childProfile]);

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const newPhotos: string[] = [];
    let processedCount = 0;

    filesToProcess.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, photos: "이미지 파일만 업로드 가능합니다." });
        setIsUploading(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        newPhotos.push(base64);
        processedCount++;

        if (processedCount === filesToProcess.length) {
          setPreviewImages((prev) => [...prev, ...newPhotos]);
          setProfile((prev) => ({
            ...prev,
            photos: [...prev.photos, ...newPhotos],
          }));
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });

    try {
      // 백엔드 API를 사용한 파일 업로드
      const uploadResponse = await apiService.uploadPhoto(file);

      if (uploadResponse.success && uploadResponse.data) {
        const imageUrl = uploadResponse.data.image_url;
        setPreviewImage(imageUrl);
        setProfile((prev) => ({
          ...prev,
          photo: imageUrl,
        }));
        console.log("사진 업로드 성공:", uploadResponse.message);
      } else {
        throw new Error(uploadResponse.error || "업로드 실패");
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
      delete newErrors.photos;
      setErrors(newErrors);
    }
  };

  const removePhoto = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setProfile((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: ErrorData = {};

    if (!profile.name.trim()) {
      newErrors.name = "아이 이름을 입력해주세요.";
    } else if (profile.name.trim().length > 10) {
      newErrors.name = "이름은 10자 이내로 입력해주세요.";
    }

    if (profile.photos.length === 0) {
      newErrors.photos = "최소 1장의 사진을 업로드해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    const childProfile = {
      name: profile.name,
      age: profile.age as 3 | 4 | 5 | 6 | 7,
      gender: profile.gender,
      photo: profile.photo,
    };

    setChildProfile(childProfile);
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

  // 고정된 배경 아이콘 위치 설정 (중앙과 가장자리에 골고루 분산)
  const backgroundIcons = [
    // 최상단 가장자리
    { src: '/images/circle.svg', position: { top: '8%', left: '12%' }, size: '20px' },
    { src: '/images/star.svg', position: { top: '5%', left: '45%' }, size: '32px' },
    { src: '/images/sun.svg', position: { top: '10%', left: '88%' }, size: '32px' },
    
    // 상단 중간층
    { src: '/images/spark.svg', position: { top: '18%', left: '25%' }, size: '32px' },
    { src: '/images/circle.svg', position: { top: '22%', left: '65%' }, size: '20px' },
    { src: '/images/star.svg', position: { top: '25%', left: '85%' }, size: '32px' },
    
    // 좌측 가장자리
    { src: '/images/sun.svg', position: { top: '35%', left: '5%' }, size: '32px' },
    { src: '/images/spark.svg', position: { top: '55%', left: '8%' }, size: '32px' },
    { src: '/images/circle.svg', position: { top: '75%', left: '6%' }, size: '20px' },
    
    // 우측 가장자리  
    { src: '/images/star.svg', position: { top: '38%', left: '92%' }, size: '32px' },
    { src: '/images/sun.svg', position: { top: '58%', left: '90%' }, size: '32px' },
    { src: '/images/spark.svg', position: { top: '78%', left: '94%' }, size: '32px' },
    
    // 중앙 영역 (콘텐츠와 겹치지 않는 위치)
    { src: '/images/circle.svg', position: { top: '32%', left: '45%' }, size: '20px' },
    { src: '/images/star.svg', position: { top: '68%', left: '55%' }, size: '32px' },
    { src: '/images/sun.svg', position: { top: '40%', left: '70%' }, size: '32px' },
    { src: '/images/spark.svg', position: { top: '60%', left: '35%' }, size: '32px' },
    
    // 하단 중간층
    { src: '/images/circle.svg', position: { top: '85%', left: '25%' }, size: '20px' },
    { src: '/images/star.svg', position: { top: '88%', left: '50%' }, size: '32px' },
    { src: '/images/sun.svg', position: { top: '82%', left: '75%' }, size: '32px' },
    
    // 최하단 가장자리
    { src: '/images/spark.svg', position: { top: '95%', left: '15%' }, size: '32px' },
    { src: '/images/circle.svg', position: { top: '92%', left: '65%' }, size: '20px' },
    { src: '/images/star.svg', position: { top: '98%', left: '85%' }, size: '32px' },
    
    // 추가 중간 위치들
    { src: '/images/sun.svg', position: { top: '28%', left: '30%' }, size: '32px' },
    { src: '/images/circle.svg', position: { top: '45%', left: '60%' }, size: '20px' },
    { src: '/images/spark.svg', position: { top: '72%', left: '20%' }, size: '32px' },
    { src: '/images/star.svg', position: { top: '52%', left: '75%' }, size: '32px' },
    
    // 모서리 근처 추가
    { src: '/images/circle.svg', position: { top: '15%', left: '95%' }, size: '20px' },
    { src: '/images/sun.svg', position: { top: '65%', left: '3%' }, size: '32px' },
    { src: '/images/spark.svg', position: { top: '12%', left: '8%' }, size: '32px' },
  ];

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
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">
              우리 아이를 소개해주세요!
            </h2>
            <p className="text-lg text-gray-600">
              아이의 정보를 입력하시면 더욱 특별한 동화를 만들어드려요!
            </p>
          </div>

          {/* 프로필 입력 폼 */}
          <div className="p-8 space-y-8 bg-white shadow-xl rounded-2xl mb-8">
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
                아이 사진 *
              </label>
              <p className="p-4 text-gray-600 rounded-lg bg-blue-50">
                💡 아이의 특징을 담은 사진을 업로드하면 더욱 닮은 캐릭터로
                동화를 만들어드려요 (1장 ~ 5장)
              </p>

              {previewImages.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {previewImages.map((image, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="object-cover w-full h-full border-2 border-gray-200 shadow-md rounded-xl"
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
                  <p className="mt-3 text-sm text-center text-gray-500">
                    {previewImages.length} / 5장 업로드됨
                  </p>
                </div>
              )}

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                  multiple
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
                      {previewImages.length >= 5 ? "최대 5장까지 업로드 가능" : "사진 선택하기"}
                    </p>
                    <p className="mt-2 text-gray-500">
                      {previewImages.length >= 5
                        ? "더 많은 사진을 업로드하려면 기존 사진을 삭제해주세요"
                        : "JPG, PNG 파일 (최대 5장)"}
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

          <div className="flex justify-center pt-6 mt-8">

            <button
              onClick={handleNext}
              disabled={!profile.name.trim() || profile.photos.length === 0}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                !profile.name.trim() || profile.photos.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-700 to-emerald-600 text-white hover:from-emerald-800 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-xl"
              }`}
            >
              테마 선택하기 →
            </button>
          </div>

          {/* 프로그레스 정보 */}
          <div className="mt-8 text-center">
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
