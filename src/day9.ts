
function get_resulting_string(str: string): string {
    // We're going to decode into res[i], idx is the current pos being processed on the original line
    let res = "";
    let idx = 0, line = str;
    while (idx < line.length) {
        // Match the marker string
        let m = line.substr(idx).match(/\((\d+)x(\d+)\)/);
        if (m == null) {
            // None left, copy what's left
            res += line.substr(idx);
            idx = line.length;
        } else {
            // Copy until the start of the marker, position idx after the marker and copy
            // m[1] characters, m[2] times as specified in the marker. Advance the marker after
            res += line.substr(idx, m.index);
            idx += m.index + m[0].length;
            for (let rep = 0; rep < parseInt(m[2]); rep++)
                res += line.substr(idx, parseInt(m[1]));
            idx += parseInt(m[1]);
        }
    }
    return res;
}

export function solve_part_one_old(day_input: string[]): number {
    // Consider that the input might have several strings
    let res: string[] = [];
    for (let i = 0; i < day_input.length; i++) {
        res[i] = get_resulting_string(day_input[i]);
    }
    return res.map(v => v.length).reduce((a, b) => a + b);
}

function get_length(str: string, part: number): number {
    // Match first marker
    let m = str.match(/\((\d+)x(\d+)\)/);
    if (m == null) {
        // None left, return length of str
        return str.length;
    } else {
        // Calculate  length of repeated and rest string recursively
        let rep = str.substr(m.index + m[0].length, parseInt(m[1])),
            rest = str.substr(m.index + m[0].length + parseInt(m[1]));
        if (part == 1)
            return m.index + parseInt(m[2]) * rep.length + get_length(rest, part);
        else
            return m.index + parseInt(m[2]) * get_length(rep, part) + get_length(rest, part);
    }
}

export function solve_part_one(day_input: string[]): number {
    return day_input.map(v => get_length(v, 1)).reduce((a, b) => a + b);
}
export function solve_part_two(day_input: string[]): number {
    return day_input.map(v => get_length(v, 2)).reduce((a, b) => a + b);
}