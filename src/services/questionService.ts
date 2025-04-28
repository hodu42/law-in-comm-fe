import { QuestionWithAnswer } from '@/types/questionWithAnswer';
import { Question } from '@/types/question';
import { LegalSpeciality } from '@/types/speciality';

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;

const dummyQuestionsWithAnswers: QuestionWithAnswer[] = [
  {
    question: {
      questionId: 1,
      title: "교통사고 관련 법적 조언이 필요합니다",
      content: "지난주에 교통사고가 발생했는데, 상대방이 신호위반을 했습니다. 어떻게 대처해야 할까요?",
      authorId: null,
      authorName: null,
      createdAt: "2024-03-20T10:00:00",
      updatedAt: "2024-03-20T10:00:00",
      legalSpeciality: "TRAFFIC_ACCIDENT_HIT_RUN" as LegalSpeciality,
      firstOccurrenceDate: "2024-03-15",
      viewCount: 150,
      reportCount: 0,
      isAnonymous: true
    },
    answer: {
      answerId: 1,
      content: "교통사고 발생 시 가장 중요한 것은 현장 보존과 증거 수집입니다. 신호위반의 경우 CCTV나 블랙박스 영상이 중요하니, 가능한 빨리 확보하시는 것이 좋습니다. 또한 경찰에 신고하시고 사고조사서를 발급받으시기 바랍니다.",
      createdAt: "2024-03-20T11:00:00",
      updatedAt: "2024-03-20T11:00:00",
      reportCount: 0,
      authorName: "이민호 변호사",
      authorId: 1
    }
  },
  {
    question: {
      questionId: 2,
      title: "이혼 소송 진행 중인데 재산 분할이 복잡합니다",
      content: "결혼 10년차인데 이혼을 하려고 합니다. 공동명의로 된 아파트와 적금이 있는데 어떻게 분배해야 할까요?",
      authorId: "user2",
      authorName: "박지영",
      createdAt: "2024-03-19T15:30:00",
      updatedAt: "2024-03-19T15:30:00",
      legalSpeciality: "FAMILY_DIVORCE" as LegalSpeciality,
      firstOccurrenceDate: "2024-03-10",
      viewCount: 200,
      reportCount: 0,
      isAnonymous: false
    },
    answer: {
      answerId: 2,
      content: "이혼 시 재산분할은 혼인기간, 재산의 성격, 각자의 기여도 등을 종합적으로 고려하여 결정됩니다. 아파트의 경우 구입 시기와 자금 출처가 중요하며, 적금은 혼인기간 중 적립된 부분에 대해 분할이 가능합니다. 구체적인 상담이 필요하시면 연락주세요.",
      createdAt: "2024-03-19T16:45:00",
      updatedAt: "2024-03-19T16:45:00",
      reportCount: 0,
      authorName: "김서연 변호사",
      authorId: 2
    }
  },
  {
    question: {
      questionId: 3,
      title: "부동산 계약 관련 분쟁이 발생했습니다",
      content: "월세 계약 기간이 남았는데 집주인이 갑자기 계약 해지를 요구합니다. 어떻게 대응해야 할까요?",
      authorId: "user3",
      authorName: "이지원",
      createdAt: "2024-03-18T14:20:00",
      updatedAt: "2024-03-18T14:20:00",
      legalSpeciality: "REAL_ESTATE_LEASE" as LegalSpeciality,
      firstOccurrenceDate: "2024-03-01",
      viewCount: 180,
      reportCount: 0,
      isAnonymous: false
    },
    answer: null
  },
  {
    question: {
      questionId: 4,
      title: "회사에서 해고 통보를 받았습니다",
      content: "근무 기간 3년차인데 정당한 사유 없이 해고 통보를 받았습니다. 어떻게 해야 할까요?",
      authorId: "user4",
      authorName: "최민수",
      createdAt: "2024-03-17T16:40:00",
      updatedAt: "2024-03-17T16:40:00",
      legalSpeciality: "CORPORATE_LABOR" as LegalSpeciality,
      firstOccurrenceDate: "2024-02-28",
      viewCount: 220,
      reportCount: 0,
      isAnonymous: false
    },
    answer: {
      answerId: 3,
      content: "정당한 사유 없이 해고하는 것은 부당해고에 해당합니다. 근로기준법에 따르면 해고는 정당한 사유가 있어야 하며, 그 사유를 입증할 책임은 사용자에게 있습니다. 노동위원회에 진정을 제기하거나 소송을 통해 권리를 주장하실 수 있습니다.",
      createdAt: "2024-03-17T17:30:00",
      updatedAt: "2024-03-17T17:30:00",
      reportCount: 0,
      authorName: "박준호 변호사",
      authorId: 3
    }
  },
  {
    question: {
      questionId: 5,
      title: "상속 관련 분쟁이 발생했습니다",
      content: "아버지가 돌아가시고 형제들과 상속 분배로 다툼이 있습니다. 어떻게 해결해야 할까요?",
      authorId: "user5",
      authorName: "정수민",
      createdAt: "2024-03-16T11:15:00",
      updatedAt: "2024-03-16T11:15:00",
      legalSpeciality: "FAMILY_INHERITANCE" as LegalSpeciality,
      firstOccurrenceDate: "2024-02-25",
      viewCount: 190,
      reportCount: 0,
      isAnonymous: false
    },
    answer: null
  },
  {
    question: {
      questionId: 6,
      title: "사기 피해를 당했습니다",
      content: "온라인에서 물건을 구매했는데 돈을 보내고 물건을 받지 못했습니다. 어떻게 해야 할까요?",
      authorId: "user6",
      authorName: "김동현",
      createdAt: "2024-03-15T09:30:00",
      updatedAt: "2024-03-15T09:30:00",
      legalSpeciality: "PROPERTY_CRIMES_FRAUD" as LegalSpeciality,
      firstOccurrenceDate: "2024-02-20",
      viewCount: 250,
      reportCount: 0,
      isAnonymous: false
    },
    answer: {
      answerId: 4,
      content: "사기 피해의 경우 가능한 빨리 경찰에 신고하시고, 거래 내역과 대화 내용 등을 증거로 확보하시기 바랍니다. 또한 금융기관에 연락하여 계좌 동결을 요청할 수 있습니다. 형사 고소와 함께 민사 소송을 통해 피해금을 회수할 수 있습니다.",
      createdAt: "2024-03-15T10:45:00",
      updatedAt: "2024-03-15T10:45:00",
      reportCount: 0,
      authorName: "이지훈 변호사",
      authorId: 4
    }
  },
  {
    question: {
      questionId: 7,
      title: "명예훼손으로 고소를 당했습니다",
      content: "SNS에 올린 글로 인해 명예훼손으로 고소를 당했습니다. 어떻게 대응해야 할까요?",
      authorId: "user7",
      authorName: "박서연",
      createdAt: "2024-03-14T13:20:00",
      updatedAt: "2024-03-14T13:20:00",
      legalSpeciality: "ASSAULT_DEFAMATION" as LegalSpeciality,
      firstOccurrenceDate: "2024-02-15",
      viewCount: 170,
      reportCount: 0,
      isAnonymous: false
    },
    answer: null
  },
  {
    question: {
      questionId: 8,
      title: "세금 관련 상담이 필요합니다",
      content: "개인사업자로서 세금 신고와 관련하여 상담이 필요합니다. 어떤 절차를 거쳐야 할까요?",
      authorId: "user8",
      authorName: "최준호",
      createdAt: "2024-03-13T15:40:00",
      updatedAt: "2024-03-13T15:40:00",
      legalSpeciality: "MEDICAL_TAX" as LegalSpeciality,
      firstOccurrenceDate: "2024-02-10",
      viewCount: 160,
      reportCount: 0,
      isAnonymous: false
    },
    answer: {
      answerId: 5,
      content: "개인사업자의 세금 신고는 매년 5월에 종합소득세 신고를 하셔야 합니다. 사업소득이 있는 경우에는 분기별로 부가가치세 신고도 필요합니다. 구체적인 절차와 필요한 서류는 사업 형태와 규모에 따라 다르므로, 상세한 상담이 필요합니다.",
      createdAt: "2024-03-13T16:30:00",
      updatedAt: "2024-03-13T16:30:00",
      reportCount: 0,
      authorName: "김세진 변호사",
      authorId: 5
    }
  },
  {
    question: {
      questionId: 9,
      title: "회사 계약서 검토가 필요합니다",
      content: "새로운 회사와 계약을 맺으려고 하는데, 계약서 검토가 필요합니다. 어떤 부분을 주의해서 봐야 할까요?",
      authorId: "user9",
      authorName: "이수진",
      createdAt: "2024-03-12T10:15:00",
      updatedAt: "2024-03-12T10:15:00",
      legalSpeciality: "CORPORATE_LAW" as LegalSpeciality,
      firstOccurrenceDate: "2024-02-05",
      viewCount: 140,
      reportCount: 0,
      isAnonymous: false
    },
    answer: null
  },
  {
    question: {
      questionId: 10,
      title: "의료 과실로 인한 피해를 입었습니다",
      content: "병원에서 수술을 받았는데 합병증이 발생했습니다. 의료 과실로 인한 피해를 입은 것 같습니다. 어떻게 해야 할까요?",
      authorId: "user10",
      authorName: "장민호",
      createdAt: "2024-03-11T14:30:00",
      updatedAt: "2024-03-11T14:30:00",
      legalSpeciality: "MEDICAL_TAX" as LegalSpeciality,
      firstOccurrenceDate: "2024-02-01",
      viewCount: 230,
      reportCount: 0,
      isAnonymous: false
    },
    answer: {
      answerId: 6,
      content: "의료 과실의 경우 의료기관의 과실과 환자의 피해 사이에 인과관계가 있어야 합니다. 먼저 의료기록을 확보하고, 필요시 의료감정을 통해 과실 여부를 판단해야 합니다. 민사소송을 통해 손해배상을 청구할 수 있으며, 형사고소도 가능합니다.",
      createdAt: "2024-03-11T15:45:00",
      updatedAt: "2024-03-11T15:45:00",
      reportCount: 0,
      authorName: "박지원 변호사",
      authorId: 6
    }
  }
];

export const fetchQuestionsWithAnswers = async (): Promise<QuestionWithAnswer[]> => {
  // API 연동 전 임시 더미 데이터 반환
  return dummyQuestionsWithAnswers;

  /* TODO: 답변들 조회가 작동 안함 확인 필요
  const questionResponse = await getQuestionList(String(DEFAULT_PAGE), String(DEFAULT_SIZE));
  const questions = questionResponse.data.content;
  console.log("질문들 조회",questions);
  
  const questionsWithAnswers = await Promise.all(
    questions.map(async (question: Question) => {
      const answerResponse = await getAnswers(String(question.questionId), String(DEFAULT_PAGE), String(DEFAULT_SIZE));
      const answer = answerResponse.data.content[0];
      console.log("답변들 조회",answer);

      return {
        question,
        answer
      };
    })
  );

  return questionsWithAnswers;
  */
}; 