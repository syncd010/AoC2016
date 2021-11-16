"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const common_1 = require("./common");
function parse_input(input) {
    const re = /Disc #(\d+) has (\d+) positions; at time=(\d+), it is at position (\d+)./;
    return input.map((line) => {
        let m = line.match(re);
        return {
            id: parseInt(m[1]), positions: parseInt(m[2]),
            start_time: parseInt(m[3]), start_pos: parseInt(m[4])
        };
    });
}
function solve_part_one(day_input) {
    let discs = parse_input(day_input);
    let max_step_disc = discs.reduce((a, b) => (a.positions > b.positions) ? a : b), first_t_at_0 = (0, common_1.mod)(max_step_disc.positions - max_step_disc.start_pos - max_step_disc.id, max_step_disc.positions);
    for (let t = first_t_at_0;; t += max_step_disc.positions) {
        if (discs.every((d) => (d.start_pos + d.id + t) % d.positions == 0))
            return t;
    }
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    day_input.push("Disc #7 has 11 positions; at time=0, it is at position 0.");
    return solve_part_one(day_input);
}
exports.solve_part_two = solve_part_two;
