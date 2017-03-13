SHELL := /bin/bash
PATH := ./node_modules/.bin:$(PATH)

dev-server:
	webpack-dev-server --hot --quiet

ts-check:
	tsc -p . -w --noEmit --pretty

start:
	concurrently --raw 'make dev-server' 'make ts-check'
