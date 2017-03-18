// import { div, button, VNode } from '@cycle/dom'
// import xs from 'xstream'

// function render(allButtonsPressed: boolean): VNode {
//   return div([
//     button('.one', 1),
//     button('.two', 2),
//     button('.three', 3),
//     allButtonsPressed ? 'All buttons are pressed' : '',
//   ])
// }


// interface Source {
//   DOM: any
// }

// function main({ DOM }: Source) {
//   const allButtonsPressed$ = xs.combine(
//     DOM.select('.one').events('click'),
//     DOM.select('.two').events('click'),
//     DOM.select('.three').events('click'),
//   )

//   const state$ = allButtonsPressed$.mapTo(true).startWith(false)

//   return {
//     DOM: state$.map(render),
//   }
// }

