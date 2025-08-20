import React, { useState } from "react";
import { Settings, X } from "lucide-react";

const DebugInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const childProfile = localStorage.getItem("childProfile");
  const selectedTheme = localStorage.getItem("selectedTheme");

  return (
    <>
      {/* 디버그 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="디버그 정보"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* 디버그 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">🛠️ 디버그 정보</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-700">현재 URL:</h4>
                <p className="text-gray-600 break-all">
                  {window.location.href}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">저장된 프로필:</h4>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {childProfile
                    ? JSON.stringify(JSON.parse(childProfile), null, 2)
                    : "없음"}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">선택된 테마:</h4>
                <p className="text-gray-600">{selectedTheme || "없음"}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">환경:</h4>
                <p className="text-gray-600">개발 모드 (목업 데이터 사용)</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <button
                onClick={() => {
                  localStorage.clear();
                  alert("로컬 스토리지가 초기화되었습니다.");
                  setIsOpen(false);
                }}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                데이터 초기화
              </button>
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                홈으로
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DebugInfo;
