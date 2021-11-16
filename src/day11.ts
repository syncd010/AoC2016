import { power_set, breadth_first_search } from "./common"

interface State {
    elevator_loc: number,
    moves_till_here: number;
    // Each positions is the floor of one element, microchips on odd indices, generators on even indices. 
    elements_loc: number[];
}

var max_floor = 3;

function parse(input: string[]): State {
    const re_floor = /The (\w+) floor contains/, re_components = / a (\w+)(?:-compatible)? (\w+)/g;
    let elements = {}, elements_loc = [];
    for (let i = 0; i < input.length; i++) {
        for (let elem of input[i].matchAll(re_components)) {
            if (!(elem[1] in elements)) elements[elem[1]] = Object.keys(elements).length * 2;
            elements_loc[elements[elem[1]] + (elem[2] == "microchip" ? 0 : 1)] = i;
        }
    }
    max_floor = input.length - 1;
    return { elevator_loc: 0, moves_till_here: 0, elements_loc: elements_loc };
}

/**
 * Whether this is a final state, where all components are on the last floor
 */
function is_final_state(state: State): boolean {
    return state.elevator_loc == max_floor && state.elements_loc.every(f => f == max_floor);
}

/**
 * A floor is valid if all microchips are paired, or there are no generators there
 */
function is_valid_floor(elements_loc: number[], floor_nr: number): boolean {
    let all_chips_paired = true, generators_on_floor = false;
    for (let i = 1; i < elements_loc.length; i += 2)
        generators_on_floor ||= (elements_loc[i] == floor_nr);
    for (let i = 0; i < elements_loc.length; i += 2)
        all_chips_paired &&= (elements_loc[i] != floor_nr) || (elements_loc[i + 1] == floor_nr)
    return all_chips_paired || !generators_on_floor;
}

/**
 * Generates (n 1) and (n 2) combinations of the items passed.
 */
function gen_combinations(items: number[]): number[][] {
    // return items.map(v => [v]).concat(Array.from(power_set(items, 2)).filter(v => v.length > 0))
    let singles = items.map(v => [v]),
        doubles = items.map((v, i) => items.slice(i + 1).map(u => [v, u])).flat();
    return [...singles, ...doubles];
}

/**
 * Generates all the states achievable from the original
 */
function reachable_states(from: State): State[] {
    const loc = from.elevator_loc;
    let res = [];
    // We can go up or down
    for (let dir of [-1, 1]) {
        if (loc + dir < 0 || loc + dir > max_floor) continue;
        // Don't move down if all previous floors are already empty
        if (dir == -1 && from.elements_loc.every(f => f >= loc)) continue;

        // Get the combinations of the elements on the current floor (combinations of its indexes) 
        // and try to to move each one to see if it's valid
        let current_floor_indexes = [];
        for (let i = 0; i < from.elements_loc.length; i++)
            if (from.elements_loc[i] == loc)
                current_floor_indexes.push(i);

        for (let indexes of gen_combinations(current_floor_indexes)) {
            // if (indexes.length == 0) continue;
            let new_locations = Array.from(from.elements_loc);
            for (let i of indexes) new_locations[i] += dir;
            // If the generated floors are valid, yield this state
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

/**
 * Returns a key that can identify this state.
 * Note: to prune states from the tree, the *order* of the elements isn't relevant, just their floor
 *  position, so that state (f1,f2;f3,f4), in which element 1 has its microchip/generator on floors 
 * f1,f2 and element 2 on f3,f4, is the same as state (f3,f4;f1,f2) in which element 1 has its 
 * microchip/generator on floors f3,f4 and element 2 on f1,f2. 
 * This is valid because if we've reached the first state and have it queued to be explored, 
 * there's no point in expanding the second, as it would generate the same set of moves to reach 
 * the end as the first, which is already being considered. This prunes the search space enormously
 */
function state_key(state: State): string {
    let pairs: string[] = []
    for (let i = 0; i < state.elements_loc.length / 2; i++)
        pairs[i] = state.elements_loc.slice(i * 2, i * 2 + 2).join(",")
    return pairs.sort().join(";") + "|" + state.elevator_loc;
}

// /**
//  * BFS search
//  */
// function search(initial_state: State) {
//     let frontier: State[] = [initial_state];
//     let seen = {};
//     while (frontier.length > 0) {
//         let current = frontier.shift();
//         for (let next of reachable_states(current)) {
//             let next_key = state_key(next)
//             if (next_key in seen) continue;
//             if (is_final_state(next)) {
//                 // console.log("Visited: ", Object.keys(seen).length);
//                 return next.moves_till_here;
//             }
//             // Save the parent so we can reconstruct the path if desired
//             seen[next_key] = current;
//             frontier.push(next);
//         }
//     }
//     return -1;
// }

/**
 * BFS search
 */
function search(initial_state: State) {
    let path = breadth_first_search(initial_state, reachable_states, is_final_state, state_key)
    return (path == null) ? -1 : path.length - 1;
}

export function solve_part_one(day_input: string[]): number {
    return search(parse(day_input));
}

export function solve_part_two(day_input: string[]): number {
    day_input[0] = "The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, a strontium generator, a elerium generator, a elerium-compatible microchip, a dilithium generator, and a dilithium-compatible microchip.";
    return search(parse(day_input));
}
