"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const common_1 = require("./common");
function parse(input) {
    let res = [], re = /\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/;
    for (let line of input) {
        let m = line.match(re);
        if (m) {
            res.push({
                x: parseInt(m[1]), y: parseInt(m[2]),
                used: parseInt(m[4]), avail: parseInt(m[5]), size: parseInt(m[3])
            });
        }
    }
    return res;
}
function solve_part_one(day_input) {
    let nodes = parse(day_input), count = 0;
    for (let i = 0; i < nodes.length; i++)
        for (let j = 0; j < nodes.length; j++)
            count += ((i != j) && (nodes[i].used > 0) && (nodes[i].used <= nodes[j].avail)) ? 1 : 0;
    return count;
}
exports.solve_part_one = solve_part_one;
function successors(from) {
    const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    let res = [];
    for (let d of dirs) {
        let y = from.empty_loc[0] + d[0], x = from.empty_loc[1] + d[1];
        if (y < 0 || y >= from.grid_dim[0] || x < 0 || x >= from.grid_dim[1] ||
            from.unavailable.find(v => v[0] == y && v[1] == x))
            continue;
        res.push({
            grid_dim: from.grid_dim,
            empty_loc: [y, x],
            data_loc: (from.data_loc[0] == y && from.data_loc[1] == x) ? from.empty_loc : from.data_loc,
            unavailable: from.unavailable,
        });
    }
    return res;
}
function is_goal(s) {
    return s.data_loc[0] == 0 && s.data_loc[1] == 0;
}
function state_key(s) {
    return s.empty_loc.toString() + "-" + s.data_loc.toString();
}
function solve_part_two(day_input) {
    let nodes = parse(day_input), min_sz = nodes.reduce((p, n) => Math.min(p, n.size), nodes[0].size), height = nodes.reduce((p, n) => Math.max(p, n.y), 0) + 1, width = nodes.reduce((p, n) => Math.max(p, n.x), 0) + 1, empty_loc, unavailable = [];
    for (let n of nodes) {
        if (n.used == 0)
            empty_loc = [n.y, n.x];
        if (n.used > min_sz)
            unavailable.push([n.y, n.x]);
    }
    let initial = {
        grid_dim: [height, width],
        empty_loc: empty_loc,
        data_loc: [0, width - 1],
        unavailable: unavailable
    };
    let res = (0, common_1.breadth_first_search)(initial, successors, is_goal, state_key);
    return res.length - 1;
}
exports.solve_part_two = solve_part_two;
