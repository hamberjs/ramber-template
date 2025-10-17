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
REPO_ROLLUP="hamberjs/ramber-template-rollup"
REPO_WEBPACK="hamberjs/ramber-template-webpack"

git push "https://$TOKEN@github.com/$REPO_MAIN.git" $ROLLUP $WEBPACK -f
git push "https://$TOKEN@github.com/$REPO_ROLLUP.git" $ROLLUP:master -f
git push "https://$TOKEN@github.com/$REPO_WEBPACK.git" $WEBPACK:master -f
