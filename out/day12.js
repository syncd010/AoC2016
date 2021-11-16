"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const assembunny = require("./assembunny");
function solve_part_one(day_input) {
    let res = assembunny.exec(assembunny.parse(day_input));
    return res.registers.a;
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    let res = assembunny.exec(assembunny.parse(day_input), { "a": 0, "b": 0, "c": 1, "d": 0 });
    return res.registers.a;
}
exports.solve_part_two = solve_part_two;
