import { breadth_first_search, clamp } from "./common"

interface State {
    current: number[],
    collected: number[]
}

function get_successors_fn(grid: string[]) {
    return function successors(from: State): State[] {
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        let res: State[] = [];
        for (let d of dirs) {
            let y = from.current[0] + d[0], x = from.current[1] + d[1];
            if (grid[y][x] == "#") continue;
            let new_state = { current: [y, x], collected: from.collected.slice() }
            if (grid[y][x] != "." && grid[y][x] != "0") {
                let n = parseInt(grid[y][x]);
                if (!new_state.collected.includes(n))
                    new_state.collected.push(n);
            }
            res.push(new_state);
        }
        return res;
    }
}

function get_first_goal_fn(total_to_collect: number, grid: string[]) {
    return function is_goal(s: State): boolean {
        return s.collected.length == total_to_collect;
    }
}

function get_second_goal_fn(total_to_collect: number, grid: string[]) {
    return function is_goal(s: State): boolean {
        return s.collected.length == total_to_collect && grid[s.current[0]][s.current[1]] == "0";
    }
}

function state_key(s: State): string {
    return s.current.toString() + s.collected.toString();
}

export function solve(grid: string[], goal_generator_fn): number {
    let total_collected = grid.reduce((p, row) => p + Array.from(row.matchAll(/\d/g)).length, 0) - 1,
        initial: State = {
            current: grid.reduce((p, row, idx) => (p.length == 0) && row.includes("0") ? [idx, row.indexOf("0")] : p, []),
            collected: [],
        };
    let res = breadth_first_search(initial, get_successors_fn(grid), goal_generator_fn(total_collected, grid), state_key);
    return res.length - 1;
}

export function solve_part_one(day_input: string[]): number {
    return solve(day_input, get_first_goal_fn);
}

export function solve_part_two(day_input: string[]): number {
    return solve(day_input, get_second_goal_fn);
}