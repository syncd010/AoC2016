import * as process from "process"

const data_dir = "data"
let day: number = undefined
let test = false
let file: string = undefined

// Parse command-line arguments
let nextArgIsFile = false
for (let i = 2; i < process.argv.length; i++) {
    if (nextArgIsFile) {
        file = process.argv[i];
        nextArgIsFile = false;
        continue;
    }

    switch (process.argv[i]) {
        case "-f":
            nextArgIsFile = true;
            break;
        case "-t":
            test = true;
            break;
        default:
            day = parseInt(process.argv[i])
            break;
    }
}

if (day === undefined) {
    console.log("Usage: node aoc.js [-f FILE] [-t] day")
    console.log("\tday - Day to run")
    console.log("\t-f FILE - File to run. If not specified '" + data_dir + "\/input' for the day will be used")
    console.log("\t-t - Use '" + data_dir + "\/inputTest' file for the day if none specified")
    process.exit(1)
}

if (file == undefined) {
    file = data_dir + "\/input" + day.toString();
    if (test) file += "Test"
}

import { readFileSync } from "fs"
import("./day" + day.toString()).then((day_module) => {
    try {
        // Open and read file
        const data = readFileSync(file, 'utf8').trimEnd().split("\n")
        console.log("Part 1: " + day_module.solve_part_one(data))
        console.log("Part 2: " + day_module.solve_part_two(data))
    } catch (err) {
        console.error(err)
    }
});
