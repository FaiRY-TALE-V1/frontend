import { CompleteStoryResponse } from "../types";

// 목업 동화 데이터 생성 함수
export const generateMockStory = (childName: string, theme: string): CompleteStoryResponse => {
  const themeData = {
    "식습관 개선": {
      title: `${childName}이와 마법의 건강 정원`,
      moral: "골고루 먹으면 몸이 튼튼해져요",
      scenes: [
        {
          scene_number: 1,
          content: `옛날 옛적, ${childName}이는 편식을 좋아하는 아이였어요. 과자와 사탕만 먹고 싶어 했답니다.`,
          image_description: `${childName}이가 과자를 들고 있는 모습, 주변에 야채들이 슬퍼하고 있음`,
          narration: `옛날 옛적, ${childName}이는 편식을 좋아하는 아이였어요.`
        },
        {
          scene_number: 2,
          content: `어느 날, 마법의 정원에서 야채 요정들을 만났어요. "우리를 먹으면 특별한 힘을 얻을 수 있어!" 하고 말했답니다.`,
          image_description: `마법의 정원에서 당근, 브로콜리, 토마토 요정들이 ${childName}이에게 말하는 모습`,
          narration: `어느 날, 마법의 정원에서 야채 요정들을 만났어요.`
        },
        {
          scene_number: 3,
          content: `${childName}이는 용기를 내어 야채들을 맛보았어요. 그러자 몸에서 반짝반짝 빛이 났어요!`,
          image_description: `${childName}이가 야채를 먹으며 몸에서 황금빛이 나는 모습`,
          narration: `${childName}이는 용기를 내어 야채들을 맛보았어요.`
        },
        {
          scene_number: 4,
          content: `이제 ${childName}이는 모든 음식을 골고루 먹는 건강한 아이가 되었답니다. 끝!`,
          image_description: `${childName}이가 다양한 음식들과 함께 행복하게 웃고 있는 모습`,
          narration: `이제 ${childName}이는 모든 음식을 골고루 먹는 건강한 아이가 되었답니다.`
        }
      ]
    },
    "교우관계": {
      title: `${childName}이와 친구들의 우정 이야기`,
      moral: "친구와 함께하면 더 즐거워요",
      scenes: [
        {
          scene_number: 1,
          content: `${childName}이는 새로운 학교에 전학을 왔어요. 친구가 없어서 혼자 놀고 있었답니다.`,
          image_description: `${childName}이가 운동장 한구석에서 혼자 앉아있는 모습`,
          narration: `${childName}이는 새로운 학교에 전학을 왔어요.`
        },
        {
          scene_number: 2,
          content: `그때 다른 친구들이 다가와서 "같이 놀자!" 하고 말했어요. ${childName}이는 조금 부끄러웠어요.`,
          image_description: `여러 친구들이 ${childName}이에게 손을 내밀며 다가오는 모습`,
          narration: `그때 다른 친구들이 다가와서 같이 놀자고 했어요.`
        },
        {
          scene_number: 3,
          content: `${childName}이는 용기를 내어 친구들과 함께 놀기 시작했어요. 정말 재미있었답니다!`,
          image_description: `${childName}이와 친구들이 함께 뛰어놀며 웃고 있는 모습`,
          narration: `${childName}이는 용기를 내어 친구들과 함께 놀기 시작했어요.`
        },
        {
          scene_number: 4,
          content: `이제 ${childName}이에게는 많은 친구들이 생겼어요. 매일매일 즐겁게 지내고 있답니다. 끝!`,
          image_description: `${childName}이가 많은 친구들과 함께 손을 잡고 원을 그리며 놀고 있는 모습`,
          narration: `이제 ${childName}이에게는 많은 친구들이 생겼어요.`
        }
      ]
    },
    "안전습관": {
      title: `${childName}이의 안전 모험`,
      moral: "안전 규칙을 지키면 다치지 않아요",
      scenes: [
        {
          scene_number: 1,
          content: `${childName}이는 길을 건널 때 신호등을 보지 않고 뛰어가곤 했어요.`,
          image_description: `${childName}이가 빨간불인데도 길을 건너려는 모습`,
          narration: `${childName}이는 길을 건널 때 신호등을 보지 않고 뛰어가곤 했어요.`
        },
        {
          scene_number: 2,
          content: `어느 날, 안전 요정이 나타나서 "위험해! 신호등을 잘 봐야 해!" 하고 말했어요.`,
          image_description: `파란 옷을 입은 안전 요정이 ${childName}이 앞에 나타나는 모습`,
          narration: `어느 날, 안전 요정이 나타나서 위험하다고 말했어요.`
        },
        {
          scene_number: 3,
          content: `${childName}이는 안전 요정과 함께 올바른 횡단보도 건너는 법을 배웠어요.`,
          image_description: `${childName}이와 안전 요정이 초록불에서 손을 들고 건너는 모습`,
          narration: `${childName}이는 안전 요정과 함께 올바른 횡단보도 건너는 법을 배웠어요.`
        },
        {
          scene_number: 4,
          content: `이제 ${childName}이는 항상 안전 규칙을 지키는 똑똑한 아이가 되었답니다. 끝!`,
          image_description: `${childName}이가 안전하게 길을 건너며 엄지를 들고 있는 모습`,
          narration: `이제 ${childName}이는 항상 안전 규칙을 지키는 똑똑한 아이가 되었답니다.`
        }
      ]
    },
    "경제관념": {
      title: `${childName}이의 용돈 관리 이야기`,
      moral: "돈을 아껴 쓰면 더 소중한 것을 살 수 있어요",
      scenes: [
        {
          scene_number: 1,
          content: `${childName}이는 용돈을 받으면 바로바로 다 써버리곤 했어요.`,
          image_description: `${childName}이가 용돈을 받자마자 과자를 사러 뛰어가는 모습`,
          narration: `${childName}이는 용돈을 받으면 바로바로 다 써버리곤 했어요.`
        },
        {
          scene_number: 2,
          content: `어느 날, 정말 갖고 싶은 장난감을 발견했지만 돈이 없었어요. ${childName}이는 슬펐답니다.`,
          image_description: `${childName}이가 장난감 가게 앞에서 빈 지갑을 들고 슬퍼하는 모습`,
          narration: `어느 날, 정말 갖고 싶은 장난감을 발견했지만 돈이 없었어요.`
        },
        {
          scene_number: 3,
          content: `엄마가 저금통을 주시며 "조금씩 모아보자"고 하셨어요. ${childName}이는 용돈을 조금씩 모으기 시작했어요.`,
          image_description: `${childName}이가 돼지 저금통에 동전을 넣고 있는 모습`,
          narration: `엄마가 저금통을 주시며 조금씩 모아보자고 하셨어요.`
        },
        {
          scene_number: 4,
          content: `드디어 ${childName}이는 모은 돈으로 원하던 장난감을 샀어요. 정말 뿌듯했답니다. 끝!`,
          image_description: `${childName}이가 저금통과 새 장난감을 들고 행복하게 웃고 있는 모습`,
          narration: `드디어 ${childName}이는 모은 돈으로 원하던 장난감을 샀어요.`
        }
      ]
    },
    "감정표현": {
      title: `${childName}이의 마음 표현하기`,
      moral: "마음을 말로 표현하면 모두가 이해할 수 있어요",
      scenes: [
        {
          scene_number: 1,
          content: `${childName}이는 화가 나거나 슬플 때 말 대신 울기만 했어요.`,
          image_description: `${childName}이가 구석에서 혼자 울고 있는 모습`,
          narration: `${childName}이는 화가 나거나 슬플 때 말 대신 울기만 했어요.`
        },
        {
          scene_number: 2,
          content: `감정 요정이 나타나서 "마음을 말로 표현해보자!" 하고 말했어요.`,
          image_description: `무지개색 날개를 가진 감정 요정이 ${childName}이 앞에 나타나는 모습`,
          narration: `감정 요정이 나타나서 마음을 말로 표현해보자고 했어요.`
        },
        {
          scene_number: 3,
          content: `${childName}이는 "나는 지금 속상해" "나는 기뻐" 라고 말하는 법을 배웠어요.`,
          image_description: `${childName}이가 다양한 감정 표정을 지으며 말하고 있는 모습`,
          narration: `${childName}이는 나는 지금 속상해, 나는 기뻐 라고 말하는 법을 배웠어요.`
        },
        {
          scene_number: 4,
          content: `이제 ${childName}이는 자신의 마음을 잘 표현하는 멋진 아이가 되었답니다. 끝!`,
          image_description: `${childName}이가 친구들과 함께 밝게 대화하고 있는 모습`,
          narration: `이제 ${childName}이는 자신의 마음을 잘 표현하는 멋진 아이가 되었답니다.`
        }
      ]
    }
  };

  const selectedThemeData = themeData[theme as keyof typeof themeData];
  
  if (!selectedThemeData) {
    // 기본 테마
    return {
      story: {
        title: `${childName}이의 특별한 모험`,
        moral: "용기를 내면 무엇이든 할 수 있어요",
        scenes: [
          {
            scene_number: 1,
            content: `${childName}이는 특별한 모험을 떠나게 되었어요.`,
            image_description: `${childName}이가 모험을 시작하는 모습`,
            image_url: "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Scene+1",
            audio_url: "",
            narration: `${childName}이는 특별한 모험을 떠나게 되었어요.`
          },
          {
            scene_number: 2,
            content: `모험 중에 어려움을 만났지만 포기하지 않았어요.`,
            image_description: `${childName}이가 어려움을 극복하는 모습`,
            image_url: "https://via.placeholder.com/400x300/EC4899/FFFFFF?text=Scene+2",
            audio_url: "",
            narration: `모험 중에 어려움을 만났지만 포기하지 않았어요.`
          },
          {
            scene_number: 3,
            content: `${childName}이는 끝까지 최선을 다했어요.`,
            image_description: `${childName}이가 최선을 다하는 모습`,
            image_url: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Scene+3",
            audio_url: "",
            narration: `${childName}이는 끝까지 최선을 다했어요.`
          },
          {
            scene_number: 4,
            content: `결국 ${childName}이는 멋진 모험을 완성했답니다. 끝!`,
            image_description: `${childName}이가 성공적으로 모험을 마친 모습`,
            image_url: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Scene+4",
            audio_url: "",
            narration: `결국 ${childName}이는 멋진 모험을 완성했답니다.`
          }
        ]
      },
      character_image_url: "https://via.placeholder.com/300x400/8B5CF6/FFFFFF?text=Character"
    };
  }

  // 색상 배열 (테마별 다른 색상)
  const colors = ["8B5CF6", "EC4899", "F59E0B", "10B981", "3B82F6"];

  return {
    story: {
      title: selectedThemeData.title,
      moral: selectedThemeData.moral,
      scenes: selectedThemeData.scenes.map((scene, index) => ({
        ...scene,
        image_url: `https://via.placeholder.com/400x300/${colors[index]}/FFFFFF?text=Scene+${scene.scene_number}`,
        audio_url: "" // 오디오는 비워둠 (프론트엔드 완성 단계)
      }))
    },
    character_image_url: `https://via.placeholder.com/300x400/8B5CF6/FFFFFF?text=${encodeURIComponent(childName)}`
  };
};
