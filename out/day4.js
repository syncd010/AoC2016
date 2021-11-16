"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = void 0;
function is_valid_room(name, checksum) {
    let chars = name.replace(/-/g, "").split("");
    let counts = chars.reduce((cnt, c) => { cnt[c] = (c in cnt) ? cnt[c] + 1 : 1; return cnt; }, {});
    let sorted = Object.keys(counts)
        .sort((a, b) => (counts[b] - counts[a]) * 26 + (a.charCodeAt(0) - b.charCodeAt(0)))
        .join("");
    return (checksum == sorted.slice(0, checksum.length));
}
function solve_part_one(day_input) {
    let res = 0;
    for (let line of day_input) {
        let [name, sector, checksum] = [
            line.slice(0, line.lastIndexOf("-")),
            parseInt(line.slice(line.lastIndexOf("-") + 1, line.lastIndexOf("["))),
            line.slice(line.lastIndexOf("[") + 1, line.lastIndexOf("]"))
        ];
        if (is_valid_room(name, checksum))
            res += sector;
    }
    return res;
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    let res = 0;
    for (let line of day_input) {
        let [name, sector, checksum] = [
            line.slice(0, line.lastIndexOf("-")),
            parseInt(line.slice(line.lastIndexOf("-") + 1, line.lastIndexOf("["))),
            line.slice(line.lastIndexOf("[") + 1, line.lastIndexOf("]"))
        ];
        if (is_valid_room(name, checksum)) {
            let base = "a".charCodeAt(0);
            let decoded = name.split("")
                .map((c) => (c == "-") ? " " : String.fromCharCode((c.charCodeAt(0) - base + sector) % 26 + base)).join("");
            if (decoded.indexOf("pole") != -1)
                return sector;
        }
    }
    return -1;
}
exports.solve_part_two = solve_part_two;
