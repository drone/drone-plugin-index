export const addEventListeners = (elements, event, callback) => {
  document.querySelectorAll(elements).forEach((element) => {
    element.addEventListener(event, callback);
  });
};
