
function has_abba(str: string): boolean {
    let in_brackets = false, is_valid = false;
    for (let i = 0; i < str.length - 3; i++) {
        if (str[i] == "[" || str[i] == "]") {
            in_brackets = (str[i] == "[");
        } else if (str[i] == str[i + 3] && str[i + 1] == str[i + 2] && str[i] != str[i + 1]) {
            if (in_brackets) return false;
            is_valid = true;
        }
    }
    return is_valid;
}

export function solve_part_one(day_input: string[]): number {
    return day_input.filter(has_abba).length
}

function has_aba_bab(str: string): boolean {
    let in_brackets = false;
    let aba_seqs = [], bab_seqs = [];
    // Find all sequences, outside and inside brackets
    for (let i = 0; i < str.length - 2; i++) {
        if (str[i] == "[" || str[i] == "]") {
            in_brackets = (str[i] == "[");
        } else if (str[i] == str[i + 2] && str[i] != str[i + 1]) {
            if (in_brackets)
                bab_seqs.push(str[i + 1] + str[i]);
            else
                aba_seqs.push(str[i] + str[i + 1]);
        }
    }
    // Intersection of the sets
    return aba_seqs.filter(seq => bab_seqs.indexOf(seq) != -1).length > 0
}

export function solve_part_two(day_input: string[]): number {
    return day_input.filter(has_aba_bab).length
}