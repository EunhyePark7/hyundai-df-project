import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

// init swiper
export const initSwiper = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const swiperEl = document.querySelector('.product--slide.swiper');
    console.log('swiperEl:', swiperEl);

    if (!swiperEl) {
      console.error('Swiper 요소를 찾을 수 없습니다!');
      return;
    }

    const swiper = new Swiper('.test-swiper', {
      loop: true,
      modules: [Navigation, Autoplay],
      autoplay: {
        delay: 1000
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });

    console.log('Swiper 초기화 완료', swiper);
  });
};
