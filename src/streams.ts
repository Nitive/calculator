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

function selectEvents(selector: string, event: string) {
  return fromEvent(document.body, event)
    .filter(e => e.target.matches(selector))
}

const allButtonsPressed$ = xs
  .combine(
    selectEvents('.one', 'click'),
    selectEvents('.two', 'click'),
    selectEvents('.three', 'click'),
  )
  .mapTo(true)
  .startWith(false)

allButtonsPressed$.addListener({
  next: allButtonsPressed => {
    state.allButtonsPressed = allButtonsPressed
    update(state)
  },
  error: err => console.error(err),
})
