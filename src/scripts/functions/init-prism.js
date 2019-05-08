import Prism from 'prismjs';


export const initPrism = () => {
  const codeBlocks = document.querySelectorAll('.plugin-docs__content pre');

  codeBlocks.forEach((codeBlock) => {
    codeBlock.classList.add('line-numbers');
  });

  Prism.highlightAll();
};
