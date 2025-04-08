
import { RouteObject } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { Test } from '@/pages/LoginTest';
import { RegisterTest } from '@/pages/RegisterTest';
import { LawyerRegisterTest } from '@/pages/LawyerRegisterTest';
import { PendingLawyersPage } from '@/pages/PendingLawyersPage';
import { WriteTest } from '@/pages/WriteTest';
import { QuestionsTest } from '@/pages/QuestionsTest';
import { TestPage } from '@/pages/TestPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
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
    path: '/write',
    element: <WriteTest />,
  },
  {
    path: '/questions',
    element: <QuestionsTest />,
  },
  {
    path: '/test-page',
    element: <TestPage />,
  },
]; 