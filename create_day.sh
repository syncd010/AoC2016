#!/bin/sh

if [ -z "$1" ]
then
    echo "Please provide a day number"
    exit
fi

DAY="day$1"

if [ -f "./src/day$1.ts" ]
then
    echo "Day $1 already exists"
else
    cp "./src/day_template.ts" "./src/day$1.ts"
    touch "./data/input$1"
    touch "./data/input$1Test"
    echo "Day $1 created"
fi
