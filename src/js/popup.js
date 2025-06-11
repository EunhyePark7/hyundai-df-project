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

// init Popup
export const initPopup = () => {
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
};
