"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = exports.count_chars = exports.power_set = exports.breadth_first_search = exports.range = exports.transpose2D = exports.clamp = exports.mod = void 0;
function mod(n, m) {
    return ((n % m) + m) % m;
}
exports.mod = mod;
function clamp(n, min, max) {
    return (n < min) ? min : (n > max) ? max : n;
}
exports.clamp = clamp;
function transpose2D(array2D) {
    return array2D[0].map((_, colIndex) => array2D.map(row => row[colIndex]));
}
exports.transpose2D = transpose2D;
function range(start, stop, step = 1) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
}
exports.range = range;
function breadth_first_search(start, successors, is_goal, state_key) {
    if (is_goal(start))
        return [start];
    let frontier = [start];
    let explored = {};
    explored[state_key(start)] = null;
    while (frontier.length > 0) {
        let current = frontier.shift();
        for (let next of successors(current)) {
            let next_key = state_key(next);
            if (next_key in explored)
                continue;
            if (is_goal(next)) {
                let path = [next, current];
                while (explored[state_key(path[path.length - 1])] != null)
                    path.push(explored[state_key(path[path.length - 1])]);
                return path;
            }
            explored[next_key] = current;
            frontier.push(next);
        }
    }
    return null;
}
exports.breadth_first_search = breadth_first_search;
function* power_set(array, n) {
    if (n == 0 || array.length == 0 || n > array.length) {
        yield [];
        return;
    }
    for (let i = 0; i < array.length - n + 1; i++) {
        for (let rest of power_set(array.slice(i + 1), n - 1)) {
            rest.unshift(array[i]);
            yield rest;
        }
    }
}
exports.power_set = power_set;
function count_chars(str) {
    return str.reduce((cnt, c) => { cnt[c] = (c in cnt) ? cnt[c] + 1 : 1; return cnt; }, {});
}
exports.count_chars = count_chars;
const position_properties = ['x', 'y', 'z'];
class Position {
    x;
    y;
    z;
    static Origin = new Position(0, 0);
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    distanceTo(other) {
        var d = 0;
        for (let prop of position_properties)
            d += Math.abs(this[prop] - other[prop]);
        return d;
    }
    key() {
        return `${this.x},${this.y},${this.z}`;
    }
    add(other) {
        let tmp = new Position(0, 0, 0);
        for (let prop of position_properties)
            tmp[prop] = this[prop] + other[prop];
        return tmp;
    }
    iadd(other) {
        for (let prop of position_properties)
            this[prop] += other[prop];
    }
    mul(other) {
        let tmp = new Position(0, 0, 0);
        for (let prop of position_properties)
            tmp[prop] = this[prop] * other;
        return tmp;
    }
    imul(other) {
        for (let prop of position_properties)
            this[prop] *= other;
    }
}
exports.Position = Position;
