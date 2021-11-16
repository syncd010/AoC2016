// MD5 algo from http://www.myersdaily.org/joseph/javascript/md5-text.html
import { md5 } from "./md5"

function next_hash(str: string, idx: number) {
    for (; ; idx++) {
        let hash: string = md5(str + idx.toString());
        if (hash.startsWith("00000")) {
            return { hash, idx };
        }
    }
}

export function solve_part_one(day_input: string[]): string {
    let idx = 0;
    let hashes: string[] = [];
    while (hashes.length < 8) {
        let next = next_hash(day_input[0], idx);
        hashes.push(next.hash);
        idx = next.idx + 1;
    }
    return hashes.map(hash => hash[5]).join("");
}

export function solve_part_two(day_input: string[]): string {
    let idx = 0;
    let hashes: string[] = [];
    let pwd = "--------".split("");

    while (hashes.length < 8) {
        let next = next_hash(day_input[0], idx);
        let pos = parseInt(next.hash[5]);
        if (!isNaN(pos) && pos < pwd.length && pwd[pos] == "-") {
            pwd[pos] = next.hash[6];
            hashes.push(next.hash);
        }
        idx = next.idx + 1;
    }
    return pwd.join("");
}