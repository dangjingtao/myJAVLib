module.exports = async function () {
  const { win } = this;
  win.isMaximized() ? await win.unmaximize() : await win.maximize();
  //   return win.isMaximized();
};
