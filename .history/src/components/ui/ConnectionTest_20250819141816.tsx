import React, { useState } from "react";
import { CheckCircle, XCircle, Loader2, Play } from "lucide-react";
import { apiService } from "../../services/api";

const ConnectionTest: React.FC = () => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isTestingThemes, setIsTestingThemes] = useState(false);
  const [connectionResult, setConnectionResult] = useState<any>(null);
  const [themesResult, setThemesResult] = useState<any>(null);
  const [connectionError, setConnectionError] = useState<string>("");
  const [themesError, setThemesError] = useState<string>("");

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionError("");
    
    try {
      const result = await apiService.healthCheck();
      setConnectionResult(result);
    } catch (error) {
      setConnectionError(error instanceof Error ? error.message : "연결 실패");
    } finally {
      setIsTestingConnection(false);
    }
  };

  const testThemes = async () => {
    setIsTestingThemes(true);
    setThemesError("");
    
    try {
      const result = await apiService.getThemes();
      setThemesResult(result);
    } catch (error) {
      setThemesError(error instanceof Error ? error.message : "테마 조회 실패");
    } finally {
      setIsTestingThemes(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">🔗 백엔드 연결 테스트</h2>
      
      {/* 기본 연결 테스트 */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">1. 서버 연결 테스트</h3>
          <button
            onClick={testConnection}
            disabled={isTestingConnection}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isTestingConnection ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            테스트 실행
          </button>
        </div>
        
        {connectionResult && (
          <div className="flex items-start space-x-2 p-3 bg-green-50 border border-green-200 rounded">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <div className="font-medium text-green-800">연결 성공!</div>
              <div className="text-sm text-green-600 mt-1">
                <div>메시지: {connectionResult.message}</div>
                <div>버전: {connectionResult.version}</div>
                <div>상태: {connectionResult.status}</div>
              </div>
            </div>
          </div>
        )}
        
        {connectionError && (
          <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded">
            <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <div className="font-medium text-red-800">연결 실패</div>
              <div className="text-sm text-red-600 mt-1">{connectionError}</div>
            </div>
          </div>
        )}
      </div>

      {/* 테마 API 테스트 */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">2. 테마 API 테스트</h3>
          <button
            onClick={testThemes}
            disabled={isTestingThemes}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {isTestingThemes ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            테스트 실행
          </button>
        </div>
        
        {themesResult && (
          <div className="flex items-start space-x-2 p-3 bg-green-50 border border-green-200 rounded">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <div className="font-medium text-green-800">테마 조회 성공!</div>
              <div className="text-sm text-green-600 mt-2">
                <div className="font-medium">조회된 테마 ({themesResult.themes.length}개):</div>
                <ul className="mt-1 space-y-1">
                  {themesResult.themes.map((theme: any, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>{theme.label} ({theme.value})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {themesError && (
          <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded">
            <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <div className="font-medium text-red-800">테마 조회 실패</div>
              <div className="text-sm text-red-600 mt-1">{themesError}</div>
            </div>
          </div>
        )}
      </div>

      {/* 연결 상태 요약 */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">연결 상태 요약</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className="font-medium">백엔드 서버:</span>
            {connectionResult ? (
              <span className="text-green-600">✅ 연결됨</span>
            ) : connectionError ? (
              <span className="text-red-600">❌ 연결 안됨</span>
            ) : (
              <span className="text-gray-500">🔄 테스트 필요</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">테마 API:</span>
            {themesResult ? (
              <span className="text-green-600">✅ 정상 동작</span>
            ) : themesError ? (
              <span className="text-red-600">❌ 오류 발생</span>
            ) : (
              <span className="text-gray-500">🔄 테스트 필요</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTest;
