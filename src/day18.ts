function evolve(str: string, n: number): string[] {
    str = "." + str + ".";
    let tiles: string[][] = [str.split("")];
    for (let i = 1; i < n; i++) {
        tiles[i] = str.split("");
        for (let j = 1; j < tiles[i].length - 1; j++) {
            if ((tiles[i - 1][j - 1] == "^") && (tiles[i - 1][j] == "^") && (tiles[i - 1][j + 1] == ".") ||
                (tiles[i - 1][j - 1] == ".") && (tiles[i - 1][j] == "^") && (tiles[i - 1][j + 1] == "^") ||
                (tiles[i - 1][j - 1] == "^") && (tiles[i - 1][j] == ".") && (tiles[i - 1][j + 1] == ".") ||
                (tiles[i - 1][j - 1] == ".") && (tiles[i - 1][j] == ".") && (tiles[i - 1][j + 1] == "^"))
                tiles[i][j] = "^";
            else
                tiles[i][j] = ".";
        }
    }
    return tiles.map(v => v.slice(1, v.length - 1).join(""));
}

function count_safe(tiles: string[]) {
    return tiles.reduce((p, c) => p + c.split("").reduce((a, b) => a + ((b == ".") ? 1 : 0), 0), 0);
}

export function solve_part_one(day_input: string[]): number {
    let tiles = evolve(day_input[0], 40);
    return count_safe(tiles);
}

export function solve_part_two(day_input: string[]): number {
    let tiles = evolve(day_input[0], 400000);
    return count_safe(tiles);
}