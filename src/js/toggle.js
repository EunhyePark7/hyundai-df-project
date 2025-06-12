// 드롭다운 토글 함수
const toggleDropdown = (name) => {
  const dropdown = document.querySelector(`[data-dropdown="${name}"]`);
  const button = document.querySelector(
    `[data-action="dropdown-toggle:${name}"]`
  );

  if (!dropdown || !button) return;

  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    // 닫기
    button.setAttribute('aria-expanded', 'false');
    button.classList.remove('is-open');
    dropdown.classList.remove('is-open');
  } else {
    // 먼저 모든 드롭다운 닫기
    closeAllDropdowns();

    // 열기
    button.setAttribute('aria-expanded', 'true');
    button.classList.add('is-open');
    dropdown.classList.add('is-open');
  }
};

// 모든 드롭다운 닫기 함수
const closeAllDropdowns = () => {
  document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
    dropdown.classList.remove('is-open');
  });
  document
    .querySelectorAll('[data-action^="dropdown-toggle:"]')
    .forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('is-open');
    });
};

// init Toggle
export const initToggle = () => {
  // 초기 상태 aria, 클래스 세팅
  document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
    dropdown.classList.remove('is-open');
    dropdown.style.overflow = 'hidden';
  });

  // 토글 버튼 클릭 이벤트
  document
    .querySelectorAll('[data-action^="dropdown-toggle:"]')
    .forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // 외부 클릭 이벤트와 충돌 방지
        const name = btn.dataset.action.split(':')[1];
        toggleDropdown(name);
      });
    });

  // 드롭다운 클릭 시 이벤트 버블링 차단
  document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // 바디 클릭 시 드롭다운 닫기
  document.body.addEventListener('click', () => {
    closeAllDropdowns();
  });
};
