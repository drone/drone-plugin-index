import { onDOMReady, doesElementExist } from '../utils/utils';


export const checkShouldFooterBackgroundBeHidden = () => {
  const html = document.querySelector('html');
  const footer = document.querySelector('footer');

  if (html.offsetHeight < 1000) {
    footer.classList.add('footer_hidden-background');
  } else {
    footer.classList.remove('footer_hidden-background');
  }
};


onDOMReady(() => {
  if (doesElementExist('.footer')) {
    checkShouldFooterBackgroundBeHidden();
  }
});
