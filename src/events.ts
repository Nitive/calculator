
interface State {
  onePressed: boolean,
  twoPressed: boolean,
  threePressed: boolean,
}

const app = document.querySelector('#app')!
app.innerHTML = `
  <button class="one">1</button>
  <button class="two">2</button>
  <button class="three">3</button>
  <span></span>
`

function render(state: State) {
  const span = app.querySelector('span')!
  span.innerHTML = state.onePressed && state.twoPressed && state.threePressed
    ? 'All buttons was pressed'
    : ''
}

const state: State = {
  onePressed: false,
  twoPressed: false,
  threePressed: false,
}

render(state)


const one = document.querySelector('.one') as HTMLButtonElement
one.addEventListener('click', () => {
  state.onePressed = true
  render(state)
})

const two = document.querySelector('.two') as HTMLButtonElement
two.addEventListener('click', () => {
  state.twoPressed = true
  render(state)
})

const three = document.querySelector('.two') as HTMLButtonElement
three.addEventListener('click', () => {
  state.threePressed = true
  render(state)
})
