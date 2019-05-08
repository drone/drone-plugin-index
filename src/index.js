import { doesElementExist, onDOMReady, onWindowResize } from './scripts/utils/utils';
import { hidePluginCardsTagsThatDontFit, initPrism } from './scripts/functions/functions';

import './scripts/handlers/handlers';

import './styles/main.scss';


onDOMReady(() => {
  if (doesElementExist('.plugin-card')) {
    hidePluginCardsTagsThatDontFit();

    onWindowResize(() => hidePluginCardsTagsThatDontFit());
  }

  if (doesElementExist('.plugin-docs')) {
    initPrism();
  }
});
