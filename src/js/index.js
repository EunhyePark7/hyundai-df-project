import { initCartAnimation } from './cart';
import { initPopup } from './popup';
import { initSection } from './section';
import { initSwiper } from './swiper';
import { initToggle } from './toggle';

(() => {
  initCartAnimation();
  initSwiper();
  initPopup();
  initToggle();
  initSection();
})();
