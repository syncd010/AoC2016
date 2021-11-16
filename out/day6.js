"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const common_1 = require("./common");
function solve_part_one(day_input) {
    return (0, common_1.transpose2D)(day_input.map(l => l.split("")))
        .map(l => (0, common_1.count_chars)(l))
        .map(cnt => Object.keys(cnt)
        .sort((a, b) => (cnt[b] - cnt[a]) * 26 + (a.charCodeAt(0) - b.charCodeAt(0)))[0])
        .join("");
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    return (0, common_1.transpose2D)(day_input.map(l => l.split("")))
        .map(l => (0, common_1.count_chars)(l))
        .map(cnt => Object.keys(cnt)
        .sort((a, b) => (cnt[a] - cnt[b]) * 26 + (a.charCodeAt(0) - b.charCodeAt(0)))[0])
        .join("");
}
exports.solve_part_two = solve_part_two;
