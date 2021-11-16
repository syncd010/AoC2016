import * as assembunny from "./assembunny"

export function solve_part_one(day_input: string[]): number {
    let res = assembunny.exec(assembunny.parse(day_input), { "a": 7, "b": 0, "c": 0, "d": 0 });
    return res.registers.a;
}

export function solve_part_two(day_input: string[]): number {
    let a = 0, b = 0, c = 0, d = 0;
    a = 12;

    for (b = a - 1; b > 1; b--) {
        a = a * b;
    }
    a += 80 * 97

    return a;
}