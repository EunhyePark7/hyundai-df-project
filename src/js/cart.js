export const initCartAnimation = () => {
  const cartButtonWrapper = document.querySelector('.header__action--cart');
  if (!cartButtonWrapper) return;

  document.querySelectorAll('.product .product__btn-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      cartButtonWrapper.classList.add('is-animation');

      setTimeout(() => {
        cartButtonWrapper.classList.remove('is-animation');
      }, 500);
    });
  });
};
