import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Upload, X, Camera } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ChildProfile } from "../types";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ChildProfile>({
    name: "",
    age: 3,
    gender: "boy",
    photos: [],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 사진 업로드 처리
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (previewImages.length + files.length > 5) {
      setErrors({...errors, photos: "최대 5장까지 업로드 가능합니다."});
      return;
    }

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setErrors({...errors, photos: "이미지 파일만 업로드 가능합니다."});
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setPreviewImages(prev => [...prev, base64]);
        setProfile(prev => ({
          ...prev,
          photos: [...prev.photos, base64]
        }));
      };
      reader.readAsDataURL(file);
    });

    // 에러 클리어
    if (errors.photos) {
      const newErrors = {...errors};
      delete newErrors.photos;
      setErrors(newErrors);
    }
  };

  // 사진 삭제
  const removePhoto = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setProfile(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  // 유효성 검증
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!profile.name.trim()) {
      newErrors.name = "아이 이름을 입력해주세요.";
    }
    
    if (profile.name.trim().length > 10) {
      newErrors.name = "이름은 10자 이내로 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 다음 단계로
  const handleNext = () => {
    if (!validateForm()) return;
    
    // 프로필 데이터를 localStorage에 저장 (임시)
    localStorage.setItem('childProfile', JSON.stringify(profile));
    navigate('/theme');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        {/* 헤더 */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            우리 아이를 소개해주세요
          </motion.h1>
          <p className="text-gray-600">
            아이의 정보를 입력하시면 더욱 특별한 동화를 만들어드려요
          </p>
        </div>

        {/* 프로필 입력 폼 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* 아이 이름 */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-medium text-gray-800">
              <User className="w-5 h-5 mr-2 text-primary-500" />
              아이 이름 *
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="예: 지우, 서준, 하은"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* 나이 선택 */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-medium text-gray-800">
              <Calendar className="w-5 h-5 mr-2 text-primary-500" />
              나이 *
            </label>
            <div className="grid grid-cols-5 gap-3">
              {[3, 4, 5, 6, 7].map((age) => (
                <motion.button
                  key={age}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfile(prev => ({ ...prev, age }))}
                  className={`py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                    profile.age === age
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl mb-1 block">{age === 3 ? '🍼' : age === 4 ? '🧸' : age === 5 ? '🎈' : age === 6 ? '🎨' : '📚'}</span>
                  <span className="text-sm font-medium">{age}세</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 성별 선택 */}
          <div className="space-y-3">
            <label className="text-lg font-medium text-gray-800">
              성별 *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setProfile(prev => ({ ...prev, gender: 'boy' }))}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  profile.gender === 'boy'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-2">👦</div>
                <div className="font-medium">남자아이</div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setProfile(prev => ({ ...prev, gender: 'girl' }))}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  profile.gender === 'girl'
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-2">👧</div>
                <div className="font-medium">여자아이</div>
              </motion.button>
            </div>
          </div>

          {/* 사진 업로드 */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-medium text-gray-800">
              <Camera className="w-5 h-5 mr-2 text-primary-500" />
              아이 사진 (선택사항)
            </label>
            <p className="text-sm text-gray-600">
              아이의 특징을 담은 사진을 업로드하면 더욱 닮은 캐릭터로 동화를 만들어드려요 (최대 5장)
            </p>
            
            {/* 사진 미리보기 */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {previewImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
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
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors duration-200"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-3" />
                <p className="text-gray-600 font-medium">사진 선택하기</p>
                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG 파일 (최대 5장)
                </p>
              </label>
            </div>
            
            {errors.photos && (
              <p className="text-red-500 text-sm">{errors.photos}</p>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="px-6"
            >
              이전
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!profile.name.trim()}
              className="px-8"
            >
              테마 선택하기
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
