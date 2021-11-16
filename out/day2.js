"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const common_1 = require("./common");
const moves = {
    "U": new common_1.Position(0, -1),
    "R": new common_1.Position(1, 0),
    "D": new common_1.Position(0, 1),
    "L": new common_1.Position(-1, 0),
};
function solve_part_one(day_input) {
    let pos = new common_1.Position(1, 1);
    let code = 0;
    for (let i = 0; i < day_input.length; i++) {
        for (let j = 0; j < day_input[i].length; j++) {
            pos.iadd(moves[day_input[i][j]]);
            pos.x = (0, common_1.clamp)(pos.x, 0, 2);
            pos.y = (0, common_1.clamp)(pos.y, 0, 2);
        }
        code = code * 10 + (pos.x + 1 + (pos.y) * 3);
    }
    return code;
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    let keypad = ["       ", "   1   ", "  234  ", " 56789 ", "  ABC  ", "   D   ", "       "];
    let pos = new common_1.Position(1, 3);
    let code = "";
    for (let i = 0; i < day_input.length; i++) {
        for (let j = 0; j < day_input[i].length; j++) {
            let new_pos = pos.add(moves[day_input[i][j]]);
            if (keypad[new_pos.y][new_pos.x] != " ")
                pos = new_pos;
        }
        code += keypad[pos.y][pos.x];
    }
    return code;
}
exports.solve_part_two = solve_part_two;
