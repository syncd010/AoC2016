import { range } from "./common";
function is_final_state(floors) {
    return floors.every((f, idx) => f.length == 0 || idx == floors.length - 1);
}
function is_valid_floor(floor) {
    let microchips = floor.filter(v => v.type == "microchip"), generators = floor.filter(v => v.type == "generator");
    return (generators.length == 0) ||
        microchips.every(m => generators.find(g => g.elem == m.elem) != undefined);
}
function gen_combinations(items) {
    return [].concat(items.map(v => [v]), items.flatMap((v, i) => items.slice(i + 1).map(u => [v, u])));
}
function deep_copy_floors(src) {
    return src.map(f => f.map(c => c));
}
function get_estimate_till_end(floors) {
    return floors.map((f, idx) => f.length * (floors.length - idx - 1)).reduce((a, b) => a + b);
}
function* gen_next_states(from) {
    const dirs = from.elevator_location == 0 ? [1] : from.elevator_location == from.floors.length - 1 ? [-1] : [-1, 1];
    const loc = from.elevator_location;
    for (let dir of dirs) {
        for (let indexes of gen_combinations(range(0, from.floors[loc].length - 1))) {
            let new_floors = deep_copy_floors(from.floors);
            new_floors[loc + dir].push(...new_floors[loc].filter((_, i) => indexes.includes(i)));
            new_floors[loc] = new_floors[loc].filter((_, i) => !indexes.includes(i));
            if (is_valid_floor(new_floors[loc]) &&
                is_valid_floor(new_floors[loc + dir])) {
                yield {
                    elevator_location: loc + dir,
                    moves_till_here: from.moves_till_here + 1,
                    estimate_till_end: get_estimate_till_end(new_floors),
                    floors: new_floors,
                };
            }
        }
    }
    return null;
}
function is_visited(current, visited_states) {
    let has_component = function (which, floor) {
        return floor.includes(which);
    };
    let found = visited_states.find((visited) => (current.elevator_location == visited.elevator_location) &&
        current.floors.every((_, i) => ((current.floors[i].length == visited.floors[i].length) &&
            (current.floors[i].every(component => has_component(component, visited.floors[i]))))));
    return found != undefined;
}
export function solve_part_one(day_input) {
    const number_map = { "first": 0, "second": 1, "third": 2, "fourth": 3 };
    let floors = [];
    for (let line of day_input) {
        let m_floor = line.match(/The (\w+) floor contains/);
        let m_contents = Array.from(line.matchAll(/ a (\w+)(?:-compatible)? (\w+)/g));
        floors[number_map[m_floor[1]]] = m_contents.map(m => { return { elem: m[1], type: m[2] }; });
    }
    let frontier = [{ elevator_location: 0, moves_till_here: 0, estimate_till_end: get_estimate_till_end(floors), floors }];
    let visited = [];
    let res;
    loop: do {
        console.log(frontier.length, visited.length);
        let current = frontier.reduce((p, c) => (p.moves_till_here + p.estimate_till_end) < (c.moves_till_here + c.estimate_till_end) ? p : c);
        frontier.splice(frontier.indexOf(current), 1);
        if (is_visited(current, visited)) {
            continue;
        }
        visited.push(current);
        for (let next of gen_next_states(current)) {
            frontier.push(next);
            if (is_final_state(current.floors)) {
                res = current;
                break loop;
            }
        }
    } while (frontier.length > 0);
    return res.moves_till_here;
}
export function solve_part_two(day_input) {
    return -1;
}
