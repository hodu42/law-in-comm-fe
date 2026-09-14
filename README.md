# ⚖️ 로인컴 (LawInCom)

> 법률 상담이 필요한 사용자와 변호사를 연결하는 Q&A 플랫폼.
> 질문을 올리면 AI가 1차 답변을 제공하고, 심사를 통과한 변호사가 추가 답변을 남깁니다.

| 기간 | 팀 구성 | 담당 |
|---|---|---|
| 2025.03 ~ 2025.06 | 3인 | **Frontend** |

국립금오공과대학교 프로젝트로 진행했습니다. 프론트엔드는 단독으로 맡았습니다.

---

## ✨ 주요 기능


| 기능 | 설명 |
|---|---|
| 질문 등록 · 수정 | 법률 상담 질문을 작성하면 AI가 1차 답변 제공 |
| 변호사 답변 | 심사를 통과한 변호사가 추가 답변 작성 |
| 변호사 가입 심사 | 제출된 변호사 자격 정보를 검토해 승인 처리 |
| 실시간 채팅 | STOMP 기반 1:1 상담 채팅 (이전 대화 무한 스크롤) |
| 마이페이지 | 의뢰인 · 변호사 각각의 활동 내역과 정보 수정 |
| 질문 · 답변 관리 | 신고된 게시물 확인 및 처리 |

---

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Core | React 18, TypeScript |
| 상태 관리 | Redux Toolkit, React Redux |
| 라우팅 | React Router 7 |
| 통신 | Axios, STOMP(`@stomp/stompjs`) · SockJS |
| 인증 | jwt-decode |
| 스타일 | Tailwind CSS, `@tailwindcss/typography` |
| 콘텐츠 | react-markdown, remark-gfm (AI 답변 렌더링) |
| 빌드 · 그 외 | Create React App + CRACO, date-fns, react-slick |

---

## 📁 프로젝트 구조

```
src/
├── api/          # 도메인별 API 모듈 (auth, questions, answers, chat, users, reports)
│   ├── index.ts  # ApiClient 클래스 + axios 인터셉터
│   └── auth/     # 로그인, 회원가입, 토큰 관리
├── components/   # 공통 컴포넌트 (ChatWidget, Layout, ProtectedRoute 등)
├── hooks/        # reduxHooks, tokenDecoder, useLogout, useNavigation
├── pages/        # 15개 페이지
├── routes/       # 라우트 정의 및 권한 분기
├── store/        # Redux Toolkit 슬라이스 (user, chatWidget, search)
└── types/
```

---

## 🙋 담당 구현

프론트엔드를 단독으로 담당해 15개 페이지와 공통 인프라를 구성했습니다.

### API 호출 계층 분리

컴포넌트마다 axios를 직접 부르면 인증 처리가 흩어집니다.
`ApiClient` 클래스로 axios 인스턴스를 감싸고 `get` / `post` / `put` / `delete`를 노출해, 화면 코드가 인증이나 공통 에러 처리를 다루지 않도록 분리했습니다. API는 도메인별 모듈로 나눴습니다.

### JWT 자동 재발급

응답 인터셉터에서 토큰 만료를 감지해 재발급하고, 원래 요청을 재시도합니다.

- 401 중에서도 서버 에러 코드(`4010605`)로 **토큰 만료만** 선별. 권한 부족 등 다른 401은 재발급을 시도하지 않습니다.
- `_retry` 플래그로 같은 요청의 재시도 반복 차단
- `isRefreshing` 플래그로 동시 재발급 차단
- 재발급까지 실패하면 토큰을 지우고 사용자·검색·채팅 상태를 함께 초기화한 뒤 로그인 페이지로 이동. 채팅방 ID 같은 이전 사용자 정보가 남지 않도록 처리

토큰 헤더 이름과 타입(`Bearer` 등)까지 서버 응답에서 받아 저장하는 구조라, 인증 방식이 바뀌어도 클라이언트를 고치지 않아도 됩니다.

### 역할 기반 화면 분기

의뢰인 · 변호사 · 관리자가 쓰는 화면이 다릅니다.
`jwt-decode`로 토큰에서 역할을 읽고 `ProtectedRoute`와 라우트 정의에서 접근 범위를 나눴습니다. 레이아웃이 필요 없는 화면은 라우트 그룹을 따로 두어 분리했습니다.

### STOMP 실시간 채팅

- STOMP 클라이언트를 `useRef`로 보관해 리렌더링의 영향을 받지 않도록 구성
- 채팅방 이동 시 이전 구독을 명시적으로 해제하고 메시지·페이지 상태 초기화
- 위젯 종료 및 로그아웃 시 `deactivate()`로 연결 종료

---

## 🧯 트러블슈팅

### 1. 토큰 재발급 요청이 무한 반복됨

**증상** — Access Token이 만료되면 재발급 요청이 멈추지 않고 반복됐습니다.

**원인** — 요청 인터셉터에서 토큰을 붙이지 않을 공개 API를 경로로 걸러내고 있었는데, 목록에 적힌 경로가 `/auth/refresh`였습니다. 실제 엔드포인트는 `/auth/token/refresh`였습니다.

경로가 걸러지지 않으니 **재발급 요청 자체에 만료된 토큰이 붙었고**, 서버는 다시 401(`4010605`)을 내려줬습니다. 응답 인터셉터는 이를 토큰 만료로 판단해 또 재발급을 시도했습니다.

