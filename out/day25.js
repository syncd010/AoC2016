"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const assembunny = require("./assembunny");
function solve_part_one(day_input) {
    let a = 0;
    for (a = 0;; a++) {
        let bin = (a + 365 * 7).toString(2), alternating = true;
        for (let i = 0; i < bin.length; i++)
            alternating &&= bin[i] != bin[(i + 1) % bin.length];
        if (alternating)
            break;
    }
    let res = assembunny.exec(assembunny.parse(day_input), { "a": a, "b": 0, "c": 0, "d": 0 }, 100000);
    return a.toString() + " - " + (a + 365 * 7).toString() + " (" + (a + 365 * 7).toString(2) + ") " + res.out;
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    return -1;
}
exports.solve_part_two = solve_part_two;
