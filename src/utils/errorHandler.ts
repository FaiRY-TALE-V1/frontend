// 에러 핸들링 유틸리티 함수들

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = "UNKNOWN_ERROR",
    statusCode?: number,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 에러 타입 상수
export const ERROR_CODES = {
  NETWORK_ERROR: "NETWORK_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  API_ERROR: "API_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  STORAGE_ERROR: "STORAGE_ERROR",
  UPLOAD_ERROR: "UPLOAD_ERROR",
  GENERATION_ERROR: "GENERATION_ERROR",
} as const;

// 사용자 친화적인 에러 메시지 변환
export const getUserFriendlyErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    switch (error.code) {
      case ERROR_CODES.NETWORK_ERROR:
        return "인터넷 연결을 확인해주세요.";
      case ERROR_CODES.VALIDATION_ERROR:
        return "입력한 정보를 다시 확인해주세요.";
      case ERROR_CODES.API_ERROR:
        return "서버와 통신하는 중 문제가 발생했습니다.";
      case ERROR_CODES.TIMEOUT_ERROR:
        return "요청 시간이 초과되었습니다. 다시 시도해주세요.";
      case ERROR_CODES.STORAGE_ERROR:
        return "데이터 저장 중 문제가 발생했습니다.";
      case ERROR_CODES.UPLOAD_ERROR:
        return "파일 업로드 중 문제가 발생했습니다.";
      case ERROR_CODES.GENERATION_ERROR:
        return "동화 생성 중 문제가 발생했습니다.";
      default:
        return error.message || "알 수 없는 오류가 발생했습니다.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
};

// 에러 로깅 함수
export const logError = (error: unknown, context?: string) => {
  const errorInfo = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  console.error("Error logged:", errorInfo);

  // 프로덕션 환경에서는 외부 로깅 서비스로 전송
  if (process.env.NODE_ENV === "production") {
    // 여기에 Sentry, LogRocket 등의 로깅 서비스 연동
    // Example: Sentry.captureException(error, { contexts: { details: errorInfo } });
  }
};

// 재시도 로직
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }

      // 지수적 백오프 적용
      const backoffDelay = delay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
    }
  }

  throw lastError;
};

// 디바운스된 에러 리포팅 (동일한 에러의 중복 리포팅 방지)
export class ErrorReporter {
  private static errorMap = new Map<string, number>();
  private static readonly REPORT_THRESHOLD = 5; // 5초 내 동일 에러는 중복 제거

  static report(error: unknown, context?: string) {
    const errorKey = this.getErrorKey(error, context);
    const now = Date.now();
    const lastReported = this.errorMap.get(errorKey);

    if (!lastReported || now - lastReported > this.REPORT_THRESHOLD * 1000) {
      logError(error, context);
      this.errorMap.set(errorKey, now);
    }
  }

  private static getErrorKey(error: unknown, context?: string): string {
    const message = error instanceof Error ? error.message : String(error);
    return `${context || "unknown"}:${message}`;
  }
}