import { addEventListeners, doesElementExist, onDOMReady } from '../utils/utils';


const handleHeaderBurgerClick = (event) => {
  event.preventDefault();

  document.querySelector('.mobile-nav').classList.remove('mobile-nav_hidden');
  document.querySelector('html').style.overflow = 'hidden';
  document.querySelector('body').style.overflow = 'hidden';
};


onDOMReady(() => {
  if (doesElementExist('.header')) {
    addEventListeners('.header__burger', 'click', handleHeaderBurgerClick);
  }
});
