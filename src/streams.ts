import xs from 'xstream'
import fromEvent from 'xstream/extra/fromEvent'
import h from 'snabbdom/h'
import { init } from 'snabbdom'
import { VNode } from 'snabbdom/vnode'

const patch = init([])
let prevVtree: Element | VNode = document.querySelector('#app')!

function updateDOM(vtree: VNode) {
  patch(prevVtree, vtree)
  prevVtree = vtree
}

interface State {
  allButtonsPressed: boolean,
}

const state: State = {
  allButtonsPressed: false,
}

function render(state: State) {
  return h('div', [
    h('button.one', '1'),
    h('button.two', '2'),
    h('button.three', '3'),
    state.allButtonsPressed
      ? 'All buttons are pressed'
      : '',
  ])
}

function update(state: State) {
  const vtree = render(state)
  updateDOM(vtree)
}

update(state)

const one = document.querySelector('.one') as HTMLButtonElement
const two = document.querySelector('.two') as HTMLButtonElement
const three = document.querySelector('.three') as HTMLButtonElement

const allButtonsPressed$ = xs
  .combine(
    fromEvent(one, 'click'),
    fromEvent(two, 'click'),
    fromEvent(three, 'click'),
  )
  .mapTo(true)
  .startWith(false)

allButtonsPressed$.addListener({
  next: allButtonsPressed => {
    state.allButtonsPressed = allButtonsPressed
    update(state)
  },
})
