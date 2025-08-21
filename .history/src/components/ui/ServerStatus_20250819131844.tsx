import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import { apiService } from "../../services/api";

interface ServerStatusProps {
  showDetails?: boolean;
}

const ServerStatus: React.FC<ServerStatusProps> = ({ showDetails = false }) => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [serverInfo, setServerInfo] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkServerStatus = async () => {
    setStatus('checking');
    setError("");
    
    try {
      const response = await apiService.healthCheck();
      setServerInfo(response);
      setStatus('connected');
    } catch (err) {
      setStatus('disconnected');
      setError(err instanceof Error ? err.message : "서버 연결 실패");
    } finally {
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    checkServerStatus();
    
    // 30초마다 자동 체크
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'disconnected':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'checking':
        return "서버 상태 확인 중...";
      case 'connected':
        return "백엔드 서버 연결됨";
      case 'disconnected':
        return "백엔드 서버 연결 안됨";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'checking':
        return "text-blue-600 bg-blue-50 border-blue-200";
      case 'connected':
        return "text-green-600 bg-green-50 border-green-200";
      case 'disconnected':
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  if (!showDetails && status === 'connected') {
    return null; // 연결되어 있으면 간단 모드에서는 숨김
  }

  return (
    <div className={`p-3 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
        <button
          onClick={checkServerStatus}
          className="text-xs hover:underline opacity-70 hover:opacity-100"
          disabled={status === 'checking'}
        >
          새로고침
        </button>
      </div>
      
      {showDetails && (
        <div className="mt-2 text-xs space-y-1">
          <div>마지막 확인: {lastChecked.toLocaleTimeString()}</div>
          {status === 'connected' && serverInfo && (
            <div className="text-green-600">
              <div>버전: {serverInfo.version || 'N/A'}</div>
              <div>메시지: {serverInfo.message || 'N/A'}</div>
            </div>
          )}
          {status === 'disconnected' && error && (
            <div className="text-red-600 bg-red-100 p-2 rounded">
              <div className="font-medium">오류 상세:</div>
              <div>{error}</div>
              <div className="mt-1 text-xs">
                💡 백엔드 서버가 실행 중인지 확인하세요: 
                <code className="bg-red-200 px-1 rounded">cd backend && python start_server.py</code>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServerStatus;
