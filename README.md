# 🧚‍♀️ FaiRY TALE - Frontend

> AI 기반 개인화 동화 생성 시스템의 React Frontend

## 📋 프로젝트 개요

아이의 이름, 나이, 성별, 사진을 바탕으로 AI가 개인화된 교육 동화를 생성하는 웹 애플리케이션의 프론트엔드입니다. React + TypeScript + Tailwind CSS로 구성된 현대적인 웹 인터페이스를 제공합니다.

### 🎯 핵심 기능

- **직관적인 4단계 UI**: 홈 → 프로필 → 테마선택 → 동화생성
- **반응형 디자인**: 데스크톱과 모바일 모두 지원
- **실시간 미리보기**: 프로필 입력과 동시에 미리보기 제공
- **오디오 재생**: TTS 음성으로 동화 읽어주기 기능
- **로컬 저장**: 프로필과 설정 정보 로컬스토리지 저장

## 🏗️ 아키텍처

### 폴더 구조

```
frontend/src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── common/          # 공통 컴포넌트
│   │   ├── Button.tsx   # 커스텀 버튼
│   │   ├── Input.tsx    # 폼 입력 필드
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── ProtectedRoute.tsx
│   └── layout/          # 레이아웃 컴포넌트
│       └── RootLayout.tsx
├── pages/               # 페이지 컴포넌트
│   ├── Home.tsx         # 랜딩 페이지
│   ├── Profile.tsx      # 프로필 설정
│   ├── ThemeSelection.tsx # 테마 선택
│   └── StoryGeneration.tsx # 동화 생성 및 재생
├── context/             # React Context
│   └── AppContext.tsx   # 전역 상태 관리
├── hooks/               # 커스텀 훅
│   ├── useAppState.ts
│   ├── useLocalStorage.ts
│   ├── useKeyboardNavigation.ts
│   ├── useAsyncOperation.ts
│   └── useErrorHandler.ts
├── services/            # API 서비스
│   └── api.ts          # 백엔드 API 통신
├── types/               # TypeScript 타입 정의
│   └── index.ts
├── utils/               # 유틸리티 함수
│   ├── cn.ts           # className 유틸리티
│   └── errorHandler.ts
└── index.tsx           # 앱 엔트리포인트
```

### 기술 스택

- **React 19**: 최신 React 버전
- **TypeScript**: 타입 안정성
- **React Router**: 페이지 라우팅
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Axios**: HTTP 클라이언트
- **Lucide React**: 아이콘 라이브러리
- **Framer Motion**: 애니메이션
- **Radix UI**: 접근성 좋은 UI 컴포넌트

## 🎨 UI/UX 특징

### 디자인 시스템

- **컬러 팔레트**: 따뜻하고 친근한 파스텔 톤
- **타이포그래피**: 어린이 친화적인 폰트 크기와 간격
- **애니메이션**: 부드러운 전환 효과
- **반응형**: 모바일 우선 디자인

### 페이지별 기능

#### 1. 홈 페이지 (`Home.tsx`)
- 프로젝트 소개 및 기능 설명
- 시작하기 버튼으로 프로필 설정으로 이동
- 백그라운드 데코레이션 및 애니메이션

#### 2. 프로필 설정 (`Profile.tsx`)
- **아이 이름**: 텍스트 입력 (필수)
- **나이 선택**: 3~7세 버튼 선택 (필수)
- **성별 선택**: 남자아이/여자아이 (필수)
- **사진 업로드**: 드래그앤드롭 지원 (선택)
- 실시간 유효성 검사 및 에러 표시

#### 3. 테마 선택 (`ThemeSelection.tsx`)
- 5가지 교육 테마 카드 형태로 표시
- 호버 효과 및 선택 상태 표시
- API에서 테마 정보 동적 로딩
- 타임아웃 처리로 안정성 확보

#### 4. 동화 생성 (`StoryGeneration.tsx`)
- AI 동화 생성 프로세스 실시간 표시
- 6개 장면 슬라이드 뷰어
- TTS 오디오 재생 컨트롤
- 키보드 네비게이션 지원 (화살표 키)
- 로딩 상태 및 에러 처리

## 🔧 상태 관리

### React Context (`AppContext.tsx`)

```typescript
interface AppState {
  childProfile?: ChildProfile;
  selectedTheme?: ThemeValue;
  currentStory?: CompleteStoryResponse;
  currentScene: number;
  isLoading: boolean;
  error?: string;
}
```

### 로컬 스토리지

