// сказать, что надо изолировать сайд эффекты

import { Stream } from 'xstream'
import { DOMSource, VNode, makeDOMDriver } from '@cycle/dom'
import { run, Drivers, FantasyObservable } from '@cycle/run'

import { App } from './app'

export interface Sources {
  DOM: DOMSource,
}

export interface Sinks {
  DOM: Stream<VNode>,
  [key: string]: FantasyObservable,
}


const drivers: Drivers<Sources, Sinks> = {
  DOM: makeDOMDriver('#app'),
}

function main(sources: Sources): Sinks {
  return App(sources)
}

run(main, drivers)
