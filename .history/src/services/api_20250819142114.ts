import axios from "axios";
import { StoryRequest, CompleteStoryResponse, Theme } from "../types";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 60초 타임아웃
});

// 공통 에러 처리 함수
const handleApiError = (error: any, defaultMessage: string): never => {
  if (error.response) {
    // 서버에서 응답이 왔지만 에러 상태코드
    const status = error.response.status;
    const message =
      error.response.data?.detail ||
      error.response.data?.message ||
      defaultMessage;

    if (status === 404) {
      throw new Error(
        "요청한 기능을 찾을 수 없습니다. 서버 설정을 확인해주세요."
      );
    } else if (status === 500) {
      throw new Error(`서버 내부 오류가 발생했습니다: ${message}`);
    } else if (status >= 400 && status < 500) {
      throw new Error(`요청 오류: ${message}`);
    } else {
      throw new Error(`서버 오류 (${status}): ${message}`);
    }
  } else if (error.request) {
    // 요청은 보냈지만 응답을 받지 못함
    throw new Error(
      "서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요."
    );
  } else {
    // 요청 설정 중 오류 발생
    throw new Error(`요청 설정 오류: ${error.message}`);
  }
};

export const apiService = {
  // 테마 목록 가져오기 (실제 백엔드 연결)
  getThemes: async (): Promise<{ themes: Theme[] }> => {
    try {
      const response = await api.get("/themes");

      // 백엔드 응답을 프론트엔드 형식으로 변환
      const backendThemes = response.data.themes;
      const themes: Theme[] = [
        {
          value: "healthy_eating",
          label: "🥕 식습관 개선",
          description: "균형 잡힌 영양 섭취의 중요성을 배워요",
          moral: "건강한 몸을 위해서는 다양한 음식을 골고루 먹어야 해요",
          exampleImages: [],
        },
        {
          value: "friendship_skills",
          label: "🤝 교우관계",
          description: "친구 사귀기와 갈등 해결 방법을 배워요",
          moral: "진정한 우정은 서로를 이해하고 배려하는 마음에서 시작돼요",
          exampleImages: [],
        },
        {
          value: "safety_habits",
          label: "🛡️ 안전습관",
          description: "일상 속에서 안전을 지키는 방법을 배워요",
          moral: "안전 수칙을 지키는 것은 나와 다른 사람을 보호하는 일이에요",
          exampleImages: [],
        },
        {
          value: "financial_literacy",
          label: "💰 경제관념",
          description: "용돈 관리와 저축하는 방법을 배워요",
          moral: "계획적인 소비와 저축은 미래를 준비하는 지혜로운 습관이에요",
          exampleImages: [],
        },
        {
          value: "emotional_intelligence",
          label: "💝 감정표현",
          description: "감정을 이해하고 올바르게 표현하는 방법을 배워요",
          moral: "내 마음을 표현하고 다른 사람의 마음을 이해하는 것이 중요해요",
          exampleImages: [],
        },
      ];

      return { themes };
    } catch (error) {
      console.error("테마 목록 조회 실패:", error);
      return handleApiError(error, "테마 목록을 불러올 수 없습니다.");
    }
  },

  // 완전한 스토리 생성 (텍스트, 이미지, 음성 모두 포함)
  generateCompleteStory: async (
    request: StoryRequest
  ): Promise<CompleteStoryResponse> => {
    try {
      const response = await api.post("/generate_complete_story", request);
      return response.data;
    } catch (error) {
      console.error("스토리 생성 실패:", error);
      return handleApiError(error, "스토리를 생성할 수 없습니다.");
    }
  },

  // API 상태 확인
  healthCheck: async (): Promise<any> => {
    try {
      const response = await api.get("/");
      return response.data;
    } catch (error) {
      console.error("API 서버 연결 실패:", error);
      return handleApiError(error, "API 서버 상태를 확인할 수 없습니다.");
    }
  },
};

// Qwen-Image-Edit related interfaces
export interface ImageEditRequest {
  image: string; // Base64 encoded image
  prompt: string;
  negativePrompt?: string;
  numInferenceSteps?: number;
  trueCfgScale?: number;
}

