#!/usr/bin/env bash
set -euo pipefail

# Safety gates — all must pass before touching version numbers.

if [ -n "$(git status --porcelain)" ]; then
  echo "release: working tree is not clean. Commit or stash first." >&2
  exit 1
fi

branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "main" ]; then
  echo "release: expected to be on main, currently on '$branch'." >&2
  exit 1
fi

git fetch origin main --quiet
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then
  echo "release: local main is not up to date with origin/main." >&2
  exit 1
fi

echo "release: running lint..."
vp lint

echo "release: running build..."
NUXT_APP_BASE_URL="/" vp run build
rm -rf .output

echo "release: all checks passed. Bumping version and tagging..."
vp exec changelogen --release

echo
echo "release: done locally. Nothing has been pushed."
echo "release: review the commit/tag, then run: git push --follow-tags"
