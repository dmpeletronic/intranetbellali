#!/bin/bash

echo "Deploying Bellali intranet..."

rm -rf ../deploy

mkdir ../deploy
mkdir ../deploy/js
mkdir ../deploy/js/tabletop
mkdir ../deploy/js/tabletop/src

cp -v ../*.html ../deploy/
cp -v -r ../images ../deploy
cp -v -r ../css ../deploy
cp -v -r ../dashboard ../deploy/
cp ../js/common.js ../deploy/js/
cp ../js/tabletop/src/tabletop.js ../deploy/js/tabletop/src/

echo "Done"
