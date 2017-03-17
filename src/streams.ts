import xs from 'xstream'
import fromEvent from 'xstream/extra/fromEvent'

interface State {
  allButtonsPressed: boolean,
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
  span.innerHTML = state.allButtonsPressed
    ? 'All buttons was pressed'
    : ''
}

const state: State = {
  allButtonsPressed: false,
}

render(state)


const one = document.querySelector('.one') as HTMLButtonElement
const two = document.querySelector('.two') as HTMLButtonElement
const three = document.querySelector('.two') as HTMLButtonElement

const allButtonsPressed$ = xs.combine(
  fromEvent(one, 'click'),
  fromEvent(two, 'click'),
  fromEvent(three, 'click'),
)

allButtonsPressed$.addListener({
  next: () => {
    render({ allButtonsPressed: true })
  },
})
