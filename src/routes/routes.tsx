import { RouteObject } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { Test } from '@/pages/testPages/Test';
import { RegisterTest } from '@/pages/testPages/RegisterTest';
import { LawyerRegisterTest } from '@/pages/testPages/LawyerRegisterTest';
import { PendingLawyersPage } from '@/pages/testPages/PendingLawyersPage';
import { WriteTest } from '@/pages/testPages/WriteTest';
import { QuestionsTest } from '@/pages/testPages/QuestionsTest';
import { TestPage } from '@/pages/testPages/TestPage';
import { Login } from '@/pages/Login';
import { QuestionWrite } from '@/pages/QuestionWrite';
import { QuestionListPage } from '@/pages/QuestionListPage';
import { AnswerWriteTest } from '@/pages/testPages/AnswerWriteTest';
import { QuestionDetailPage } from '@/pages/QuestionDetailPage';
import { QuestionModify } from '@/pages/QuestionModify';
import { Role } from '@/types/role';
import { ClientRegister } from '@/pages/ClientRegister';

export const routes: RouteObject[] = [
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/client-register',
    element: <ClientRegister />,
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/register',
    element: <RegisterTest />,
  },
  {
    path: '/lawyer-register',
    element: <LawyerRegisterTest />,
  },
  {
    path: '/pending-lawyers',
    element: <PendingLawyersPage />,
  },
  {
    path: '/question/write',
    element: <QuestionWrite />,
  },
  {
    path: '/write',
    element: <WriteTest />,
  },
  {
    path: '/question/test',
    element: <QuestionsTest />,
  },
  {
    path: '/questions',
    element: <QuestionListPage />,
  },
  {
    path: '/test-page',
    element: <TestPage />,
  },
  {
    path: '/answer/write',
    element: <AnswerWriteTest />,
  },
  {
    path: '/question/:questionId',
    element: <QuestionDetailPage />,
  },
  {
    path: '/question/modify/:questionId',
    element: <QuestionModify/>
  }
];

export const headerPaths = [
  {
    title: '홈',
    link: '/main',
    currentCheck: '/main'
  },
  {
    title: '질문 목록',
    link: '/questions?keyword=&category=&page=0',
    currentCheck: '/questions'
  },
  {
    title: '질문 작성',
    link: '/question/write',
    currentCheck: '/question/write',
    roles: [Role.USER, Role.ADMIN]
  },
  {
    title: '질문 관리',
    link: '/question/manage',
    currentCheck: '/question/manage',
    roles: [Role.ADMIN]
  },
  {
    title: '답변 관리',
    link: '/answer/manage',
    currentCheck: '/answer/manage',
    roles: [Role.ADMIN]
  },
  {
    title: '변호사 가입 관리',
    link: '/lawyer/manage',
    currentCheck: '/lawyer/manage',
    roles: [Role.ADMIN]
  },
]