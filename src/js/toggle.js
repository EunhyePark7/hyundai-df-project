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
    // 열기
    button.setAttribute('aria-expanded', 'true');
    button.classList.add('is-open');
    dropdown.classList.add('is-open');
  }
};

// init Toggle
export const initToggle = () => {
  // 초기 상태 aria, 클래스 세팅 (필요하면)
  document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
    dropdown.classList.remove('is-open');
    dropdown.style.overflow = 'hidden';
  });

  document
    .querySelectorAll('[data-action^="dropdown-toggle:"]')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.action.split(':')[1];
        toggleDropdown(name);
      });
    });
};
