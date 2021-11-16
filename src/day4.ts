
function is_valid_room(name: string, checksum: string) {
    // Remove "-" and convert to to array
    let chars = name.replace(/-/g, "").split("");
    // Get the count of each unique character
    let counts = chars.reduce((cnt, c) => { cnt[c] = (c in cnt) ? cnt[c] + 1 : 1; return cnt }, {});
    // Get the unique characters, and sort them by their frequency on the name and alphabetical order
    let sorted = Object.keys(counts)
        .sort((a, b) => (counts[b] - counts[a]) * 26 + (a.charCodeAt(0) - b.charCodeAt(0)))
        .join("");
    // Check if checksum is equal to the unique sorted characters we got
    return (checksum == sorted.slice(0, checksum.length));
}

export function solve_part_one(day_input: string[]): number {
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
    return res
}

export function solve_part_two(day_input: string[]): number {
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
                .map((c) =>
                    (c == "-") ? " " : String.fromCharCode((c.charCodeAt(0) - base + sector) % 26 + base)
                ).join("");
            if (decoded.indexOf("pole") != -1)
                return sector;
        }
    }
    return -1
}