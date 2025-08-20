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
            { value: "friendship", label: "🤝 우정과 협력", description: "", moral: "", exampleImages: [] },
            { value: "courage", label: "💪 용기와 도전", description: "", moral: "", exampleImages: [] },
            { value: "kindness", label: "❤️ 친절과 배려", description: "", moral: "", exampleImages: [] },
            { value: "honesty", label: "🗣️ 정직과 신뢰", description: "", moral: "", exampleImages: [] },
            { value: "perseverance", label: "🎯 끈기와 노력", description: "", moral: "", exampleImages: [] },
          ]
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
                text: `옛날 옛적에 ${request.child_profile.name}이라는 ${request.child_profile.age}살 ${request.child_profile.gender === 'boy' ? '소년' : '소녀'}이 살고 있었어요. ${request.child_profile.name}은 항상 새로운 모험을 꿈꾸는 아이였답니다.`,
                image_url: "",
                audio_url: ""
              },
              {
                scene_number: 2,
                text: `어느 날, ${request.child_profile.name}은 마법의 숲에서 신비한 친구를 만났어요. 그 친구는 ${request.child_profile.name}에게 특별한 임무를 주었답니다.`,
                image_url: "",
                audio_url: ""
              },
              {
                scene_number: 3,
                text: `${request.child_profile.name}은 용기를 내어 그 임무를 해결했고, 많은 것을 배웠답니다. 그리고 행복하게 집으로 돌아갔어요.`,
                image_url: "",
                audio_url: ""
              }
            ],
            total_scenes: 3
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

export default apiService;

