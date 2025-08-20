export interface ChildProfile {
  name: string;
  age: number;
  gender: "boy" | "girl";
  photos: string[]; // 다중 사진 업로드를 위한 배열
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
