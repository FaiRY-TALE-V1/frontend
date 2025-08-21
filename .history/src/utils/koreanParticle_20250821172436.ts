/**
 * 한국어 조사 규칙을 적용하는 유틸리티 함수들
 */

/**
 * 받침이 있는지 확인하는 함수
 * @param char - 확인할 문자
 * @returns 받침이 있으면 true, 없으면 false
 */
function hasBatchim(char: string): boolean {
  const code = char.charCodeAt(0);
  // 한글 유니코드 범위: 44032 ~ 55203
  if (code < 44032 || code > 55203) return false;
  
  // 한글에서 받침은 (코드 - 44032) % 28로 계산
  // 받침이 없으면 0, 있으면 1~27
  return (code - 44032) % 28 !== 0;
}

/**
 * 이름에 적절한 조사를 붙이는 함수
 * @param name - 이름
 * @param particle - 붙일 조사 (예: "을", "를", "이", "가", "은", "는")
 * @returns 조사가 적용된 문자열
 */
export function addKoreanParticle(name: string, particle: string): string {
  if (!name || name.length === 0) return name;
  
  const lastChar = name.charAt(name.length - 1);
  
  // 받침이 있는 경우와 없는 경우에 따른 조사 선택
  if (hasBatchim(lastChar)) {
    // 받침이 있는 경우
    switch (particle) {
      case "을":
      case "를":
        return name + "을";
      case "이":
      case "가":
        return name + "이";
      case "은":
      case "는":
        return name + "은";
      case "과":
      case "와":
        return name + "과";
      case "의":
        return name + "의";
      default:
        return name + particle;
    }
  } else {
    // 받침이 없는 경우
    switch (particle) {
      case "을":
      case "를":
        return name + "를";
      case "이":
      case "가":
        return name + "가";
      case "은":
      case "는":
        return name + "는";
      case "과":
      case "와":
        return name + "와";
      case "의":
        return name + "의";
      default:
        return name + particle;
    }
  }
}

/**
 * "~을 위한" 형태로 만드는 함수
 * @param name - 이름
 * @returns "~을 위한" 형태의 문자열
 */
export function forName(name: string): string {
  return addKoreanParticle(name, "을") + " 위한";
}

/**
 * "~이/가" 형태로 만드는 함수
 * @param name - 이름
 * @returns "~이" 또는 "~가" 형태의 문자열
 */
export function subjectName(name: string): string {
  return addKoreanParticle(name, "이");
}

/**
 * "~은/는" 형태로 만드는 함수
 * @param name - 이름
 * @returns "~은" 또는 "~는" 형태의 문자열
 */
export function topicName(name: string): string {
  return addKoreanParticle(name, "은");
}
