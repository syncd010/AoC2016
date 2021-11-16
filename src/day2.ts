import { clamp, Position } from "./common"

const moves = {
    "U": new Position(0, -1),
    "R": new Position(1, 0),
    "D": new Position(0, 1),
    "L": new Position(-1, 0),
}

export function solve_part_one(day_input: string[]): number {
    let pos = new Position(1, 1)
    let code = 0;
    for (let i = 0; i < day_input.length; i++) {
        for (let j = 0; j < day_input[i].length; j++) {
            pos.iadd(moves[day_input[i][j]]);
            pos.x = clamp(pos.x, 0, 2);
            pos.y = clamp(pos.y, 0, 2);
        }
        code = code * 10 + (pos.x + 1 + (pos.y) * 3);
    }

    return code;
}

export function solve_part_two(day_input: string[]): string {
    let keypad = ["       ", "   1   ", "  234  ", " 56789 ", "  ABC  ", "   D   ", "       "]
    let pos = new Position(1, 3)
    let code = "";
    for (let i = 0; i < day_input.length; i++) {
        for (let j = 0; j < day_input[i].length; j++) {
            let new_pos = pos.add(moves[day_input[i][j]]);
            if (keypad[new_pos.y][new_pos.x] != " ")
                pos = new_pos;
        }
        code += keypad[pos.y][pos.x];
    }

    return code;
}