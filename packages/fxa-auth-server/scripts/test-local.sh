#!/bin/sh

set -e

if [ -z "$NODE_ENV" ]; then export NODE_ENV=dev; fi;
if [ -z "$CORS_ORIGIN" ]; then export CORS_ORIGIN="http://foo,http://bar"; fi;

set -u

DEFAULT_ARGS="--recursive --timeout 10000 --retries 2 --exit"

./scripts/gen_keys.js
./scripts/gen_vapid_keys.js
./scripts/oauth_gen_keys.js
node ../fxa-auth-db-mysql/bin/db_patcher > /dev/null

GLOB=$*
if [ -z "$GLOB" ]; then
  echo "Remote tests"
  ./scripts/mocha-coverage.js $DEFAULT_ARGS test/remote

else
  ./scripts/mocha-coverage.js $DEFAULT_ARGS $GLOB
fi

npm run lint:eslint
grunt copyright
