import * as assembunny from "./assembunny"

export function solve_part_one(day_input: string[]): string {
    let a = 0;
    for (a = 0; ; a++) {
        let bin = (a + 365 * 7).toString(2), alternating = true;
        for (let i = 0; i < bin.length; i++)
            alternating &&= bin[i] != bin[(i + 1) % bin.length]
        if (alternating) break;
    }

    let res = assembunny.exec(assembunny.parse(day_input), { "a": a, "b": 0, "c": 0, "d": 0 }, 100000);
    return a.toString() + " - " + (a + 365 * 7).toString() + " (" + (a + 365 * 7).toString(2) + ") " + res.out;
}

export function solve_part_two(day_input: string[]): number {
    return -1;
}