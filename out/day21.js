"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const common_1 = require("./common");
function scramble(pass, ops, unscramble = false) {
    const re_swap_pos = /swap position (\d+) with position (\d+)/, re_swap_letter = /swap letter (\w+) with letter (\w+)/, re_rotate = /rotate (\w+) (\d+) steps?/, re_rotate_based = /rotate based on position of letter (\w+)/, re_reverse = /reverse positions (\d+) through (\d+)/, re_move = /move position (\d+) to position (\d+)/;
    let rot_map = [], rev_rot_map = [];
    for (let i = 0; i < pass.length; i++) {
        let steps = (0, common_1.mod)(i + ((i >= 4) ? 2 : 1), pass.length);
        rot_map[i] = steps;
        rev_rot_map[(0, common_1.mod)(i + steps, pass.length)] = steps;
    }
    let arr = pass.split("");
    for (let op of ops) {
        let m;
        if (m = op.match(re_swap_pos)) {
            let x = m[1], y = m[2];
            [arr[x], arr[y]] = [arr[y], arr[x]];
        }
        else if (m = op.match(re_swap_letter)) {
            let x = m[1], y = m[2];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == x)
                    arr[i] = y;
                else if (arr[i] == y)
                    arr[i] = x;
            }
        }
        else if (m = op.match(re_rotate)) {
            let n = (0, common_1.mod)(parseInt(m[2]), arr.length), dir = unscramble ? ((m[1] == "left") ? "right" : "left") : m[1];
            if (dir == "left") {
                arr.push(...arr.splice(0, n));
            }
            else if (dir == "right") {
                arr.push(...arr.splice(0, arr.length - n));
            }
        }
        else if (m = op.match(re_rotate_based)) {
            let idx = arr.findIndex(v => v == m[1]);
            if (unscramble) {
                arr.push(...arr.splice(0, rev_rot_map[idx]));
            }
            else {
                arr.push(...arr.splice(0, arr.length - rot_map[idx]));
            }
        }
        else if (m = op.match(re_reverse)) {
            let x = parseInt(m[1]), y = parseInt(m[2]);
            arr = arr.slice(0, x).concat(arr.slice(x, y + 1).reverse()).concat(arr.slice(y + 1));
        }
        else if (m = op.match(re_move)) {
            let x = parseInt(m[1]), y = parseInt(m[2]);
            if (unscramble)
                [y, x] = [x, y];
            let step = (x < y) ? 1 : -1, tmp = arr[x];
            for (let i = x; i != y; i += step)
                arr[i] = arr[i + step];
            arr[y] = tmp;
        }
    }
    return arr.join("");
}
function solve_part_one(day_input) {
    let pass = "abcdefgh";
    return scramble(pass, day_input);
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    let pass = "fbgdceah";
    return scramble(pass, day_input.reverse(), true);
}
exports.solve_part_two = solve_part_two;
