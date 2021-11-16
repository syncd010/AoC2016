"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = exports.solve_part_one_old = void 0;
function get_resulting_string(str) {
    let res = "";
    let idx = 0, line = str;
    while (idx < line.length) {
        let m = line.substr(idx).match(/\((\d+)x(\d+)\)/);
        if (m == null) {
            res += line.substr(idx);
            idx = line.length;
        }
        else {
            res += line.substr(idx, m.index);
            idx += m.index + m[0].length;
            for (let rep = 0; rep < parseInt(m[2]); rep++)
                res += line.substr(idx, parseInt(m[1]));
            idx += parseInt(m[1]);
        }
    }
    return res;
}
function solve_part_one_old(day_input) {
    let res = [];
    for (let i = 0; i < day_input.length; i++) {
        res[i] = get_resulting_string(day_input[i]);
    }
    return res.map(v => v.length).reduce((a, b) => a + b);
}
exports.solve_part_one_old = solve_part_one_old;
function get_length(str, part) {
    let m = str.match(/\((\d+)x(\d+)\)/);
    if (m == null) {
        return str.length;
    }
    else {
        let rep = str.substr(m.index + m[0].length, parseInt(m[1])), rest = str.substr(m.index + m[0].length + parseInt(m[1]));
        if (part == 1)
            return m.index + parseInt(m[2]) * rep.length + get_length(rest, part);
        else
            return m.index + parseInt(m[2]) * get_length(rep, part) + get_length(rest, part);
    }
}
function solve_part_one(day_input) {
    return day_input.map(v => get_length(v, 1)).reduce((a, b) => a + b);
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    return day_input.map(v => get_length(v, 2)).reduce((a, b) => a + b);
}
exports.solve_part_two = solve_part_two;
