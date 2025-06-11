import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

// init swiper
export const initSwiper = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.product.swiper', {
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
