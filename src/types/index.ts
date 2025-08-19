// 기본 타입 정의
export type Gender = "boy" | "girl";
export type Age = 3 | 4 | 5 | 6 | 7;
export type ThemeValue = 
  | "healthy_eating"
  | "friendship_skills"
  | "safety_habits"
  | "financial_literacy"
  | "emotional_intelligence";

// 아이 프로필 인터페이스
export interface ChildProfile {
  name: string;
  age: Age;
  gender: Gender;
  photo: string;
}

// 테마 인터페이스
export interface Theme {
  value: ThemeValue;
  title: string;
  emoji: string;
  description: string;
  moral: string;
  keywords: string[];
  color: string;
  bgColor: string;
  examples: string[];
  label?: string; // 기존 호환성을 위해 옵셔널
  exampleImages?: string[]; // 기존 호환성을 위해 옵셔널
}

// 스토리 장면 인터페이스
export interface StoryScene {
  scene_number: number;
  content: string;
  image_description: string;
  image_url?: string;
  audio_url?: string;
  narration: string;
}

// 스토리 인터페이스
export interface Story {
  title: string;
  moral: string;
  scenes: StoryScene[];
}

// API 요청/응답 인터페이스
export interface StoryRequest {
  child_profile: ChildProfile;
  theme: string;
}

export interface CompleteStoryResponse {
  story: Story;
  character_image_url: string;
}

// UI 관련 인터페이스
export interface FormErrors {
  name?: string;
  photo?: string;
  [key: string]: string | undefined;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 컴포넌트 Props 인터페이스
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationProps extends BaseComponentProps {
  onNext?: () => void;
  onPrevious?: () => void;
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
  nextText?: string;
  previousText?: string;
}

// 오디오 관련 인터페이스
export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  error?: string;
}

// 앱 상태 관련 인터페이스
export interface AppState {
  childProfile?: ChildProfile;
  selectedTheme?: ThemeValue;
  currentStory?: CompleteStoryResponse;
  currentScene: number;
  isLoading: boolean;
  error?: string;
}

// Qwen Image Edit 관련 인터페이스
export interface ImageEditRequest {
  image: string;
  prompt: string;
  negativePrompt?: string;
  numInferenceSteps?: number;
  trueCfgScale?: number;
}

export interface CharacterGenerationRequest {
  childPhoto: string;
  childName: string;
  age: Age;
  gender: Gender;
  theme: string;
}

export interface PersonalizedSceneRequest {
  characterImage: string;
  sceneDescription: string;
  childName: string;
  theme: string;
}

export interface ImageEditResponse {
  editedImage: string;
  processingTime: number;
  success: boolean;
  error?: string;
}

// 유틸리티 타입
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 상수 정의
export const THEME_VALUES = [
  "healthy_eating",
  "friendship_skills",
  "safety_habits",
  "financial_literacy",
  "emotional_intelligence",
] as const;

export const AGES = [3, 4, 5, 6, 7] as const;
export const GENDERS = ["boy", "girl"] as const;

// 타입 가드 함수
export const isValidAge = (age: number): age is Age => {
  return AGES.includes(age as Age);
};

export const isValidGender = (gender: string): gender is Gender => {
  return GENDERS.includes(gender as Gender);
};

export const isValidTheme = (theme: string): theme is ThemeValue => {
  return THEME_VALUES.includes(theme as ThemeValue);
};