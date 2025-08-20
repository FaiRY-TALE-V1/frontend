import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "../types";

// API 클라이언트 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
const API_TIMEOUT = 180000; // 180초 (3분)

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 요청 인터셉터
    this.client.interceptors.request.use(
      (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.client.interceptors.response.use(
      (response) => {
        console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
        return response;
      },
      (error) => {
        console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} -`, error.response?.status || error.message);
        return Promise.reject(error);
      }
    );
  }

  private handleApiError(error: any, defaultMessage: string): never {
    if (error.response) {
      const status = error.response.status;
      const message =
        error.response.data?.detail ||
        error.response.data?.message ||
        error.response.data?.error ||
        defaultMessage;

      switch (status) {
        case 400:
          throw new Error(`잘못된 요청: ${message}`);
        case 401:
          throw new Error("인증이 필요합니다.");
        case 403:
          throw new Error("접근 권한이 없습니다.");
        case 404:
          throw new Error("요청한 리소스를 찾을 수 없습니다.");
        case 408:
          throw new Error("요청 시간이 초과되었습니다.");
        case 429:
          throw new Error("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
        case 500:
          throw new Error(`서버 내부 오류: ${message}`);
        case 502:
          throw new Error("서버 게이트웨이 오류가 발생했습니다.");
        case 503:
          throw new Error("서비스를 일시적으로 사용할 수 없습니다.");
        default:
          throw new Error(`서버 오류 (${status}): ${message}`);
      }
    } else if (error.request) {
      if (error.code === "ECONNABORTED") {
        throw new Error("요청 시간이 초과되었습니다. 네트워크 연결을 확인해주세요.");
      }
      throw new Error("서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.");
    } else {
      throw new Error(`요청 설정 오류: ${error.message}`);
    }
  }

  // Generic HTTP 메서드들
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      };
    }
  }

  async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      };
    }
  }

  async put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.put(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      };
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      };
    }
  }

  // 에러 처리가 포함된 메서드들 (예외를 throw)
  async getWithError<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return response.data;
    } catch (error) {
      this.handleApiError(error, `GET ${url} 요청 실패`);
    }
  }

  async postWithError<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return response.data;
    } catch (error) {
      this.handleApiError(error, `POST ${url} 요청 실패`);
    }
  }

  // Health Check
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get("/");
      return true;
    } catch (error) {
      console.warn("Health check failed:", error);
      return false;
    }
  }

  // 기본 클라이언트 인스턴스 반환 (고급 사용)
  getClient(): AxiosInstance {
    return this.client;
  }
}

// 기본 API 클라이언트 인스턴스
export const apiClient = new ApiClient();