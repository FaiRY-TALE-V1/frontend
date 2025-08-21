import axios from "axios";
import { StoryRequest, CompleteStoryResponse, Theme } from "../types";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiService = {
  // 테마 목록 가져오기 (현재는 더미 데이터 반환)
  getThemes: async (): Promise<{ themes: Theme[] }> => {
    // 실제 API 호출 대신 더미 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          themes: [
            {
              value: "friendship",
              label: "🤝 우정과 협력",
              description: "",
              moral: "",
              exampleImages: [],
            },
            {
              value: "courage",
              label: "💪 용기와 도전",
              description: "",
              moral: "",
              exampleImages: [],
            },
            {
              value: "kindness",
              label: "❤️ 친절과 배려",
              description: "",
              moral: "",
              exampleImages: [],
            },
            {
              value: "honesty",
              label: "🗣️ 정직과 신뢰",
              description: "",
              moral: "",
              exampleImages: [],
            },
            {
              value: "perseverance",
              label: "🎯 끈기와 노력",
              description: "",
              moral: "",
              exampleImages: [],
            },
          ],
        });
      }, 500);
    });
  },

  // 완전한 스토리 생성 (텍스트, 이미지, 음성 모두 포함)
  generateCompleteStory: async (
    request: StoryRequest
  ): Promise<CompleteStoryResponse> => {
    try {
      const response = await api.post("/generate_complete_story", request);
      return response.data;
    } catch (error) {
      // API 서버가 없을 경우를 대비한 더미 데이터
      console.log("API 서버에 연결할 수 없어 더미 데이터를 반환합니다.");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            title: `${request.child_profile.name}의 모험`,
            scenes: [
              {
                scene_number: 1,
                text: `옛날 옛적에 ${request.child_profile.name}이라는 ${
                  request.child_profile.age
                }살 ${
                  request.child_profile.gender === "boy" ? "소년" : "소녀"
                }이 살고 있었어요. ${
                  request.child_profile.name
                }은 항상 새로운 모험을 꿈꾸는 아이였답니다.`,
                image_url: "",
                audio_url: "",
              },
              {
                scene_number: 2,
                text: `어느 날, ${request.child_profile.name}은 마법의 숲에서 신비한 친구를 만났어요. 그 친구는 ${request.child_profile.name}에게 특별한 임무를 주었답니다.`,
                image_url: "",
                audio_url: "",
              },
              {
                scene_number: 3,
                text: `${request.child_profile.name}은 용기를 내어 그 임무를 해결했고, 많은 것을 배웠답니다. 그리고 행복하게 집으로 돌아갔어요.`,
                image_url: "",
                audio_url: "",
              },
            ],
            total_scenes: 3,
          });
        }, 3000); // 3초 로딩 시뮬레이션
      });
    }
  },

  // API 상태 확인
  healthCheck: async (): Promise<any> => {
    try {
      const response = await api.get("/");
      return response.data;
    } catch (error) {
      return { status: "API server not available" };
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
      console.log("Qwen API 서버에 연결할 수 없어 더미 데이터를 반환합니다.");
      // 더미 응답 (실제로는 Qwen-Image-Edit 처리된 이미지가 반환될 것)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            editedImage:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", // 더미 이미지
            processingTime: 15000,
            success: true,
          });
        }, 5000);
      });
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
      console.log("Qwen API 서버에 연결할 수 없어 더미 데이터를 반환합니다.");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            editedImage:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
            processingTime: 20000,
            success: true,
          });
        }, 7000);
      });
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
      console.log("Qwen API 서버에 연결할 수 없어 더미 데이터를 반환합니다.");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            editedImage: image, // 실제로는 텍스트가 추가된 이미지
            processingTime: 10000,
            success: true,
          });
        }, 3000);
      });
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
      console.log("Qwen API 서버에 연결할 수 없어 더미 데이터를 반환합니다.");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            editedImage: image,
            processingTime: 12000,
            success: true,
          });
        }, 4000);
      });
    }
  },
};

export default apiService;
