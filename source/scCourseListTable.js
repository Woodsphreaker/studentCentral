import {getData} from '../helpers/stateRoute'
import random from '../helpers/randomNumber'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {}

  const renderView = () => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/courses-list-table-component.html`
    getData(urlProd)
      .then(view => {
        const {renderTo} = sysParam
        const template = $('#item-template', view).html()
        $(`#${renderTo}, .${renderTo}`).html(view)
        viewContents(template)
      })
      .catch(error => console.log(error))
  }

  const viewContents = template => {
    const {renderTo} = sysParam
    const source = [...Array(50).keys()]
      .reduce((acc, el, i) => acc.concat(
        { name: `course ${i + 1}`,
          status: 'completed',
          score: random(0, 10),
          date: new Date().toLocaleDateString(),
          buttons: [
            {type: 'edit', id: 10, class: 'fa-pencil', name: 'Editar'},
            {type: 'delete', id: 10, class: 'fa-trash', name: 'Deletar'}
          ]
        }), [])

    const tableID = random(0, 10000)
    const view = handlebars.compile(template)({tableID: tableID, courses: source})
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)

    appDataTables.montaTabela({
      obj: `#${tableID}`,
      order: [1, 'desc'],
      // collumnOrder: [0, 4],
      buttons: ['excel']
    })
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
