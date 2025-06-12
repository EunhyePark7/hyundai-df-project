// init Section
export const initSection = () => {
  // 네비아이템: data-nav-target 속성으로 섹션과 매칭
  const navItems = document.querySelectorAll('[data-nav-target]');
  // 실제 스크롤 대상 섹션: data-scroll-section 속성으로 구분
  const sections = Array.from(
    document.querySelectorAll('[data-scroll-section]')
  );

  let lastKnownSection = sections[0]?.getAttribute('data-scroll-section'); // 처음엔 첫 섹션으로 초기화

  // 현재 화면에 노출되는 섹션 - 네비아이템 활성화
  const setActiveNav = () => {
    let current = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom > window.innerHeight / 2
      ) {
        current = section.getAttribute('data-scroll-section');
      }
    });

    // 첫 진입 시 기본 섹션 활성화
    if (!current && sections.length > 0) {
      current = sections[0].getAttribute('data-scroll-section');
    }

    // 마지막 섹션 지나면 마지막 섹션 유지
    const lastSection = sections[sections.length - 1];
    const lastRect = lastSection.getBoundingClientRect();
    const bottomThreshold = 50;
    if (lastRect.bottom < window.innerHeight + bottomThreshold) {
      current = lastSection.getAttribute('data-scroll-section');
    }

    // 네비아이템 활성 클래스 토글
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

      // 반응형 대응 - 헤더값 적용
      if (targetSection) {
        let yOffset;
        if (window.innerWidth <= 1130) {
          yOffset = -120 - 20;
        } else {
          yOffset = -165 - 30;
        }

        const y =
          targetSection.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
};
