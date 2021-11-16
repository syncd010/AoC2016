import { mod } from "./common";

interface Spec {
    id: number,
    positions: number,
    start_time: number,
    start_pos: number,
}

function parse_input(input: string[]): Spec[] {
    const re = /Disc #(\d+) has (\d+) positions; at time=(\d+), it is at position (\d+)./
    return input.map((line) => {
        let m = line.match(re);
        return {
            id: parseInt(m[1]), positions: parseInt(m[2]),
            start_time: parseInt(m[3]), start_pos: parseInt(m[4])
        };
    })
}

export function solve_part_one(day_input: string[]): number {
    let discs = parse_input(day_input);
    // Get the disc with the maximum step and the first time it is at position 0
    let max_step_disc = discs.reduce((a, b) => (a.positions > b.positions) ? a : b),
        first_t_at_0 = mod(max_step_disc.positions - max_step_disc.start_pos - max_step_disc.id, max_step_disc.positions);
    // Loop with max step and check if all discs are at position 0 at the time
    for (let t = first_t_at_0; ; t += max_step_disc.positions) {
        if (discs.every((d) => (d.start_pos + d.id + t) % d.positions == 0))
            return t;
    }
}

export function solve_part_two(day_input: string[]): number {
    day_input.push("Disc #7 has 11 positions; at time=0, it is at position 0.")
    return solve_part_one(day_input);
}