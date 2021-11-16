"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = exports.solve = void 0;
const common_1 = require("./common");
function get_successors_fn(grid) {
    return function successors(from) {
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        let res = [];
        for (let d of dirs) {
            let y = from.current[0] + d[0], x = from.current[1] + d[1];
            if (grid[y][x] == "#")
                continue;
            let new_state = { current: [y, x], collected: from.collected.slice() };
            if (grid[y][x] != "." && grid[y][x] != "0") {
                let n = parseInt(grid[y][x]);
                if (!new_state.collected.includes(n))
                    new_state.collected.push(n);
            }
            res.push(new_state);
        }
        return res;
    };
}
function get_first_goal_fn(total_to_collect, grid) {
    return function is_goal(s) {
        return s.collected.length == total_to_collect;
    };
}
function get_second_goal_fn(total_to_collect, grid) {
    return function is_goal(s) {
        return s.collected.length == total_to_collect && grid[s.current[0]][s.current[1]] == "0";
    };
}
function state_key(s) {
    return s.current.toString() + s.collected.toString();
}
function solve(grid, goal_generator_fn) {
    let total_collected = grid.reduce((p, row) => p + Array.from(row.matchAll(/\d/g)).length, 0) - 1, initial = {
        current: grid.reduce((p, row, idx) => (p.length == 0) && row.includes("0") ? [idx, row.indexOf("0")] : p, []),
        collected: [],
    };
    let res = (0, common_1.breadth_first_search)(initial, get_successors_fn(grid), goal_generator_fn(total_collected, grid), state_key);
    return res.length - 1;
}
exports.solve = solve;
function solve_part_one(day_input) {
    return solve(day_input, get_first_goal_fn);
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    return solve(day_input, get_second_goal_fn);
}
exports.solve_part_two = solve_part_two;
