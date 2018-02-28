export default ({obj, theme, autoHide}) => {
  $(`.${obj}, #${obj}`).mCustomScrollbar({
    theme: `${theme}`, // dark-1, dark-2
    autoHideScrollbar: autoHide
  })
}
