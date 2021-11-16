"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
function dragon_curve(a) {
    let b = a.split("").reverse().map(c => (c == "0") ? "1" : "0");
    return a + "0" + b.join("");
}
function calc_checksum(str) {
    let res = [];
    for (let i = 0; i < str.length; i += 2)
        res[i / 2] = (str.charAt(i) == str.charAt(i + 1)) ? "1" : "0";
    return res.join("");
}
function solve_part_one(day_input) {
    let len = parseInt(day_input[0]), state = day_input[1];
    do {
        state = dragon_curve(state);
    } while (state.length < len);
    let checksum = state.slice(0, len);
    do {
        checksum = calc_checksum(checksum);
    } while (checksum.length % 2 == 0);
    return checksum;
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    day_input[0] = "35651584";
    return solve_part_one(day_input);
}
exports.solve_part_two = solve_part_two;
