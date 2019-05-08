import { addEventListeners, doesElementExist, onDOMReady } from '../utils/utils';


const handleMobileNavCloseClick = (event) => {
  event.preventDefault();

  document.querySelector('.mobile-nav').classList.add('mobile-nav_hidden');
  document.querySelector('html').style.overflow = '';
  document.querySelector('body').style.overflow = '';
};


onDOMReady(() => {
  if (doesElementExist('.mobile-nav')) {
    addEventListeners('.mobile-nav__close', 'click', handleMobileNavCloseClick);
  }
});
