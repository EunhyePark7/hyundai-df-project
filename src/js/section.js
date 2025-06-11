// init Section
export const initSection = () => {
  // 네비아이템: data-nav-target 속성으로 섹션과 매칭
  const navItems = document.querySelectorAll('[data-nav-target]');
  // 실제 스크롤 대상 섹션: data-scroll-section 속성으로 구분
  const sections = Array.from(
    document.querySelectorAll('[data-scroll-section]')
  );

  // 현재 화면 중앙에 노출되는 섹션을 찾아서 네비아이템 활성화
  const setActiveNav = () => {
    let current = null;

    // 섹션별 위치 계산: 뷰포트 중앙 영역에 걸쳐있는 섹션 찾기
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom > window.innerHeight / 2
      ) {
        current = section.getAttribute('data-scroll-section');
      }
    });

    // 네비아이템에 활성화 클래스 토글
    navItems.forEach((item) => {
      const target = item.getAttribute('data-nav-target');
      item.classList.toggle('section-nav__item--active', target === current);
    });
  };

  // 스크롤 이벤트, 페이지 로드 시 활성화 상태 업데이트
  window.addEventListener('scroll', setActiveNav);
  window.addEventListener('load', setActiveNav);

  // 네비 아이템 클릭시 해당 섹션으로 이동
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-nav-target');
      const targetSection = document.querySelector(
        `[data-scroll-section="${targetId}"]`
      );
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};
