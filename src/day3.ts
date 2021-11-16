
function valid_triangle(a: number, b: number, c: number) {
    return (a + b > c && a + c > b && b + c > a);
}

export function solve_part_one(day_input: string[]): number {
    let count = 0;
    for (let line of day_input) {
        let [a, b, c] = line.trim().replace(/\s+/g, ",").split(",").map(a => parseInt(a))
        count += valid_triangle(a, b, c) ? 1 : 0;
    }
    return count;
}

export function solve_part_two(day_input: string[]): number {
    let count = 0;
    let values = day_input.map(l => l.trim().replace(/\s+/g, ",").split(",").map(a => parseInt(a)));
    // We still have *values.length* triangles in the array, they are just in the rows instead of 
    // the columns, so we're walking the array each 3 rows
    for (let n = 0; n < values.length; n++) {
        let col = n % 3, row = Math.floor(n / 3) * 3;
        count += valid_triangle(values[row][col], values[row+1][col], values[row+2][col]) ? 1 : 0;
    }
    return count;
}