export interface ChildProfile {
  name: string;
  age: number;
  gender: "boy" | "girl";
  photo: string; // Qwen은 한 장의 사진으로 캐릭터 생성
}

export interface Theme {
  value: string;
  label: string;
  description: string;
  moral: string;
  exampleImages: string[];
}

export interface StoryScene {
  scene_number: number;
  text: string;
  image_url?: string;
  audio_url?: string;
}

export interface Story {
  title: string;
  scenes: StoryScene[];
  total_scenes: number;
}

export interface StoryRequest {
  child_profile: ChildProfile;
  theme: string;
}

export interface CompleteStoryResponse {
  title: string;
  scenes: {
    scene_number: number;
    text: string;
    image_url: string;
    audio_url: string;
  }[];
  total_scenes: number;
}
