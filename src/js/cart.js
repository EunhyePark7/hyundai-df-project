// 장바구니 가져오기
const getCart = () => {
  const cart = sessionStorage.getItem('cart');
  return cart ? JSON.parse(cart) : {};
};

// 장바구니 저장하기
const setCart = (cart) => {
  sessionStorage.setItem('cart', JSON.stringify(cart));
};

// 장바구니 수량 UI 업데이트
const updateCartCount = () => {
  const cart = getCart();
  const count = Object.keys(cart).length;

  let countElement = document.querySelector(
    '.header__action--cart .cart-count'
  );
  if (!countElement) {
    countElement = document.createElement('span');
    countElement.className = 'cart-count';
    document.querySelector('.header__action--cart')?.appendChild(countElement);
  }

  countElement.style.display = count === 0 ? 'none' : 'inline-block';
  countElement.textContent = count;
};

// 장바구니 항목 키 생성
const generateKey = (brand, name, prefix = '') =>
  prefix ? `[${prefix}] ${brand} ${name}` : `${brand} ${name}`;

// 브랜드, 이름 정보 추출
const extractProductInfo = (item, brandSelector, nameSelector) => {
  const brand = item.querySelector(brandSelector)?.textContent.trim();
  const name = item.querySelector(nameSelector)?.textContent.trim();
  return { brand, name };
};

// 장바구니 항목 추가
const addToCart = (key, brand, name) => {
  const cart = getCart();

  if (cart[key]) {
    alert('이미 담긴 상품입니다.');
    return false;
  }

  cart[key] = { brand, name, quantity: 1 };
  setCart(cart);
  updateCartCount();
  return true;
};

// 세트 항목 추가 (여러 개)
const addSetToCart = (items) => {
  const cart = getCart();
  let hasDuplicate = false;

  items.forEach((item, index) => {
    const { brand, name } = extractProductInfo(item, 'span', 'strong');
    const key = generateKey(brand, name, `SET${index + 1}`);
    if (cart[key]) hasDuplicate = true;
  });

  if (hasDuplicate) {
    alert('이미 담긴 상품이 포함되어 있습니다.');
    return;
  }

  items.forEach((item, index) => {
    const { brand, name } = extractProductInfo(item, 'span', 'strong');
    const key = generateKey(brand, name, `SET${index + 1}`);
    cart[key] = { brand, name, quantity: 1 };
  });

  setCart(cart);
  updateCartCount();
};

// 장바구니 초기화
const clearCart = () => {
  alert('임시로 장바구니를 비웁니다.');
  sessionStorage.removeItem('cart');
  updateCartCount();
};

// 초기 이벤트 바인딩
export const initCart = () => {
  // 일반 상품 장바구니 담기
  document
    .querySelectorAll('.product .product__btn-cart')
    .forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        const item = e.currentTarget.closest('.product__item');
        const { brand, name } = extractProductInfo(
          item,
          '.product__brand',
          '.product__name'
        );
        const key = generateKey(brand, name);
        addToCart(key, brand, name);
      });
    });

  // 세트 상품 장바구니 담기
  document.querySelector('.popup__btn-cart')?.addEventListener('click', () => {
    const setItems = document.querySelectorAll('.popup__product-item');
    addSetToCart(setItems);
  });

  // 장바구니 비우기
  document
    .querySelector('.header__action--cart')
    ?.addEventListener('click', (e) => {
      e.preventDefault();
      clearCart();
    });

  // 초기 수량 업데이트
  document.addEventListener('DOMContentLoaded', updateCartCount);
};
