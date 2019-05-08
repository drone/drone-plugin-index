import { sortPluginCards } from '../functions/functions';
import { addEventListeners, doesElementExist, onDOMReady } from '../utils/utils';


const handlePluginCardTagClick = (event) => {
  event.preventDefault();

  if (doesElementExist('.search')) {
    const tag = event.currentTarget;
    const tagContent = tag.textContent;

    const searchInput = document.querySelector('.search__input');

    searchInput.value = tagContent;
    searchInput.focus();

    sortPluginCards(tagContent);
  }
};


onDOMReady(() => {
  if (doesElementExist('.plugin-card')) {
    addEventListeners('.plugin-card__tag', 'click', handlePluginCardTagClick);
  }
});

