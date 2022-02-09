#!/bin/bash

args=("$@")

if ["$#" -lt 1 ]; then
    git add .
    git commit -m --allow-empty-message ""
    git push origin master
else
    git add .
    git commit -m args[0]
    git push origin master
fi