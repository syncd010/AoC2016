"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
const common_1 = require("./common");
var max_floor = 3;
function parse(input) {
    const re_floor = /The (\w+) floor contains/, re_components = / a (\w+)(?:-compatible)? (\w+)/g;
    let elements = {}, elements_loc = [];
    for (let i = 0; i < input.length; i++) {
        for (let elem of input[i].matchAll(re_components)) {
            if (!(elem[1] in elements))
                elements[elem[1]] = Object.keys(elements).length * 2;
            elements_loc[elements[elem[1]] + (elem[2] == "microchip" ? 0 : 1)] = i;
        }
    }
    max_floor = input.length - 1;
    return { elevator_loc: 0, moves_till_here: 0, elements_loc: elements_loc };
}
function is_final_state(state) {
    return state.elevator_loc == max_floor && state.elements_loc.every(f => f == max_floor);
}
function is_valid_floor(elements_loc, floor_nr) {
    let all_chips_paired = true, generators_on_floor = false;
    for (let i = 1; i < elements_loc.length; i += 2)
        generators_on_floor ||= (elements_loc[i] == floor_nr);
    for (let i = 0; i < elements_loc.length; i += 2)
        all_chips_paired &&= (elements_loc[i] != floor_nr) || (elements_loc[i + 1] == floor_nr);
    return all_chips_paired || !generators_on_floor;
}
function gen_combinations(items) {
    let singles = items.map(v => [v]), doubles = items.map((v, i) => items.slice(i + 1).map(u => [v, u])).flat();
    return [...singles, ...doubles];
}
function reachable_states(from) {
    const loc = from.elevator_loc;
    let res = [];
    for (let dir of [-1, 1]) {
        if (loc + dir < 0 || loc + dir > max_floor)
            continue;
        if (dir == -1 && from.elements_loc.every(f => f >= loc))
            continue;
        let current_floor_indexes = [];
        for (let i = 0; i < from.elements_loc.length; i++)
            if (from.elements_loc[i] == loc)
                current_floor_indexes.push(i);
        for (let indexes of gen_combinations(current_floor_indexes)) {
            let new_locations = Array.from(from.elements_loc);
            for (let i of indexes)
                new_locations[i] += dir;
            if (is_valid_floor(new_locations, loc) &&
                is_valid_floor(new_locations, loc + dir)) {
                res.push({
                    elevator_loc: loc + dir,
                    moves_till_here: from.moves_till_here + 1,
                    elements_loc: new_locations,
                });
            }
        }
    }
    return res;
}
function state_key(state) {
    let pairs = [];
    for (let i = 0; i < state.elements_loc.length / 2; i++)
        pairs[i] = state.elements_loc.slice(i * 2, i * 2 + 2).join(",");
    return pairs.sort().join(";") + "|" + state.elevator_loc;
}
function search(initial_state) {
    let path = (0, common_1.breadth_first_search)(initial_state, reachable_states, is_final_state, state_key);
    return (path == null) ? -1 : path.length - 1;
}
function solve_part_one(day_input) {
    return search(parse(day_input));
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    day_input[0] = "The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, a strontium generator, a elerium generator, a elerium-compatible microchip, a dilithium generator, and a dilithium-compatible microchip.";
    return search(parse(day_input));
}
exports.solve_part_two = solve_part_two;
