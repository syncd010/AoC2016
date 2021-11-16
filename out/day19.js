"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const common_1 = require("./common");
function msb_pos(n) {
    let r = 0;
    while (n >>= 1)
        r++;
    return r;
}
function solve_part_one(day_input) {
    let n = parseInt(day_input[0]);
    return ((n & ~(1 << msb_pos(n))) << 1) | 1;
}
exports.solve_part_one = solve_part_one;
function naive_part_two(n) {
    let survivors = Array(n).fill(0).map((_, i) => i + 1), start = 0;
    while (survivors.length > 1) {
        let other = (0, common_1.mod)(start + Math.floor(survivors.length / 2), survivors.length);
        survivors.splice(other, 1);
        start = (0, common_1.mod)((other > start) ? start + 1 : start, survivors.length);
    }
    return survivors[0];
}
function fast_part_two(n) {
    let survivors = Array(n).fill(0).map((_, i) => i + 1), idx = 0;
    while (survivors.length > 2) {
        let next = [], initial_idx = idx, mid = Math.floor(survivors.length / 2);
        if ((0, common_1.mod)(survivors.length, 2) == 0)
            idx += mid + 2;
        else if ((0, common_1.mod)(survivors.length, 3) == 2)
            idx += mid + 4;
        else
            idx += mid + 1;
        idx = (0, common_1.mod)(idx, survivors.length);
        while (next.length < Math.floor(survivors.length / 3)) {
            next.push(survivors[idx]);
            idx = (0, common_1.mod)((idx + 3), survivors.length);
        }
        let final_idx = (0, common_1.mod)(survivors.length - 1 + (0, common_1.mod)(survivors.length, 3) + initial_idx, survivors.length);
        idx = next.findIndex(v => v == survivors[final_idx]);
        idx = (0, common_1.mod)(idx + 1, next.length);
        survivors = next;
    }
    return survivors[idx];
}
function solve_part_two(day_input) {
    let n = parseInt(day_input[0]);
    for (n = 3; n < 200; n++) {
        console.log("Naive solution for ", n, " is ", naive_part_two(n));
        if (naive_part_two(n) != fast_part_two(n)) {
            console.log("Naive solution for ", n, " is ", naive_part_two(n));
            console.log("Fast solution for ", n, " is ", fast_part_two(n));
        }
    }
    return fast_part_two(n);
}
exports.solve_part_two = solve_part_two;
