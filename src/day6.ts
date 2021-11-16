import { transpose2D, count_chars } from "./common"

export function solve_part_one(day_input: string[]): string {
    // Note to self: don't do this where it matters
    return transpose2D(day_input.map(l => l.split("")))
        .map(l => count_chars(l))
        .map(cnt => Object.keys(cnt)
            .sort((a, b) => (cnt[b] - cnt[a]) * 26 + (a.charCodeAt(0) - b.charCodeAt(0)))[0])
        .join("");
}

export function solve_part_two(day_input: string[]): string {
    return transpose2D(day_input.map(l => l.split("")))
        .map(l => count_chars(l))
        .map(cnt => Object.keys(cnt)
            .sort((a, b) => (cnt[a] - cnt[b]) * 26 + (a.charCodeAt(0) - b.charCodeAt(0)))[0])
        .join("");
}