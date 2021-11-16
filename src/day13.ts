import { breadth_first_search } from "./common";

function is_goal(state: number[]): boolean {
    // return state[0] == 7 && state[1] == 4;
    return state[0] == 31 && state[1] == 39;
}

function state_key(state: number[]): string {
    return state.join(";");
}

function get_successor_fn(fav_number: number) {
    let successors = (state: number[]): number[][] => {
        let neighbors = [-1, 1].map((v) => [state[0] + v, state[1]])
            .concat([-1, 1].map((v) => [state[0], state[1] + v]));
        return neighbors.filter((n) => {
            if (n[0] < 0 || n[1] < 0) return 0;
            let val = n[0] * n[0] + 3 * n[0] + 2 * n[0] * n[1] + n[1] + n[1] * n[1] + fav_number;
            let val_bin = val.toString(2);
            let res = 0;
            for (let i = 0; i < val_bin.length; i++)
                res += (val_bin.at(i) == "1")? 1 : 0;
            return res % 2 == 0;
        });
    }
    return successors;
}

export function solve_part_one(day_input: string[]): number {
    let start = [1, 1],
        fav_number = parseInt(day_input[0]);

    let path = breadth_first_search(start, get_successor_fn(fav_number), is_goal, state_key)
    return (path == null) ? -1 : path.length - 1;
}

// Count visited states up to a maximum depth
// Changed the DFS algorithm to count the states and keep going until depth is reached
export function count_states<T>(start: T, successors: (state: T) => T[], max_depth: number, state_key: (state: T) => string): number {
    let frontier = [ [start, 0] ];
    let explored = { };
    explored[state_key(start)] = true;
    let count = 1;
    while (frontier.length > 0) {
        let current = frontier.shift();
        if (current[1] >= max_depth) break;
        for (let next of successors(current[0] as T)) {
            let next_key = state_key(next)
            if (next_key in explored) continue;
            explored[next_key] = true;
            frontier.push([next, current[1] as number + 1]);
        }
    }
    return Object.keys(explored).length;
}

export function solve_part_two(day_input: string[]): number {
    let start = [1, 1], fav_number = parseInt(day_input[0]);
    return count_states(start, get_successor_fn(fav_number), 50, state_key);
}