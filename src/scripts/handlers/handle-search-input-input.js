import { sortPluginCards } from '../functions/functions';
import { addEventListeners, doesElementExist, onDOMReady } from '../utils/utils';


let timeout = null;

const handleSearchInputInput = (event) => {
  const searchInput = event.currentTarget;
  const value = searchInput.value;

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    sortPluginCards(value);
  }, 1000);
};


onDOMReady(() => {
  if (doesElementExist('.search')) {
    addEventListeners('.search__input', 'input', handleSearchInputInput);
  }
});
