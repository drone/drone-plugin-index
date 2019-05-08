import { sortPluginCards } from '../functions/functions';
import { addEventListeners, doesElementExist, onDOMReady } from '../utils/utils';


const handleSearchInputChange = (event) => {
  const searchInput = event.currentTarget;
  const value = searchInput.value;

  sortPluginCards(value);
};


onDOMReady(() => {
  if (doesElementExist('.search')) {
    addEventListeners('.search__input', 'change', handleSearchInputChange);
  }
});