**시도했다가 걷어낸 것** — 처음에는 재발급 중 들어온 요청을 `failedQueue`에 쌓아 갱신 후 일괄 재시도하는 구조를 만들었습니다. 원인이 경로 불일치였기 때문에 큐를 붙여도 반복은 멈추지 않았고, 코드만 복잡해져 제거했습니다.

**해결** — 예외 경로를 실제 엔드포인트로 맞추고, 재시도 제어를 `_retry`와 `isRefreshing` 두 겹으로 단순화했습니다. 같은 날 재발급 응답의 필드명 변경(`tokenType`·`headerType` → `type`·`header`)도 함께 반영했습니다.
[`c53eb3c`](https://github.com/hodu42/law-in-comm-fe/commit/c53eb3c)

### 2. 질문 상세 페이지에서 답변을 끝없이 다시 불러옴

**원인** — 답변을 가져오는 `useEffect`의 의존성 배열에 `answers`가 들어 있었습니다.

```tsx
useEffect(() => {
  fetchQuestion();
  fetchAnswers();          // answers 갱신
}, [questionId, answers]); // → effect 재실행
```

**해결** — 실행 조건이 다른 두 가지를 한 effect에 묶은 것이 문제였습니다. 최초 조회는 `questionId`에, 답변 페이지 이동은 `currentPage`에 반응하도록 분리했습니다.
[`3d2bf82`](https://github.com/hodu42/law-in-comm-fe/commit/3d2bf82)

### 3. 분야를 바꾸면 빈 목록이 나옴

**원인** — 질문 목록 페이지에서 페이지 번호·검색어·분야 필터를 하나의 `useEffect`로 처리했습니다. 5페이지를 보다가 분야를 바꾸면 `currentPage`가 5로 남은 채 요청이 나가, 결과가 적은 분야에서는 빈 화면이 됐습니다.

**해결** — effect를 둘로 나누고, 필터나 검색어가 바뀌면 페이지를 0으로 되돌린 뒤 조회하도록 했습니다. `totalPages`가 0일 때 페이지 버튼이 하나도 그려지지 않던 문제도 함께 처리했습니다.
[`c85591c`](https://github.com/hodu42/law-in-comm-fe/commit/c85591c)

### 4. 훅을 이벤트 핸들러 자리에 넘김

**원인** — 로그아웃 로직을 커스텀 훅으로 분리하면서 훅 본문에 부수효과를 그대로 두고, 버튼에 훅 자체를 전달했습니다.

```tsx
onClick={useLogout}   // 렌더링 시점에 로그아웃이 실행됨
```

훅 본문은 호출되는 순간 실행되므로 클릭과 무관하게 토큰이 지워졌습니다. 훅 호출 규칙에도 어긋나는 구조였습니다.

**해결** — 훅이 부수효과를 직접 실행하지 않고 **핸들러 함수를 반환**하도록 바꿨습니다. 컴포넌트는 최상위에서 훅을 호출해 받은 함수를 `onClick`에 전달합니다.
[`f6b9762`](https://github.com/hodu42/law-in-comm-fe/commit/f6b9762)

### 5. 채팅방을 옮기거나 로그아웃해도 이전 연결이 남음

**원인** — STOMP 연결을 정리하는 코드가 세 군데에서 어긋나 있었습니다.

- cleanup 함수를 `useEffect`가 아니라 내부에 선언한 연결 함수에서 반환해, React가 cleanup으로 인식하지 못했습니다.
- 채팅방 목록으로 돌아갈 때 구독 해제보다 상태 초기화가 먼저 실행됐습니다.
- 로그아웃으로 사용자 상태가 비었을 때 연결을 끊는 경로가 없었습니다.

**해결** — 연결 해제를 `disconnectStomp`로 묶어 `useCallback`으로 고정하고 effect 최상위에서 cleanup으로 반환했습니다. 방을 옮길 때는 `unsubscribe`를 `await`로 끝낸 뒤 상태를 초기화하고, 사용자 상태가 비면 연결을 끊도록 분기를 추가했습니다. 현재 구독은 `subscriptionRef`로 따로 추적합니다.

### 6. 이전 대화를 불러오면 스크롤이 튐

**원인** — 위로 스크롤해 이전 메시지를 불러오면 목록 높이가 늘어나면서 보고 있던 위치가 위로 밀렸습니다.

**해결** — 요청 직전에 컨테이너의 `scrollHeight`를 저장하고, 렌더링 후 늘어난 높이만큼 스크롤을 보정했습니다. 중복 요청은 `isLoadingMore`로, 끝까지 불러온 뒤의 불필요한 호출은 `hasMoreMessages`로 막았습니다.

---

## 🔭 아쉬웠던 점

- **토큰을 localStorage에 저장** — 구현 당시 간편함을 우선했는데 XSS에 노출되는 방식입니다. 이후 프로젝트에서는 Refresh Token을 HttpOnly 쿠키로 옮겼습니다.
- **사용자 피드백에 `alert()` 사용** — 세션 만료 안내 등을 브라우저 기본 다이얼로그로 처리했습니다.
- **서버 상태를 직접 관리** — 서버 데이터 캐싱 도구 없이 `useState`와 Redux로 다뤄, 로딩·에러 처리가 화면마다 반복됩니다.

---

## ⚙️ 실행 방법

```bash
git clone https://github.com/hodu42/law-in-comm-fe.git
cd law-in-comm-fe

npm install
npm start
```

<!-- TODO: src/config/Config.tsx 의 BACKEND_URL, WEBSOCKET_URL, IMAGE_URL 이 하드코딩되어 있습니다.
     .env 로 분리한 뒤 설정 방법을 안내해주세요. -->
