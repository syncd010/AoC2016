import { mod } from "./common"

// Most significant bit position
function msb_pos(n: number): number {
    let r = 0;
    while (n >>= 1)
        r++;
    return r;
}

export function solve_part_one(day_input: string[]): number {
    let n = parseInt(day_input[0]);
    // Clear msb, shift left 1 and add 1
    return ((n & ~(1 << msb_pos(n))) << 1) | 1;
}

function naive_part_two(n: number): number {
    let survivors = Array(n).fill(0).map((_, i) => i + 1),
        start = 0;
    while (survivors.length > 1) {
        let other = mod(start + Math.floor(survivors.length / 2), survivors.length);
        survivors.splice(other, 1);
        start = mod((other > start) ? start + 1 : start, survivors.length);
    }
    return survivors[0];
}

function fast_part_two(n: number): number {
    let survivors = Array(n).fill(0).map((_, i) => i + 1),
        idx = 0;
    while (survivors.length > 2) {
        let next: number[] = [],
            initial_idx = idx,
            mid = Math.floor(survivors.length / 2);
        // First idx to survive, depends on the array length
        if (mod(survivors.length, 2) == 0)
            idx += mid + 2;
        else if (mod(survivors.length, 3) == 2)
            idx += mid + 4;
        else
            idx += mid + 1;
        idx = mod(idx, survivors.length);

        // Get every 3rd element, until we have 1/3 of the initial elements
        while (next.length < Math.floor(survivors.length / 3)) {
            next.push(survivors[idx]);
            idx = mod((idx + 3), survivors.length);
        }
        // On each of these loops, the element we're we stop depends on the array length:
        // We've stopped on the last element if length % 3 == 0, the first if length %3 == 1 or
        // the second if length %3 == 2. Add the initial_idx because the initial array isn't sorted
        let final_idx = mod(survivors.length - 1 + mod(survivors.length, 3) + initial_idx, survivors.length);
        // Find the element we're we stopped in the next array and add 1 
        idx = next.findIndex(v => v == survivors[final_idx]);
        idx = mod(idx + 1, next.length);
        survivors = next;
    }
    return survivors[idx];
}

export function solve_part_two(day_input: string[]): number {
    let n = parseInt(day_input[0]);
    for (n = 3; n < 200; n++) {
        console.log("Naive solution for ", n, " is ", naive_part_two(n));
        if (naive_part_two(n) != fast_part_two(n)) {
            console.log("Naive solution for ", n, " is ", naive_part_two(n));
            console.log("Fast solution for ", n, " is ", fast_part_two(n));
        }
    }
    return fast_part_two(n);
}