import { mod, Position } from "./common"

// Directions to which Left/Right turn
const dirs = ["N", "E", "S", "W"]
function turn(facing: string, dir: string): string {
    const idx = (dir == "R") ? +1 : -1;
    return dirs[mod(dirs.indexOf(facing) + idx, dirs.length)]
}

// Move on each direction
const moves = {
    "N": new Position(0, 1),
    "E": new Position(1, 0),
    "S": new Position(0, -1),
    "W": new Position(-1, 0),
}

function walk(instructions: string[], stop_on_visited = false): Position {
    let facing = "N"
    let pos = new Position(0, 0);
    let visited: Set<string> = new Set([pos.key()]);
    outer_loop:
    for (let i = 0; i < instructions.length; i++) {
        const steps = parseInt(instructions[i].slice(1));
        facing = turn(facing, instructions[i][0]);
        if (stop_on_visited) {
            for (let j = 0; j < steps; j++) {
                pos.iadd(moves[facing])
                let k = pos.key();
                if (visited.has(k)) break outer_loop;
                visited.add(k);
            }
        } else {
            pos.iadd(moves[facing].mul(steps))
        }
    }
    return pos
}

export function solve_part_one(day_input: string[]): number {
    let pos = walk(day_input[0].split(", "))
    return pos.distanceTo(Position.Origin)
}

export function solve_part_two(day_input: string[]): number {
    let pos = walk(day_input[0].split(", "), true)
    return pos.distanceTo(Position.Origin)
}