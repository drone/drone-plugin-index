export const hidePluginCardsTagsThatDontFit = () => {
  const pluginCards = document.querySelectorAll('.plugin-card');

  pluginCards.forEach((pluginCard) => {
    const pluginCardTagLists = pluginCard.querySelectorAll('.plugin-card__tag-list');

    pluginCardTagLists.forEach((pluginCardTagList) => {
      const pluginCardTagListWidth = pluginCardTagList.offsetWidth;

      const pluginCardTags = pluginCardTagList.querySelectorAll('.plugin-card__tag');
      const hiddenPluginCardTags = [];
      let pluginCardTagsWidthIndicator = 0;

      pluginCardTags.forEach((tag) => {
        tag.style.display = '';

        const pluginCardHiddenTagsAmount = pluginCardTagList.querySelector('.plugin-card__hidden-tags-amount');

        const tagWidth = tag.offsetWidth;
        const tagMarginRight = window.getComputedStyle(tag).marginRight;
        const tagMarginRightWithoutPixels = tagMarginRight.slice(0, -2);
        const tagMarginRightAsNumber = Number(tagMarginRightWithoutPixels);

        pluginCardTagsWidthIndicator += tagWidth + tagMarginRightAsNumber;

        if (pluginCardTagsWidthIndicator > pluginCardTagListWidth) {
          tag.style.display = 'none';
          hiddenPluginCardTags.push(tag.textContent);
        }

        const hiddenPluginCardTagsAmount = hiddenPluginCardTags.length;

        if (hiddenPluginCardTagsAmount > 0) {
          const hiddenPluginCardTagsAsString = hiddenPluginCardTags.join('  ');

          pluginCardHiddenTagsAmount.textContent = `+${hiddenPluginCardTagsAmount}`;
          pluginCardHiddenTagsAmount.title = hiddenPluginCardTagsAsString;

          pluginCardHiddenTagsAmount.classList.remove('plugin-card__hidden-tags-amount_hidden');
        } else {
          pluginCardHiddenTagsAmount.classList.add('plugin-card__hidden-tags-amount_hidden');

          pluginCardHiddenTagsAmount.textContent = '';
          pluginCardHiddenTagsAmount.title = '';
        }
      });
    });
  });
};