export interface CharacterGenerationRequest {
  childPhoto: string; // Base64 encoded photo
  childName: string;
  age: number;
  gender: "boy" | "girl";
  theme: string;
}

export interface PersonalizedSceneRequest {
  characterImage: string;
  sceneDescription: string;
  childName: string;
  theme: string;
}

export interface ImageEditResponse {
  editedImage: string; // Base64 encoded image
  processingTime: number;
  success: boolean;
}

// Qwen-Image-Edit API functions
export const qwenImageEditService = {
  // 아이 사진을 동화 캐릭터로 변환
  generateCharacterFromPhoto: async (
    request: CharacterGenerationRequest
  ): Promise<ImageEditResponse> => {
    try {
      const editRequest: ImageEditRequest = {
        image: request.childPhoto,
        prompt: `Transform this ${request.age}-year-old ${request.gender} into a beautiful fairy tale character for a ${request.theme} story. Make the character look like a cartoon illustration with soft, child-friendly style. The character should maintain the child's facial features while being stylized as a storybook character named ${request.childName}.`,
        negativePrompt: "realistic photo, adult, scary, dark, inappropriate",
        numInferenceSteps: 50,
        trueCfgScale: 4.0,
      };

      const response = await api.post("/qwen/generate-character", editRequest);
      return response.data;
    } catch (error) {
      console.error("캐릭터 생성 실패:", error);
      return handleApiError(error, "캐릭터 생성에 실패했습니다.");
    }
  },

  // 동화 장면에 캐릭터 삽입 및 개인화
  generatePersonalizedScene: async (
    request: PersonalizedSceneRequest
  ): Promise<ImageEditResponse> => {
    try {
      const editRequest: ImageEditRequest = {
        image: request.characterImage,
        prompt: `Create a beautiful fairy tale scene: ${request.sceneDescription}. The main character ${request.childName} should be prominently featured in the scene. Style: children's book illustration, warm and friendly, educational theme: ${request.theme}`,
        negativePrompt: "scary, dark, inappropriate, violent, adult content",
        numInferenceSteps: 50,
        trueCfgScale: 4.0,
      };

      const response = await api.post("/qwen/generate-scene", editRequest);
      return response.data;
    } catch (error) {
      console.error("장면 생성 실패:", error);
      return handleApiError(error, "장면 생성에 실패했습니다.");
    }
  },

  // 동화 삽화에 텍스트 추가/수정
  addPersonalizedText: async (
    image: string,
    textToAdd: string,
    position: "title" | "subtitle" | "caption"
  ): Promise<ImageEditResponse> => {
    try {
      const editRequest: ImageEditRequest = {
        image: image,
        prompt: `Add the text "${textToAdd}" to this fairy tale illustration in the ${position} position. The text should be in a beautiful, child-friendly font that matches the storybook style. Make it readable and aesthetically pleasing.`,
        negativePrompt: "blurry text, unreadable, inappropriate font",
        numInferenceSteps: 30,
        trueCfgScale: 3.5,
      };

      const response = await api.post("/qwen/add-text", editRequest);
      return response.data;
    } catch (error) {
      console.error("텍스트 추가 실패:", error);
      handleApiError(error, "텍스트 추가에 실패했습니다.");
    }
  },

  // 실시간 이미지 편집 (사용자 피드백 기반)
  editImageWithPrompt: async (
    image: string,
    editPrompt: string
  ): Promise<ImageEditResponse> => {
    try {
      const editRequest: ImageEditRequest = {
        image: image,
        prompt: editPrompt,
        negativePrompt: "low quality, blurry, inappropriate",
        numInferenceSteps: 40,
        trueCfgScale: 4.0,
      };

      const response = await api.post("/qwen/custom-edit", editRequest);
      return response.data;
    } catch (error) {
      console.error("이미지 편집 실패:", error);
      handleApiError(error, "이미지 편집에 실패했습니다.");
    }
  },
};

export default apiService;
