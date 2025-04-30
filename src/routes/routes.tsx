import { RouteObject } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { Test } from '@/pages/Test';
import { RegisterTest } from '@/pages/RegisterTest';
import { LawyerRegisterTest } from '@/pages/LawyerRegisterTest';
import { PendingLawyersPage } from '@/pages/PendingLawyersPage';
import { WriteTest } from '@/pages/WriteTest';
import { QuestionsTest } from '@/pages/QuestionsTest';
import { TestPage } from '@/pages/TestPage';
import { Login } from '@/pages/Login';
import { QuestionWrite } from '@/pages/QuestionWrite';
import { QuestionListPage } from '@/pages/QuestionListPage';
import { AnswerWriteTest } from '@/pages/AnswerWriteTest';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <Login />,
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
    path: '/register-lawyer',
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
  }
];

export const headerPaths = [
  {
    title: '홈',
    link: '/'
  },
  {
    title: '질문 목록',
    link: '/questions'
  },
  {
    title: '질문 작성',
    link: '/question/write'
  },
  {
    title: '질문 관리',
    link: '/question/manage'
  },
  {
    title: '답변 관리',
    link: '/answer/manage'
  },
  {
    title: '변호사 가입 관리',
    link: '/lawyer/manage',
  },
]