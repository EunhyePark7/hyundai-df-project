import { initCart } from './cart';
import { initPopup } from './popup';
import { initSection } from './section';
import { initSwiper } from './swiper';
import { initToggle } from './toggle';

(() => {
  initCart();
  initSwiper();
  initPopup();
  initToggle();
  initSection();
})();
