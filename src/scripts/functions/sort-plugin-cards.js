import { onDOMReady, doesElementExist } from '../utils/utils';
import { checkShouldFooterBackgroundBeHidden } from './functions';


const PLUGIN_CARD_LIST_ANIMATION_DURATION = 500;


const checkDoesPluginMatchSearchString = (pluginCard, searchString) => {
  let doesPluginCardMatchSearchInputValue = false;

  const lowerCasedSearchInputValue = searchString.toLowerCase();

  const title = pluginCard.dataset.title;
  const lowerCasedTitle = title.toLowerCase();

  const author = pluginCard.dataset.author;
  const lowerCasedAuthor = author.toLowerCase();

  const tags = pluginCard.dataset.tags;
  const tagsAsArray = getTagsAsArray(tags);
  const lowerCasedTags = getLowerCasedTags(tagsAsArray);

  if (lowerCasedTitle.includes(lowerCasedSearchInputValue)) {
    doesPluginCardMatchSearchInputValue = true;
  }

  if (lowerCasedAuthor.includes(lowerCasedSearchInputValue)) {
    doesPluginCardMatchSearchInputValue = true;
  }

  if (lowerCasedTags.some((tag) => lowerCasedSearchInputValue.includes(tag))) {
    doesPluginCardMatchSearchInputValue = true;
  }

  return doesPluginCardMatchSearchInputValue;
};


const showPluginCardListInner = () => {
  const pluginCardList = document.querySelector('.plugin-card-list');
  const pluginCardListInner = pluginCardList.querySelector('.plugin-card-list__inner:not(.plugin-card-list__inner_search-results)');

  pluginCardListInner.style.display = '';

  setTimeout(() => {
    pluginCardListInner.classList.remove('plugin-card-list__inner_hidden');
  }, 10);
};


const showSearchResults = () => {
  const pluginCardList = document.querySelector('.plugin-card-list');
  const pluginCardListInner = pluginCardList.querySelector('.plugin-card-list__inner:not(.plugin-card-list__inner_search-results)');
  const pluginCardListInnerSearchResults = pluginCardList.querySelector('.plugin-card-list__inner_search-results');

  if (pluginCardList.dataset.animationIsGoing) return;

  pluginCardListInner.classList.add('plugin-card-list__inner_hidden');
  pluginCardList.setAttribute('data-animation-is-going', 'true');

  setTimeout(() => {
    pluginCardListInner.style.display = 'none';

    pluginCardListInnerSearchResults.style.position = '';
    pluginCardListInnerSearchResults.style.visibility = '';

    setTimeout(() => {
      pluginCardListInnerSearchResults.classList.add('plugin-card-list__inner_visible');
      pluginCardList.removeAttribute('data-animation-is-going');
    }, 10);
  }, PLUGIN_CARD_LIST_ANIMATION_DURATION);
};

const hideSearchResults = () => {
  const pluginCardList = document.querySelector('.plugin-card-list');
  const pluginCardListInner = pluginCardList.querySelector('.plugin-card-list__inner:not(.plugin-card-list__inner_search-results)');
  const pluginCardListInnerSearchResults = pluginCardList.querySelector('.plugin-card-list__inner_search-results');

  if (pluginCardList.dataset.animationIsGoing) return;

  pluginCardListInnerSearchResults.classList.remove('plugin-card-list__inner_visible');
  pluginCardList.setAttribute('data-animation-is-going', '');

  setTimeout(() => {
    pluginCardListInnerSearchResults.style.position = 'absolute';
    pluginCardListInnerSearchResults.style.visibility = 'hidden';

    pluginCardListInner.style.display = '';

    setTimeout(() => {
      pluginCardListInner.classList.remove('plugin-card-list__inner_hidden');
      pluginCardList.removeAttribute('data-animation-is-going');
    }, 10);
  }, PLUGIN_CARD_LIST_ANIMATION_DURATION);
};

const hideAndThenShowSearchResults = () => {
  const pluginCardList = document.querySelector('.plugin-card-list');
  const pluginCardListInnerSearchResults = pluginCardList.querySelector('.plugin-card-list__inner_search-results');

  if (pluginCardList.dataset.animationIsGoing) return;

  pluginCardListInnerSearchResults.classList.remove('plugin-card-list__inner_visible');
  pluginCardList.setAttribute('data-animation-is-going', '');

  setTimeout(() => {
    pluginCardListInnerSearchResults.classList.add('plugin-card-list__inner_visible');
    pluginCardList.removeAttribute('data-animation-is-going');
  }, PLUGIN_CARD_LIST_ANIMATION_DURATION);
};


const showPluginCard = (pluginCard) => {
  setTimeout(() => {
    pluginCard.style.display = '';
  }, PLUGIN_CARD_LIST_ANIMATION_DURATION);
};

const hidePluginCard = (pluginCard) => {
  setTimeout(() => {
    pluginCard.style.display = 'none';
  }, PLUGIN_CARD_LIST_ANIMATION_DURATION);
};


const showEmptyResultsMessage = () => {
  const emptyResultsMessage = document.querySelector('.plugin-card-list__empty-results-message');
  emptyResultsMessage.classList.add('plugin-card-list__empty-results-message_visible');
};

const hideEmptyResultsMessage = () => {
  const emptyResultsMessage = document.querySelector('.plugin-card-list__empty-results-message');
  emptyResultsMessage.classList.remove('plugin-card-list__empty-results-message_visible');
};


const getTagsAsArray = (tags) => {
  const tagsWithoutSquareBrackets = tags.slice(1, -1);

  return tagsWithoutSquareBrackets.split(' ');
};

const getLowerCasedTags = (tags) => {
  return tags.map((tag) => tag.toLowerCase());
};


export const sortPluginCards = (searchInputValue) => {
  if (doesElementExist('.plugin-card-list')) {
    if (searchInputValue.length > 0) {
      const pluginCardListInnerSearchResults = document.querySelector('.plugin-card-list__inner_search-results');
      const pluginCards = pluginCardListInnerSearchResults.querySelectorAll('.plugin-card');

      if (!pluginCards) return;

      if (pluginCardListInnerSearchResults.classList.contains('plugin-card-list__inner_visible')) {
        hideAndThenShowSearchResults();
      } else {
        showSearchResults();
      }

      let visiblePluginCardsCount = 0;

      pluginCards.forEach((pluginCard) => {
        const doesPluginMatchSearchInputValue = checkDoesPluginMatchSearchString(pluginCard, searchInputValue);

        if (doesPluginMatchSearchInputValue === true) {
          showPluginCard(pluginCard);
          visiblePluginCardsCount++;
        } else {
          hidePluginCard(pluginCard);
        }
      });

      if (visiblePluginCardsCount === 0) {

        setTimeout(() => {
          showEmptyResultsMessage();
        }, PLUGIN_CARD_LIST_ANIMATION_DURATION);
      } else {
        hideEmptyResultsMessage();
      }
    } else {
      hideSearchResults();
      hideEmptyResultsMessage();
    }

    setTimeout(() => {
      checkShouldFooterBackgroundBeHidden();
    }, PLUGIN_CARD_LIST_ANIMATION_DURATION);
  }
};


onDOMReady(() => {
  if (doesElementExist('.plugin-card-list')) {
    showPluginCardListInner();
  }
});
