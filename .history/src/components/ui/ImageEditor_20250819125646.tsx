import React, { useState, useRef } from "react";
import {
  Upload,
  Wand2,
  Download,
  Loader2,
  Image as ImageIcon,
  Edit3,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { qwenImageEditService, ImageEditResponse } from "../../services/api";

interface ImageEditorProps {
  onImageGenerated?: (image: string) => void;
  initialImage?: string;
  childName?: string;
  theme?: string;
  mode: "character" | "scene" | "text" | "custom";
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  onImageGenerated,
  initialImage,
  childName = "아이",
  theme = "우정",
  mode,
}) => {
  const [image, setImage] = useState<string>(initialImage || "");
  const [editedImage, setEditedImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [textToAdd, setTextToAdd] = useState("");
  const [textPosition, setTextPosition] = useState<"title" | "subtitle" | "caption">("title");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCharacter = async () => {
    if (!image) return;

    setIsProcessing(true);
    setProcessingStep("아이 사진을 동화 캐릭터로 변환 중...");

    try {
      const result: ImageEditResponse = await qwenImageEditService.generateCharacterFromPhoto({
        childPhoto: image,
        childName,
        age: 5,
        gender: "boy", // 실제로는 프로필에서 가져올 것
        theme,
      });

      if (result.success) {
        setEditedImage(result.editedImage);
        onImageGenerated?.(result.editedImage);
      }
    } catch (error) {
      console.error("Character generation failed:", error);
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  const generateScene = async () => {
    if (!image) return;

    setIsProcessing(true);
    setProcessingStep("동화 장면 생성 중...");

    try {
      const result: ImageEditResponse = await qwenImageEditService.generatePersonalizedScene({
        characterImage: image,
        sceneDescription: editPrompt,
        childName,
        theme,
      });

      if (result.success) {
        setEditedImage(result.editedImage);
        onImageGenerated?.(result.editedImage);
      }
    } catch (error) {
      console.error("Scene generation failed:", error);
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  const addText = async () => {
    if (!image || !textToAdd) return;

    setIsProcessing(true);
    setProcessingStep("텍스트 추가 중...");

    try {
      const result: ImageEditResponse = await qwenImageEditService.addPersonalizedText(
        image,
        textToAdd,
        textPosition
      );

      if (result.success) {
        setEditedImage(result.editedImage);
        onImageGenerated?.(result.editedImage);
      }
    } catch (error) {
      console.error("Text addition failed:", error);
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  const customEdit = async () => {
    if (!image || !editPrompt) return;

    setIsProcessing(true);
    setProcessingStep("이미지 편집 중...");

    try {
      const result: ImageEditResponse = await qwenImageEditService.editImageWithPrompt(
        image,
        editPrompt
      );

      if (result.success) {
        setEditedImage(result.editedImage);
        onImageGenerated?.(result.editedImage);
      }
    } catch (error) {
      console.error("Custom edit failed:", error);
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  const downloadImage = () => {
    if (editedImage) {
      const link = document.createElement("a");
      link.href = editedImage;
      link.download = `fairy-tale-${mode}-${Date.now()}.png`;
      link.click();
    }
  };

  const resetEditor = () => {
    setEditedImage("");
    setEditPrompt("");
    setTextToAdd("");
  };

  const renderModeSpecificControls = () => {
    switch (mode) {
      case "character":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                🎭 캐릭터 생성
              </h3>
              <p className="text-blue-600 text-sm mb-4">
                아이의 사진을 업로드하면 {theme} 테마의 동화 캐릭터로 변환해드립니다.
              </p>
              <button
                onClick={generateCharacter}
                disabled={!image || isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {childName} 캐릭터 생성하기
              </button>
            </div>
          </div>
        );

      case "scene":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                🎨 장면 생성
              </h3>
              <textarea
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="원하는 동화 장면을 설명해주세요. 예: '마법의 숲에서 요정들과 놀고 있는 모습'"
                className="w-full p-3 border border-green-200 rounded-lg resize-none h-20 text-sm"
              />
              <button
                onClick={generateScene}
                disabled={!image || !editPrompt || isProcessing}
                className="w-full mt-3 bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                동화 장면 만들기
              </button>
            </div>
          </div>
        );

      case "text":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                📝 텍스트 추가
              </h3>
              <input
                type="text"
                value={textToAdd}
                onChange={(e) => setTextToAdd(e.target.value)}
                placeholder="추가할 텍스트를 입력하세요"
                className="w-full p-3 border border-purple-200 rounded-lg text-sm mb-3"
              />
              <select
                value={textPosition}
                onChange={(e) => setTextPosition(e.target.value as any)}
                className="w-full p-3 border border-purple-200 rounded-lg text-sm mb-3"
              >
                <option value="title">제목</option>
                <option value="subtitle">부제목</option>
                <option value="caption">캡션</option>
              </select>
              <button
                onClick={addText}
                disabled={!image || !textToAdd || isProcessing}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                텍스트 추가하기
              </button>
            </div>
          </div>
        );

      case "custom":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">
                ✨ 자유 편집
              </h3>
              <textarea
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="어떻게 수정하고 싶은지 설명해주세요. 예: '배경을 무지개색으로 바꿔주세요', '꽃을 더 많이 그려주세요'"
                className="w-full p-3 border border-orange-200 rounded-lg resize-none h-20 text-sm"
              />
              <button
                onClick={customEdit}
                disabled={!image || !editPrompt || isProcessing}
                className="w-full mt-3 bg-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                이미지 편집하기
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 이미지 업로드 및 편집 영역 */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            {image ? (
              <div className="relative">
                <img
                  src={image}
                  alt="업로드된 이미지"
                  className="max-w-full h-auto rounded-lg mx-auto"
                />
                <button
                  onClick={() => setImage("")}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="py-12">
                <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">이미지를 업로드하세요</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center mx-auto"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  파일 선택
                </button>
              </div>
            )}
          </div>

          {editedImage && (
            <div className="border border-green-300 rounded-lg p-4 bg-green-50">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                ✨ 편집 완료
              </h3>
              <img
                src={editedImage}
                alt="편집된 이미지"
                className="max-w-full h-auto rounded-lg mx-auto mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={downloadImage}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  다운로드
                </button>
                <button
                  onClick={resetEditor}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  다시 시작
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 컨트롤 패널 */}
        <div className="space-y-6">
          {renderModeSpecificControls()}

          {isProcessing && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                <div>
                  <p className="text-blue-800 font-semibold">AI 처리 중...</p>
                  <p className="text-blue-600 text-sm">{processingStep}</p>
                </div>
              </div>
              <div className="mt-3 w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
