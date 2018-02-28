import handlebars from 'handlebars'

export default () => {
  handlebars.registerHelper('openrow', function (index, options) {
    if ((index) % 3 === 0) {
      return options.fn(this)
    }
  })

  handlebars.registerHelper('closerow', function (index, options) {
    if ((index + 1) % 3 === 0) {
      return options.fn(this)
    }
  })
}
