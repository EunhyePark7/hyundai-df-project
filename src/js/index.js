(() => {
  // 유틸 함수: 팝업 열기
  const openPopup = (name) => {
    const popup = document.querySelector(`[data-popup="${name}"]`);
    if (!popup) return;

    popup.classList.add('is-visible');
    document.body.classList.add('is-locked'); // 스크롤 막기

    // 접근성: 첫 포커스 가능한 요소로 포커스 이동
    const focusable = popup.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && typeof focusable.focus === 'function') {
      focusable.focus();
    }
  };

  // 유틸 함수: 팝업 닫기
  const closePopup = (name) => {
    const popup = document.querySelector(`[data-popup="${name}"]`);
    if (!popup) return;

    popup.classList.remove('is-visible');

    // 열린 팝업이 없으면 스크롤 다시 허용
    const visiblePopups = document.querySelectorAll('[data-popup].is-visible');
    if (visiblePopups.length === 0) {
      document.body.classList.remove('is-locked');
    }
  };

  // 팝업 열기 트리거 바인딩
  document
    .querySelectorAll('[data-action^="popup-open:"]')
    .forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const name = trigger.dataset.action.split(':')[1];
        openPopup(name);
      });
    });

  // 팝업 닫기 트리거 바인딩
  document
    .querySelectorAll('[data-action^="popup-close:"]')
    .forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const name = trigger.dataset.action.split(':')[1];
        closePopup(name);
      });
    });

  // ESC 키로 팝업 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-popup].is-visible').forEach((popup) => {
        popup.classList.remove('is-visible');
      });
      document.body.classList.remove('is-locked');
    }
  });

  // 팝업 외부 클릭 시 닫기
  document.addEventListener('click', (e) => {
    const visiblePopups = document.querySelectorAll('[data-popup].is-visible');
    visiblePopups.forEach((popup) => {
      const container = popup.querySelector('.popup__container');
      if (
        !container.contains(e.target) &&
        !e.target.closest('[data-action^="popup-open:"]')
      ) {
        popup.classList.remove('is-visible');
      }
    });

    // 닫힌 후 남은 팝업 없으면 스크롤 허용
    if (document.querySelectorAll('[data-popup].is-visible').length === 0) {
      document.body.classList.remove('is-locked');
    }
  });

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
})();
