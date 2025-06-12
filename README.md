# 퍼블리셔 채용 과제 : 이벤트 템플릿

## 사용법

```bash
npm install
npm run dev
```

## 구현 개요

- HTML, CSS, JavaScript를 활용한 퍼블리싱 과제
- 반응형 웹과 다양한 사용자 인터랙션 구현

## 사용 기술

- **HTML5 / CSS3 / JavaScript (Vanilla)**

### 개발 환경

- **Vite**: 빠른 번들링과 HMR을 위한 프론트엔드 개발 서버
- **Node.js v20.3.0**: 프로젝트 실행 환경

### HTML 구조 설계

- 시멘틱 태그 활용 (`header`, `main`, `section` 등)
- 컴포넌트 단위로 반복 요소 분리 및 재사용성 확보
- 웹 접근성 고려 (ARIA 속성, 키보드 내비게이션 지원)

### SCSS 파일 구조

- `_reset.scss` : 브라우저 기본 스타일 초기화
- `_font.scss` : 웹폰트 정의 및 사용 설정
- `_variable.scss` : 컬러, 폰트사이즈 등 프로젝트 전역 변수 정의
- `_mixins.scss` : 반응형 대응 등 재사용 가능한 믹스인 정의
- `_layout.scss` : 전체 레이아웃 관련 스타일 (그리드, 공통 구조 등)
- `_components.scss` : 버튼, 카드 등 UI 컴포넌트 단위 스타일 정의
- `style.scss` : 위 파일들을 통합하는 진입점 역할

### CSS 네이밍 규칙

- BEM 방식: `block__element--modifier`
- 상태 클래스: `is-active`, `is-open`, `is-animation`
- 각 섹션별 스타일 모듈화

### CSS 및 반응형 대응

- **PostCSS**: CSS 트랜스파일링 및 플러그인 활용
  - `autoprefixer`: 브라우저별 벤더 프리픽스 자동 추가
  - `postcss-custom-media`: 커스텀 미디어쿼리 사용
- 주요 브레이크포인트를 활용한 반응형 레이아웃 구현

### 인터랙션

- **섹션 상태 관리**: 페이지 주요 섹션 UI 토글 및 상태 처리
- **팝업 관리**: 동적 팝업 열기/닫기 제어
- **스와이퍼 슬라이드**: 다양한 슬라이더 초기화 및 반응형 설정
- **토글 기능**: 사은행사 더보기 메뉴 - 간단한 토글 상태 관리
- **장바구니 애니메이션**: 버튼 클릭 시 시각적 피드백 제공
