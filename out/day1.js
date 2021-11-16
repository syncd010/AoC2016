"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const common_1 = require("./common");
const dirs = ["N", "E", "S", "W"];
function turn(facing, dir) {
    const idx = (dir == "R") ? +1 : -1;
    return dirs[(0, common_1.mod)(dirs.indexOf(facing) + idx, dirs.length)];
}
const moves = {
    "N": new common_1.Position(0, 1),
    "E": new common_1.Position(1, 0),
    "S": new common_1.Position(0, -1),
    "W": new common_1.Position(-1, 0),
};
function walk(instructions, stop_on_visited = false) {
    let facing = "N";
    let pos = new common_1.Position(0, 0);
    let visited = new Set([pos.key()]);
    outer_loop: for (let i = 0; i < instructions.length; i++) {
        const steps = parseInt(instructions[i].slice(1));
        facing = turn(facing, instructions[i][0]);
        if (stop_on_visited) {
            for (let j = 0; j < steps; j++) {
                pos.iadd(moves[facing]);
                let k = pos.key();
                if (visited.has(k))
                    break outer_loop;
                visited.add(k);
            }
        }
        else {
            pos.iadd(moves[facing].mul(steps));
        }
    }
    return pos;
}
function solve_part_one(day_input) {
    let pos = walk(day_input[0].split(", "));
    return pos.distanceTo(common_1.Position.Origin);
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    let pos = walk(day_input[0].split(", "), true);
    return pos.distanceTo(common_1.Position.Origin);
}
exports.solve_part_two = solve_part_two;
