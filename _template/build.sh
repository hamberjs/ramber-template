#!/bin/bash
cd "$(dirname "$0")"

if [ "$CI" ]; then
	git config user.email 'nkduy.dev@gmail.com'
	git config user.name 'NKDuy [bot]'
fi

# branch names
ROLLUP=rollup
WEBPACK=webpack

./create-branches.sh $ROLLUP $WEBPACK

# force push rollup and webpack branches and repos using HTTPS + token
# Expected: TOKEN environment variable available
REPO_MAIN="hamberjs/ramber-template"

git push "https://$TOKEN@github.com/$REPO_MAIN.git" $ROLLUP $WEBPACK -f
