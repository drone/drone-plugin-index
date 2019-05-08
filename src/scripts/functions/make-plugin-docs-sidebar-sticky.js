import stickybits from '../vendor/stickybits';
import { doesElementExist, onDOMReady } from '../utils/utils';


const makePluginDocsSidebarSticky = () => {
  stickybits('.plugin-docs__sidebar-inner', { noStyles: true });
};


onDOMReady(() => {
  if (doesElementExist('.plugin-docs')) {
    makePluginDocsSidebarSticky();
  }
});
