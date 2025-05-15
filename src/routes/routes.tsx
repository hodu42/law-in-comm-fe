import { RouteObject } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import { Test } from "@/pages/testPages/Test";
import { RegisterTest } from "@/pages/testPages/RegisterTest";
import { LawyerRegisterTest } from "@/pages/testPages/LawyerRegisterTest";
import { PendingLawyersPage } from "@/pages/testPages/PendingLawyersTest";
import { WriteTest } from "@/pages/testPages/WriteTest";
import { QuestionsTest } from "@/pages/testPages/QuestionsTest";
import { TestPage } from "@/pages/testPages/TestPage";
import { Login } from "@/pages/Login";
import { QuestionWrite } from "@/pages/QuestionWrite";
import { QuestionListPage } from "@/pages/QuestionListPage";
import { AnswerWriteTest } from "@/pages/testPages/AnswerWriteTest";
import { QuestionDetailPage } from "@/pages/QuestionDetailPage";
import { QuestionModify } from "@/pages/QuestionModify";
import { Role } from "@/types/role";
import { ClientRegister } from "@/pages/ClientRegister";
import { LawyerRegister } from "@/pages/LawyerRegister";
import { ManageLawyerRegister } from "@/pages/ManageLawyerRegister";
import { ClientMyPage } from "@/pages/ClientMyPage";
import { LawyerMyPage } from "@/pages/LawyerMyPage";
import { ClientMyPageModify } from "@/pages/ClientMyPageModify";
import { LawyerMyPageModify } from "@/pages/LawyerMyPageModify";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/route/ProtectedRoute";

export const protectedRoutesWithoutLayout: RouteObject[] = [
  {
    path: "/question/write",
    element: <QuestionWrite />,
  },
  {
    path: "/question/modify/:questionId",
    element: <QuestionModify />,
  },
  {
    path: "/client/my-page",
    element: <ClientMyPage />,
  },
  {
    path: "/lawyer/my-page",
    element: <LawyerMyPage />,
  },
  {
    path: "/client/my-page/modify",
    element: <ClientMyPageModify />,
  },
  {
    path: "/lawyer/my-page/modify",
    element: <LawyerMyPageModify />,
  },
];

export const RoutesWithLayout: RouteObject[] = [
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/questions",
    element: <QuestionListPage />,
  },
  {
    path: "/question/:questionId",
    element: <QuestionDetailPage />,
  },
  {
    path: "/lawyer/manage",
    element: <ManageLawyerRegister />,
  },
];

export const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/users/join/general",
    element: <ClientRegister />,
  },
  {
    path: "/users/join/lawyer",
    element: <LawyerRegister />,
  },
];

export const testRoutes: RouteObject[] = [
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/register",
    element: <RegisterTest />,
  },
  {
    path: "/lawyer-register",
    element: <LawyerRegisterTest />,
  },
  {
    path: "/write",
    element: <WriteTest />,
  },
  {
    path: "/pending-lawyers",
    element: <PendingLawyersPage />,
  },
  {
    path: "/question/test",
    element: <QuestionsTest />,
  },
  {
    path: "/test-page",
    element: <TestPage />,
  },
  {
    path: "/answer/write",
    element: <AnswerWriteTest />,
  },
];

export const routes: RouteObject[] = [
  ...publicRoutes,
  {
    path: "/",
    element: <Layout />,
    children: RoutesWithLayout,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: protectedRoutesWithoutLayout,
  },
];

// TODO: Protected Route 코드
// export const routes: RouteObject[] = [
//   ...publicRoutes,
//   ...testRoutes,
//   {
//     path: "/",
//     element: <ProtectedRoute />,
//     children: [
//       {
//         element: <Layout />,
//         children: RoutesWithLayout,
//       },
//       ...protectedRoutesWithoutLayout,
//     ],
//   },
// ];

export const headerPaths = [
  {
    title: "홈",
    link: "/main",
    currentCheck: "/main",
  },
  {
    title: "질문 목록",
    link: "/questions?keyword=&category=&page=0",
    currentCheck: "/questions",
  },
  {
    title: "질문 작성",
    link: "/question/write",
    currentCheck: "/question/write",
  },
  {
    title: "질문 관리",
    link: "/question/manage",
    currentCheck: "/question/manage",
    roles: [Role.ADMIN],
  },
  {
    title: "답변 관리",
    link: "/answer/manage",
    currentCheck: "/answer/manage",
    roles: [Role.ADMIN],
  },
  {
    title: "변호사 가입 관리",
    link: "/lawyer/manage",
    currentCheck: "/lawyer/manage",
    roles: [Role.ADMIN],
  },
];
