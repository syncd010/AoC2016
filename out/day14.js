"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const md5_1 = require("./md5");
function chars_in_a_row(str) {
    let c3 = "", c5 = [], n = 1;
    for (let i = 1; i < str.length; i++) {
        n = (str.charAt(i) == str.charAt(i - 1)) ? n + 1 : 1;
        if (n == 3 && c3 == "")
            c3 = str.charAt(i);
        if (n == 5)
            c5.push(str.charAt(i));
    }
    return [c3, c5];
}
function valid_keys(salt, additional_hash_count = 0) {
    let potential_keys = new Map(), valid_keys = [];
    for (let idx = 0;; idx++) {
        let hash = (0, md5_1.md5)(salt + idx.toString());
        for (let i = 0; i < additional_hash_count; i++)
            hash = (0, md5_1.md5)(hash);
        let [c3, c5] = chars_in_a_row(hash);
        if (c3 != "") {
            if (!(c3 in potential_keys))
                potential_keys[c3] = [];
            potential_keys[c3].push(idx);
        }
        for (let c of c5.filter(v => v in potential_keys)) {
            valid_keys = valid_keys.concat(potential_keys[c].filter(v => idx - v > 0 && idx - v < 1001));
        }
        if (valid_keys.length >= 64)
            break;
    }
    valid_keys.sort((a, b) => a - b);
    return valid_keys;
}
function solve_part_one(day_input) {
    return valid_keys(day_input[0])[63];
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    return valid_keys(day_input[0], 2016)[63];
}
exports.solve_part_two = solve_part_two;