- `childProfile`: 아이 프로필 정보
- `selectedTheme`: 선택된 테마
- 페이지 새로고침 시에도 데이터 유지

## 🌐 API 통신

### API 서비스 (`services/api.ts`)

```typescript
// 주요 API 엔드포인트
- POST /upload-photo     # 사진 업로드
- GET  /themes          # 테마 목록 조회
- POST /generate-story  # 동화 생성 요청
```

### 에러 처리

- 네트워크 에러 자동 재시도
- 사용자 친화적 에러 메시지
- Fallback UI 제공

## 🔐 보안 및 최적화

### 보안

- API 키는 백엔드에서만 관리
- 클라이언트 사이드에서 민감 정보 노출 방지
- XSS 방지를 위한 입력값 검증

### 성능 최적화

- React.lazy를 통한 코드 스플리팅
- 이미지 최적화 (압축, 웹P 지원)
- 메모이제이션을 통한 불필요한 리렌더링 방지
- 로컬스토리지 캐싱

## 🚀 개발 및 배포

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start

# 프로덕션 빌드
npm run build

# 테스트 실행
npm test
```

### 환경 변수

```env
# .env (선택사항)
REACT_APP_API_URL=http://localhost:8000
```

### 빌드 최적화

- TypeScript 컴파일러 최적화
- CSS 번들링 및 압축
- 이미지 에셋 최적화
- Progressive Web App (PWA) 지원

## 🎯 사용자 경험 (UX)

### 접근성 (Accessibility)

- 키보드 네비게이션 완전 지원
- 스크린 리더 호환성
- 색상 대비 WCAG 2.1 AA 준수
- 포커스 표시기 명확성

### 반응형 디자인

- 모바일 퍼스트 접근법
- 터치 친화적 인터페이스
- 다양한 화면 크기 대응

### 로딩 상태

- 스켈레톤 UI로 로딩 시각화
- 프로그레스 바로 진행 상황 표시
- 부드러운 전환 애니메이션

## 🐛 문제 해결

### 일반적인 문제

1. **페이지 이동 안됨**
   - 로컬스토리지 데이터 확인
   - 브라우저 개발자 도구 콘솔 확인

2. **API 연결 오류**
   - 백엔드 서버 실행 상태 확인
   - CORS 설정 확인

3. **오디오 재생 안됨**
   - 브라우저 자동재생 정책 확인
   - 사용자 상호작용 후 재생 시도

### 디버깅 도구

- React Developer Tools
- Redux DevTools (Context 상태 확인)
- 네트워크 탭에서 API 요청 모니터링

## 📱 반응형 지원

### 브레이크포인트

- **sm**: 640px+ (모바일)
- **md**: 768px+ (태블릿)
- **lg**: 1024px+ (데스크톱)
- **xl**: 1280px+ (대형 데스크톱)

### 디바이스별 최적화

- **모바일**: 터치 제스처, 큰 버튼, 세로 레이아웃
- **태블릿**: 그리드 레이아웃, 사이드바
- **데스크톱**: 멀티 컬럼, 호버 효과

## 📋 구현된 5가지 교육 테마

모든 테마가 완전히 구현되어 선택 가능합니다:

- **🥕 식습관 개선**: 건강한 음식을 골고루 먹는 습관
- **🤝 교우관계**: 친구 사귀기와 갈등 해결 방법
- **🛡️ 안전습관**: 일상생활에서 안전을 지키는 방법
- **💰 경제관념**: 용돈 관리와 저축하는 방법
- **💝 감정표현**: 감정을 이해하고 올바르게 표현하는 방법 (메인 테마)

## 🔄 업데이트 로그

### v1.0.0 (현재)
- ✅ 기본 4페이지 구조 완성
- ✅ 프로필 입력 및 검증
- ✅ 테마 선택 UI
- ✅ 동화 생성 및 재생
- ✅ TTS 오디오 지원
- ✅ 반응형 디자인
- ✅ TypeScript 완전 지원

### 향후 계획
- [ ] PWA 지원 강화
- [ ] 오프라인 모드
- [ ] 다국어 지원
- [ ] 테마 커스터마이징
- [ ] 동화 저장 및 관리

## 📊 프로젝트 현황

- **전체 완성도**: 95%
- **백엔드 연동**: 완료
- **UI/UX**: 완료
- **반응형**: 완료
- **TypeScript**: 완료
- **테스트**: 기본 테스트 완료

---

_본 프론트엔드는 아이들과 부모가 쉽고 재미있게 개인화된 동화를 만들 수 있는 직관적인 인터페이스를 제공합니다._
