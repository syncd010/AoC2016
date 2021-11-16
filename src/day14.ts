import { md5 } from "./md5"

/**
 * Returns which 3 in a row and 5 in a row characters exist in str
 * @param str string
 * @returns tuple with (first 3 in a row character, array of 5 in a row characters found)
 */
function chars_in_a_row(str: string): [string, string[]] {
    let c3 = "", c5 = [], n = 1;
    for (let i = 1; i < str.length; i++) {
        n = (str.charAt(i) == str.charAt(i - 1)) ? n + 1 : 1;
        if (n == 3 && c3 == "") c3 = str.charAt(i);
        if (n == 5) c5.push(str.charAt(i));
    }
    return [c3, c5];
}

function valid_keys(salt: string, additional_hash_count = 0): number[] {
    let potential_keys: Map<string, number> = new Map(), valid_keys: number[] = [];
    for (let idx = 0; ; idx++) {
        let hash: string = md5(salt + idx.toString());
        for (let i = 0; i < additional_hash_count; i++)
            hash = md5(hash);
        let [c3, c5] = chars_in_a_row(hash);
        // Add 3 in a row chars to potential keys
        if (c3 != "") {
            if (!(c3 in potential_keys)) potential_keys[c3] = [];
            potential_keys[c3].push(idx);
        }
        // For each 5 in a row found, check if there's a potential 3 in a row key, and add it if 
        // it's within 1000 places of the current index
        for (let c of c5.filter(v => v in potential_keys)) {
            valid_keys = valid_keys.concat(potential_keys[c].filter(v => idx - v > 0 && idx - v < 1001));
        }
        if (valid_keys.length >= 64) break;
    }
    valid_keys.sort((a, b) => a - b);
    return valid_keys;
}

export function solve_part_one(day_input: string[]): number {
    return valid_keys(day_input[0])[63];
}

export function solve_part_two(day_input: string[]): number {
    return valid_keys(day_input[0], 2016)[63];
}