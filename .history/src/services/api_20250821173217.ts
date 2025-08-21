import {
  StoryRequest,
  CompleteStoryResponse,
  Theme,
  ApiResponse,
} from "../types";
import { apiClient } from "./apiClient";

export const apiService = {
  // 테마 목록 가져오기
  getThemes: async (): Promise<ApiResponse<{ themes: Theme[] }>> => {
    // 실제 API 호출을 시도하되, 실패시 mock 데이터 반환
    const apiResponse = await apiClient.get<{ themes: Theme[] }>("/themes");

    if (!apiResponse.success) {
      console.warn("API 호출 실패, mock 데이터 사용:", apiResponse.error);

      // Mock 테마 데이터
      const mockThemes: Theme[] = [
        {
          value: "healthy_eating",
          title: "식습관 개선",
          emoji: "🥕",
          label: "🥕 식습관 개선",
          description: "균형 잡힌 영양 섭취의 중요성을 배워요",
          moral: "건강한 몸을 위해서는 다양한 음식을 골고루 먹어야 해요",
          keywords: ["건강", "영양", "균형"],
          color: "from-green-400 to-emerald-600",
          bgColor: "bg-green-50",
          examples: [
            "🥬 채소 친구들의 모험",
            "🍎 과일 왕국 여행",
            "🥛 우유와 칼슘 요정",
          ],
          exampleImages: [],
        },
        {
          value: "friendship_skills",
          title: "교우관계",
          emoji: "🤝",
          label: "🤝 교우관계",
          description: "친구 사귀기와 갈등 해결 방법을 배워요",
          moral: "진정한 우정은 서로를 이해하고 배려하는 마음에서 시작돼요",
          keywords: ["우정", "화해", "소통"],
          color: "from-blue-400 to-sky-600",
          bgColor: "bg-blue-50",
          examples: [
            "🌈 화해의 무지개",
            "🎭 새친구 환영 파티",
            "🤲 마음을 나누는 다리",
          ],
          exampleImages: [],
        },
        {
          value: "safety_habits",
          title: "안전습관",
          emoji: "🚦",
          label: "🚦 안전습관",
          description: "일상 속에서 안전을 지키는 방법을 배워요",
          moral: "안전 수칙을 지키는 것은 나와 다른 사람을 보호하는 일이에요",
          keywords: ["안전", "조심", "보호"],
          color: "from-red-400 to-orange-600",
          bgColor: "bg-red-50",
          examples: [
            "🚦 신호등 친구의 가르침",
            "👮 안전 경찰관과 모험",
            "🏠 우리 집 안전 점검",
          ],
          exampleImages: [],
        },
        {
          value: "financial_literacy",
          title: "경제관념",
          emoji: "💰",
          label: "💰 경제관념",
          description: "용돈 관리와 저축하는 방법을 배워요",
          moral: "계획적인 소비와 저축은 미래를 준비하는 지혜로운 습관이에요",
          keywords: ["저축", "계획", "현명함"],
          color: "from-yellow-400 to-amber-600",
          bgColor: "bg-yellow-50",
          examples: [
            "🐷 저금통 돼지의 여행",
            "💎 보물섬의 지혜",
            "🏪 꼬마 상인의 이야기",
          ],
          exampleImages: [],
        },
        {
          value: "emotional_intelligence",
          title: "감정표현",
          emoji: "💕",
          label: "💕 감정표현",
          description: "감정을 이해하고 올바르게 표현하는 방법을 배워요",
          moral: "내 마음을 표현하고 다른 사람의 마음을 이해하는 것이 중요해요",
          keywords: ["감정", "공감", "소통"],
          color: "from-pink-400 to-rose-600",
          bgColor: "bg-pink-50",
          examples: [
            "😊 감정 요정들의 여행",
            "🤗 마음을 나누는 숲",
            "💕 위로의 마법사",
          ],
          exampleImages: [],
        },
      ];

      return {
        success: true,
        data: { themes: mockThemes },
        message: "Mock 데이터를 사용했습니다.",
      };
    }

    return apiResponse;
  },

  // 완전한 스토리 생성
  generateCompleteStory: async (
    request: StoryRequest
  ): Promise<ApiResponse<CompleteStoryResponse>> => {
    const response = await apiClient.post<CompleteStoryResponse>(
      "/generate_complete_story",
      request
    );
    return response;
  },

  // API 상태 확인
  healthCheck: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.get("/");
    return response;
  },

  // 서버 연결 상태 확인
  checkServerConnection: async (): Promise<boolean> => {
    return await apiClient.healthCheck();
  },

  // 아이 사진 업로드
  uploadPhoto: async (
    file: File
  ): Promise<
    ApiResponse<{ image_url: string; message: string; file_info: any }>
  > => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload_photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "업로드 실패");
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "파일 업로드 중 오류가 발생했습니다.",
      };
    }
  },
};

export default apiService;
