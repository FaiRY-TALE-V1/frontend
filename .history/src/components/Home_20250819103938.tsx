import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Calendar, Sparkles, Upload } from "lucide-react";
import { Button } from "./ui/Button";
import { ChildProfile, Theme, StoryRequest } from "../types";
import { apiService } from "../services/api";

interface HomeProps {
  onStoryGenerate: (request: StoryRequest) => void;
}

const Home: React.FC<HomeProps> = ({ onStoryGenerate }) => {
  const [childProfile, setChildProfile] = useState<ChildProfile>({
    name: "",
    age: 3,
    photo: undefined,
  });
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 테마 목록 가져오기
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiService.getThemes();
        setThemes(response.themes);
      } catch (error) {
        console.error("테마 로딩 실패:", error);
      }
    };
    fetchThemes();
  }, []);

  // 사진 업로드 처리
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setChildProfile((prev) => ({ ...prev, photo: base64 }));
        setPreviewImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // 스토리 생성 요청
  const handleGenerateStory = async () => {
    if (!childProfile.name || !selectedTheme) {
      alert("아이의 이름과 테마를 모두 선택해주세요!");
      return;
    }

    setIsGenerating(true);
    try {
      const request: StoryRequest = {
        child_profile: childProfile,
        theme: selectedTheme,
      };
      onStoryGenerate(request);
    } catch (error) {
      console.error("스토리 생성 실패:", error);
      alert("스토리 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
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
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg mb-6"
          >
            <Sparkles className="text-primary-500 w-6 h-6" />
            <h1 className="text-2xl font-bold text-gray-800">FaiRY TALE</h1>
            <Sparkles className="text-secondary-500 w-6 h-6" />
          </motion.div>
          <p className="text-lg text-gray-600">
            우리 아이만의 특별한 동화책을 만들어보세요
          </p>
        </div>

        {/* 입력 폼 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card space-y-8"
        >
          {/* 아이 정보 입력 */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <User className="w-5 h-5 text-primary-500" />
              <span>아이 정보</span>
            </h2>

            {/* 이름 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                아이 이름 *
              </label>
              <input
                type="text"
                value={childProfile.name}
                onChange={(e) =>
                  setChildProfile((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="예: 지우"
                className="input-field"
              />
            </div>

            {/* 나이 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                나이 *
              </label>
              <select
                value={childProfile.age}
                onChange={(e) =>
                  setChildProfile((prev) => ({
                    ...prev,
                    age: parseInt(e.target.value),
                  }))
                }
                className="input-field"
              >
                {[...Array(13)].map((_, i) => (
                  <option key={i + 3} value={i + 3}>
                    {i + 3}세
                  </option>
                ))}
              </select>
            </div>

            {/* 사진 업로드 (선택사항) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Upload className="inline w-4 h-4 mr-1" />
                아이 사진 (선택사항)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition-colors duration-200"
                >
                  <div className="text-gray-600">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">사진 선택</p>
                  </div>
                </label>
                {previewImage && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={previewImage}
                      alt="미리보기"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 테마 선택 */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-secondary-500" />
              <span>동화 테마</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {themes.map((theme) => (
                <motion.button
                  key={theme.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTheme(theme.value)}
                  className={`p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                    selectedTheme === theme.value
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="font-medium">{theme.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 생성 버튼 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-6"
          >
            <Button
              onClick={handleGenerateStory}
              loading={isGenerating}
              disabled={!childProfile.name || !selectedTheme}
              className="w-full py-4 text-lg"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {isGenerating ? "동화책 만드는 중..." : "동화책 만들기"}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;

