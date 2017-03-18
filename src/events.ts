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
  onePressed: boolean,
  twoPressed: boolean,
  threePressed: boolean,
}

const state: State = {
  onePressed: false,
  twoPressed: false,
  threePressed: false,
}

function render(state: State) {
  return h('div', [
    h('button.one', '1'),
    h('button.two', '2'),
    h('button.three', '3'),
    state.onePressed && state.twoPressed && state.threePressed
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

one.addEventListener('click', () => {
  state.onePressed = true
  update(state)
})

two.addEventListener('click', () => {
  state.twoPressed = true
  update(state)
})

three.addEventListener('click', () => {
  state.threePressed = true
  update(state)
})
