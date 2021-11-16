"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
function has_abba(str) {
    let in_brackets = false, is_valid = false;
    for (let i = 0; i < str.length - 3; i++) {
        if (str[i] == "[" || str[i] == "]") {
            in_brackets = (str[i] == "[");
        }
        else if (str[i] == str[i + 3] && str[i + 1] == str[i + 2] && str[i] != str[i + 1]) {
            if (in_brackets)
                return false;
            is_valid = true;
        }
    }
    return is_valid;
}
function solve_part_one(day_input) {
    return day_input.filter(has_abba).length;
}
exports.solve_part_one = solve_part_one;
function has_aba_bab(str) {
    let in_brackets = false;
    let aba_seqs = [], bab_seqs = [];
    for (let i = 0; i < str.length - 2; i++) {
        if (str[i] == "[" || str[i] == "]") {
            in_brackets = (str[i] == "[");
        }
        else if (str[i] == str[i + 2] && str[i] != str[i + 1]) {
            if (in_brackets)
                bab_seqs.push(str[i + 1] + str[i]);
            else
                aba_seqs.push(str[i] + str[i + 1]);
        }
    }
    return aba_seqs.filter(seq => bab_seqs.indexOf(seq) != -1).length > 0;
}
function solve_part_two(day_input) {
    return day_input.filter(has_aba_bab).length;
}
exports.solve_part_two = solve_part_two;
