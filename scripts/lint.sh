#!/bin/bash

./node_modules/.bin/jshint $(find ./lib ./scripts -type f -name "*.js") --config jshint.json
