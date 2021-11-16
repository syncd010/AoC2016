
function parse(input: string[]): number[][] {
    let res = []
    for (let line of input) {
        res.push(line.split("-").map(v => parseInt(v)));
    }
    return res.sort((a, b) => a[0] - b[0]);
}

export function solve_part_one(day_input: string[]): number {
    let exclusions = parse(day_input),
        min = 0;
    for (let exc of exclusions) {
        if (min < exc[0])
            break;
        min = Math.max(min, exc[1] + 1);
    }
    return min;
}

export function solve_part_two(day_input: string[]): number {
    let exclusions = parse(day_input),
        min = 0, count = 0;
    for (let exc of exclusions) {
        if (min < exc[0])
            count += exc[0] - min;
        min = Math.max(min, exc[1] + 1);
    }
    return count;
}