import * as assembunny from "./assembunny"

export function solve_part_one(day_input: string[]): number {
    let res = assembunny.exec(assembunny.parse(day_input));
    return res.registers.a;
}

export function solve_part_two(day_input: string[]): number {
    let res = assembunny.exec(assembunny.parse(day_input), { "a": 0, "b": 0, "c": 1, "d": 0 });
    return res.registers.a;
}