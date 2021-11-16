"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const md5_1 = require("./md5");
function next_hash(str, idx) {
    for (;; idx++) {
        let hash = (0, md5_1.md5)(str + idx.toString());
        if (hash.startsWith("00000")) {
            return { hash, idx };
        }
    }
}
function solve_part_one(day_input) {
    let idx = 0;
    let hashes = [];
    while (hashes.length < 8) {
        let next = next_hash(day_input[0], idx);
        hashes.push(next.hash);
        idx = next.idx + 1;
    }
    return hashes.map(hash => hash[5]).join("");
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    let idx = 0;
    let hashes = [];
    let pwd = "--------".split("");
    while (hashes.length < 8) {
        let next = next_hash(day_input[0], idx);
        let pos = parseInt(next.hash[5]);
        if (!isNaN(pos) && pos < pwd.length && pwd[pos] == "-") {
            pwd[pos] = next.hash[6];
            hashes.push(next.hash);
        }
        idx = next.idx + 1;
    }
    return pwd.join("");
}
exports.solve_part_two = solve_part_two;
