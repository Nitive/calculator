import { div, button } from '@cycle/dom'
import xs from 'xstream'
import { Sources, Sinks } from './index'

export function App(sources: Sources): Sinks {
  const allInputsTouched$ = xs
    .combine(
      sources.DOM.select('.one').events('click'),
      sources.DOM.select('.two').events('click'),
      sources.DOM.select('.three').events('click'),
    )
    .mapTo(true)
    .startWith(false)

  const vtree$ = allInputsTouched$
    .map(allInputsTouched => div([
      button('.one', 1),
      button('.two', 2),
      button('.three', 3),
      allInputsTouched
        ? 'All buttons was pressed'
        : '',
    ]))

  return {
    DOM: vtree$,
  }
}
