#!/bin/sh

ng build --base-href https://jarios71.github.io/twa-md2-lib/ lib-twa-md --prod
rm -r docs/*
cp -a dist/lib-twa-md/* docs/
