"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.all_paths_search = exports.solve_part_one = void 0;
const md5_1 = require("./md5");
const common_1 = require("./common");
const maze_dim = [4, 4];
function successors(s) {
    const dirs = [["U", [0, -1]], ["D", [0, 1]], ["L", [-1, 0]], ["R", [1, 0]]];
    const open = "bcdef";
    let hash = (0, md5_1.md5)(s.input + s.path);
    let res = [];
    for (let i = 0; i < dirs.length; i++) {
        let dir = dirs[i][0], step = dirs[i][1];
        let x = s.loc[0] + step[0], y = s.loc[1] + step[1];
        if ((0, common_1.clamp)(x, 0, maze_dim[0] - 1) != x || (0, common_1.clamp)(y, 0, maze_dim[1] - 1) != y)
            continue;
        if (open.includes(hash.charAt(i)))
            res.push({ loc: [x, y], input: s.input, path: s.path + dir });
    }
    return res;
}
function is_goal(s) {
    return s.loc[0] == maze_dim[0] - 1 && s.loc[1] == maze_dim[1] - 1;
}
function state_key(s) {
    return s.path;
}
function solve_part_one(day_input) {
    let initial = { loc: [0, 0], input: day_input[0], path: "" };
    let path = (0, common_1.breadth_first_search)(initial, successors, is_goal, state_key);
    return (path == null) ? "Null" : path[0].path;
}
exports.solve_part_one = solve_part_one;
function all_paths_search(start, successors, is_goal) {
    let frontier = [start];
    let goal_paths = [];
    while (frontier.length > 0) {
        let current = frontier.shift();
        for (let next of successors(current)) {
            if (is_goal(next))
                goal_paths.push(next);
            else
                frontier.push(next);
        }
    }
    return goal_paths;
}
exports.all_paths_search = all_paths_search;
function solve_part_two(day_input) {
    let initial = { loc: [0, 0], input: day_input[0], path: "" };
    let goals = all_paths_search(initial, successors, is_goal);
    return goals.reduce((p, c) => Math.max(p, c.path.length), 0);
}
exports.solve_part_two = solve_part_two;
