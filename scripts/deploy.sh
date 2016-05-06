#!/bin/bash

echo "Deploying Bellali intranet..."

rm -rf ../deploy

mkdir ../deploy
mkdir ../deploy/js
mkdir ../deploy/js/tabletop
mkdir ../deploy/js/tabletop/src
mkdir ../deploy/css
mkdir ../deploy/images

cp ../*.html ../deploy/
cp ../images/* ../deploy/images/ 
cp ../css/* ../deploy/css/
cp ../js/common.js ../deploy/js/
cp ../js/tabletop/src/tabletop.js ../deploy/js/tabletop/src/

echo "Done"
