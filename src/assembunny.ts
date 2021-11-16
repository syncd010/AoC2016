import { off } from "process";

export interface Instruction {
    opcode: string;
    args: string[];
}

export type Registers = { a: number, b: number, c: number, d: number };

export function parse(input: string[]): Instruction[] {
    let instructions: Instruction[] = [];

    for (let line of input) {
        const parts = line.split(" ");
        instructions.push({ opcode: parts[0], args: parts.slice(1) });
    }

    return instructions;
}

export function exec(instructions: Instruction[], registers: Registers = { "a": 0, "b": 0, "c": 0, "d": 0 }, max_inst = -1): { registers: Registers, out: string } {
    let ip = 0, out = "", n = 0;

    const value_or_register = (val: string): number =>
        (isNaN(val as any)) ? registers[val] : parseInt(val);

    let i = 0;
    while (ip < instructions.length) {
        let inst = instructions[ip],
            jump = 1;
        switch (inst.opcode) {
            case "cpy":
                if (inst.args[1] in registers)
                    registers[inst.args[1]] = value_or_register(inst.args[0]);
                break;
            case "inc":
                if (inst.args[0] in registers)
                    registers[inst.args[0]]++;
                break;
            case "dec":
                if (inst.args[0] in registers)
                    registers[inst.args[0]]--;
                break;
            case "jnz":
                if (value_or_register(inst.args[0]) != 0)
                    jump = value_or_register(inst.args[1]);
                break;
            case "tgl":
                const toggled = { "cpy": "jnz", "inc": "dec", "dec": "inc", "jnz": "cpy", "tgl": "inc" }
                let offset = value_or_register(inst.args[0]);
                if (ip + offset >= 0 && ip + offset < instructions.length)
                    instructions[ip + offset].opcode = toggled[instructions[ip + offset].opcode];
                break;
            case "out":
                out += value_or_register(inst.args[0]).toString();
        }
        ip += jump;
        if (++n >= max_inst) break;
    }
    return { registers, out };
}