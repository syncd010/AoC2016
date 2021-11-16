
export function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

export function clamp(n: number, min: number, max: number) {
    return (n < min) ? min : (n > max) ? max : n;
}

export function transpose2D<Type>(array2D: Type[][]): Type[][] {
    return array2D[0].map((_, colIndex) => array2D.map(row => row[colIndex]));
}

// Sequence generator function
export function range(start: number, stop: number, step: number = 1) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
}

/**
 * Generic Depth First Search Function
 * @param start Start state
 * @param successors Function to generate successors from a state
 * @param is_goal Test for goal state
 * @param state_key Function that provides a unique key for a state
 * @returns Array with the visited states or null if no path found
 */
export function breadth_first_search<T>(start: T, successors: (state: T) => T[], is_goal: (state: T) => boolean, state_key: (state: T) => string): T[] {
    if (is_goal(start)) return [start];
    let frontier: T[] = [start];
    // Explored will save the parents of the node
    let explored = { };
    explored[state_key(start)] = null;
    while (frontier.length > 0) {
        let current = frontier.shift();
        for (let next of successors(current)) {
            let next_key = state_key(next)
            if (next_key in explored) continue;
            if (is_goal(next)) {
                // Reconstruct the path till here
                let path = [ next, current ];
                while (explored[state_key(path[path.length - 1])] != null)
                    path.push(explored[state_key(path[path.length - 1])]);
                return path;
            }
            // Save the parent so we can reconstruct the path
            explored[next_key] = current;
            frontier.push(next);
        }
    }
    return null;
}

export function* power_set<T>(array: T[], n: number): Generator<T[], T[][], unknown> {
    if (n == 0 || array.length == 0 || n > array.length) {
        yield []
        return
    }

    for (let i = 0; i < array.length - n + 1; i++) {
        for (let rest of power_set(array.slice(i + 1), n - 1)) {
            rest.unshift(array[i])
            yield rest
        }
    }
}

/**
 * Counts the number of times each char appears in the string
 * @param str String to count chars on
 * @returns Object with each char as property and its count as the value
 */
export function count_chars(str: string[]) {
    return str.reduce((cnt, c) => { cnt[c] = (c in cnt) ? cnt[c] + 1 : 1; return cnt }, {});
}

const position_properties = ['x', 'y', 'z'];
export class Position {
    static Origin = new Position(0, 0);

    constructor(public x: number, public y: number, public z: number = 0) { }

    distanceTo(other: Position): number {
        var d = 0;
        for (let prop of position_properties)
            d += Math.abs(this[prop] - other[prop]);
        return d;
    }

    key(): string {
        return `${this.x},${this.y},${this.z}`;
    }

    add(other: Position): Position {
        let tmp = new Position(0, 0, 0);
        for (let prop of position_properties)
            tmp[prop] = this[prop] + other[prop];
        return tmp;
    }

    iadd(other: Position) {
        for (let prop of position_properties)
            this[prop] += other[prop];
    }

    mul(other: number): Position {
        let tmp = new Position(0, 0, 0);
        for (let prop of position_properties)
            tmp[prop] = this[prop] * other;
        return tmp;
    }

    imul(other: number) {
        for (let prop of position_properties)
            this[prop] *= other;
    }
}
