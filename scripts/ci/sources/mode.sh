#!/usr/bin/env bash
source ./scripts/ci/sources/tunnel.sh

is_demo() {
  [[ "$MODE" = demo ]]
}

is_lint() {
  [[ "$MODE" = lint ]]
}

