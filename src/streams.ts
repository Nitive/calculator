import { button, div, makeDOMDriver, DOMSource, VNode } from '@cycle/dom'
import { run, FantasyObservable } from '@cycle/run'
import xs, { Stream } from 'xstream'

interface Sources {
  DOM: DOMSource,
}

interface Sinks {
  DOM: Stream<VNode>
  [key: string]: FantasyObservable
}

function main(sources: Sources): Sinks {
  const allButtonsPressed$ = xs
    .combine(
      sources.DOM.select('.one').events('click'),
      sources.DOM.select('.two').events('click'),
      sources.DOM.select('.three').events('click'),
    )
    .mapTo(true)
    .startWith(false)

  const vtree$ = allButtonsPressed$
    .map(allButtonsPressed => {
      return div([
        button('.one', '1'),
        button('.two', '2'),
        button('.three', '3'),
        allButtonsPressed
          ? 'All buttons are pressed'
          : '',
      ])
    })

  return {
    DOM: vtree$,
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
})
