"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
function valid_triangle(a, b, c) {
    return (a + b > c && a + c > b && b + c > a);
}
function solve_part_one(day_input) {
    let count = 0;
    for (let line of day_input) {
        let [a, b, c] = line.trim().replace(/\s+/g, ",").split(",").map(a => parseInt(a));
        count += valid_triangle(a, b, c) ? 1 : 0;
    }
    return count;
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    let count = 0;
    let values = day_input.map(l => l.trim().replace(/\s+/g, ",").split(",").map(a => parseInt(a)));
    for (let n = 0; n < values.length; n++) {
        let col = n % 3, row = Math.floor(n / 3) * 3;
        count += valid_triangle(values[row][col], values[row + 1][col], values[row + 2][col]) ? 1 : 0;
    }
    return count;
}
exports.solve_part_two = solve_part_two;
