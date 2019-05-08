let resizeTimeout = null;

export const onWindowResize = (callback) => {
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      callback();
    }, 300);
  });
};
