import { md5 } from "./md5"
import { breadth_first_search, clamp } from "./common"

interface State {
    loc: number[];
    input: string;
    path: string;
}

const maze_dim = [4, 4]

function successors(s: State): State[] {
    const dirs = [["U", [0, -1]], ["D", [0, 1]], ["L", [-1, 0]], ["R", [1, 0]]];
    const open = "bcdef";

    let hash = md5(s.input + s.path);
    let res = [];
    for (let i = 0; i < dirs.length; i++) {
        let dir = dirs[i][0] as string, step = dirs[i][1] as number[];
        let x = s.loc[0] + step[0], y = s.loc[1] + step[1];
        // Check bounds
        if (clamp(x, 0, maze_dim[0] - 1) != x || clamp(y, 0, maze_dim[1] - 1) != y) continue;
        if (open.includes(hash.charAt(i)))
            res.push({ loc: [x, y], input: s.input, path: s.path + dir })
    }
    return res;
}

function is_goal(s: State): boolean {
    return s.loc[0] == maze_dim[0] - 1 && s.loc[1] == maze_dim[1] - 1;
}

function state_key(s: State): string {
    return s.path;
}

export function solve_part_one(day_input: string[]): string {
    let initial = { loc: [0, 0], input: day_input[0], path: "" };
    let path = breadth_first_search(initial, successors, is_goal, state_key)
    return (path == null) ? "Null" : path[0].path;
}

// Explore all paths, breadth-first 
export function all_paths_search<T>(start: T, successors: (state: T) => T[], is_goal: (state: T) => boolean): T[] {
    let frontier: T[] = [start];
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


export function solve_part_two(day_input: string[]): number {
    let initial = { loc: [0, 0], input: day_input[0], path: "" };
    let goals = all_paths_search(initial, successors, is_goal)
    return goals.reduce((p, c) => Math.max(p, c.path.length), 0);
}