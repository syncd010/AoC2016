"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const assembunny = require("./assembunny");
function solve_part_one(day_input) {
    let res = assembunny.exec(assembunny.parse(day_input), { "a": 7, "b": 0, "c": 0, "d": 0 });
    return res.registers.a;
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    let a = 0, b = 0, c = 0, d = 0;
    a = 12;
    for (b = a - 1; b > 1; b--) {
        a = a * b;
    }
    a += 80 * 97;
    return a;
}
exports.solve_part_two = solve_part_two;
