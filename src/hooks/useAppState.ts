import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useLocalStorage } from "./useLocalStorage";
import { ChildProfile, ThemeValue, isValidTheme } from "../types";

export const useAppState = () => {
  const { state, setChildProfile, setSelectedTheme, setError } = useAppContext();
  
  const [savedProfile] = useLocalStorage<ChildProfile | null>("childProfile", null);
  const [savedTheme] = useLocalStorage<string | null>("selectedTheme", null);

  // localStorage에서 상태 복원
  useEffect(() => {
    try {
      if (savedProfile && savedProfile.name) {
        setChildProfile(savedProfile);
      }
      
      if (savedTheme && isValidTheme(savedTheme)) {
        setSelectedTheme(savedTheme as ThemeValue);
      }
    } catch (error) {
      console.error("상태 복원 중 오류:", error);
      setError("저장된 정보를 불러오는 중 오류가 발생했습니다.");
    }
  }, [savedProfile, savedTheme, setChildProfile, setSelectedTheme, setError]);

  // localStorage에 상태 저장
  useEffect(() => {
    if (state.childProfile) {
      localStorage.setItem("childProfile", JSON.stringify(state.childProfile));
    }
  }, [state.childProfile]);

  useEffect(() => {
    if (state.selectedTheme) {
      localStorage.setItem("selectedTheme", state.selectedTheme);
    }
  }, [state.selectedTheme]);

  return {
    ...state,
    // 추가 유틸리티 함수들
    clearLocalStorage: () => {
      localStorage.removeItem("childProfile");
      localStorage.removeItem("selectedTheme");
    },
  };
};