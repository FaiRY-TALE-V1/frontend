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
  content: string;
  image_description: string;
  image_url?: string;
  audio_url?: string;
  narration: string;
}

export interface Story {
  title: string;
  moral: string;
  scenes: StoryScene[];
}

export interface StoryRequest {
  child_profile: ChildProfile;
  theme: string;
}

export interface CompleteStoryResponse {
  story: Story;
  character_image: string; // Qwen이 생성한 캐릭터 이미지
  total_scenes: number;
}
