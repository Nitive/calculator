import { run, Drivers, FantasyObservable } from '@cycle/run'
import { makeDOMDriver, div, DOMSource, VNode } from '@cycle/dom'
import xs, { Stream } from 'xstream'

interface Sources {
  DOM: DOMSource,
}

interface Sinks {
  DOM: Stream<VNode>,
  [name: string]: FantasyObservable,
}

function main(sources: Sources): Sinks {
  return {
    DOM: xs.of(div('hello cycle')),
  }
}

const drivers: Drivers<Sources, Sinks> = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
