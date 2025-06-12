import Swiper from 'swiper';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const defaultSwiper = {
  modules: [A11y, Autoplay],
  a11y: {
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    slideLabelMessage:
      '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.'
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  }
};

export const initSwiper = () => {
  document.addEventListener('DOMContentLoaded', () => {
    // 상품 리스트
    // 슬라이드 4개
    document
      .querySelectorAll('.product.product--slide > .swiper')
      .forEach((el) => {
        const swiper = new Swiper(el, {
          ...defaultSwiper,
          modules: [A11y, Navigation, Autoplay],
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          slidesPerView: 4,
          slidesPerGroup: 1,
          spaceBetween: 20,
          breakpoints: {
            1130: {
              slidesPerView: 4,
              slidesPerGroup: 1
            },
            768: {
              slidesPerView: 2.5,
              slidesPerGroup: 1
            },
            480: {
              slidesPerView: 1.5,
              slidesPerGroup: 1
            }
          }
        });
      });

    // 브랜드 리스트
    // 슬라이드 6개
    document.querySelectorAll('.brand.brand--slide > .swiper').forEach((el) => {
      const windowWidth = window.innerWidth;

      // 1130px 이하에서는 스와이퍼 초기화 안 함
      if (windowWidth <= 1130) {
        console.log(
          '브랜드 슬라이드는 1130px 이하에서 Swiper를 비활성화합니다.'
        );
        return;
      }

      const swiper = new Swiper(el, {
        ...defaultSwiper,
        modules: [A11y, Navigation, Autoplay],
        slidesPerView: 6,
        slidesPerGroup: 1,
        spaceBetween: 10
      });
    });

    // 상품 세트
    // 슬라이드 단일
    document.querySelectorAll('.product--set__img.swiper').forEach((el) => {
      const swiper = new Swiper(el, {
        ...defaultSwiper,
        modules: [A11y, Autoplay, Pagination],
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      });
    });
  });
};
