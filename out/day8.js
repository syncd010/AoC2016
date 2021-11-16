"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const common_1 = require("./common");
function to_string(screen) {
    return screen.map(line => line.map(v => (v == 1) ? "#" : ".").join("")).join("\n");
}
var res_screen;
function solve_part_one(day_input) {
    const nrows = 6, ncols = 50;
    let screen = Array.from(Array(nrows), _ => Array(ncols).fill(0));
    for (let line of day_input) {
        let m_rect = line.match(/rect (\d+)x(\d+)/), m_row = line.match(/rotate row y=(\d+) by (\d+)/), m_column = line.match(/rotate column x=(\d+) by (\d+)/);
        let old_row = Array(ncols).fill(0), old_column = Array(nrows).fill(0);
        if (m_rect != null) {
            let width = parseInt(m_rect[1]), height = parseInt(m_rect[2]);
            for (let y = 0; y < height; y++)
                screen[y].fill(1, 0, width);
        }
        else if (m_row != null) {
            let r = parseInt(m_row[1]), by = parseInt(m_row[2]);
            for (let i = 0; i < ncols; i++)
                old_row[i] = screen[r][i];
            for (let i = 0; i < ncols; i++)
                screen[r][(0, common_1.mod)(i + by, ncols)] = old_row[i];
        }
        else if (m_column != null) {
            let c = parseInt(m_column[1]), by = parseInt(m_column[2]);
            for (let i = 0; i < nrows; i++)
                old_column[i] = screen[i][c];
            for (let i = 0; i < nrows; i++)
                screen[(0, common_1.mod)(i + by, nrows)][c] = old_column[i];
        }
    }
    res_screen = screen;
    let sum = (a, b) => a + b;
    return screen.map(v => v.reduce(sum)).reduce(sum);
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    return "\n" + to_string(res_screen) + "\n";
}
exports.solve_part_two = solve_part_two;
