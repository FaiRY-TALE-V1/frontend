import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { ApiResponse } from "../types";

// API 클라이언트 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
const API_TIMEOUT = 600000; // 10분 (600,000ms) - 동화 생성은 시간이 오래 걸림

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
        console.log(
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error: unknown) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.client.interceptors.response.use(
      (response) => {
        console.log(
          `✅ API Response: ${response.config.method?.toUpperCase()} ${
            response.config.url
          } - ${response.status}`
        );
        return response;
      },
      (error: unknown) => {
        const axiosError = error as AxiosError;
        console.error(
          `❌ API Error: ${axiosError.config?.method?.toUpperCase()} ${
            axiosError.config?.url
          } -`,
          axiosError.response?.status || axiosError.message
        );
        return Promise.reject(error);
      }
    );
  }


  // Generic HTTP 메서드들
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.",
      };
    }
  }

  async post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.post(
        url,
        data,
        config
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.",
      };
    }
  }


  // Health Check
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get("/");
      return true;
    } catch (error: unknown) {
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
