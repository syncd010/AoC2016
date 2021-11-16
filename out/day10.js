"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve_part_two = exports.solve_part_one = exports.exec = void 0;
function exec(instructions, low_guard, high_guard) {
    let bots = {}, transfers = {};
    for (let line of instructions) {
        let val_match = line.match(/value (\d+) goes to bot (\d+)/), bot_match = line.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/);
        if (val_match != null) {
            let id = val_match[2];
            if (!(id in bots))
                bots[id] = [];
            bots[id].push(parseInt(val_match[1]));
        }
        else if (bot_match != null) {
            let orig_id = parseInt(bot_match[1]);
            transfers[orig_id] = {
                low_dest: bot_match[2], low_dest_id: parseInt(bot_match[3]),
                high_dest: bot_match[4], high_dest_id: parseInt(bot_match[5])
            };
            for (let id of [orig_id, transfers[orig_id].low_dest_id, transfers[orig_id].high_dest_id])
                if (!(id in bots))
                    bots[id] = [];
        }
    }
    let outputs = {}, res_bot_id = "None";
    while (true) {
        let bot_id = "";
        for (const [id, values] of Object.entries(bots)) {
            if (Array.isArray(values) && (values.length == 2)) {
                bot_id = id;
                break;
            }
        }
        if (bot_id == "")
            break;
        let low = Math.min(...bots[bot_id]), high = Math.max(...bots[bot_id]), dest = transfers[bot_id];
        if (low == low_guard && high == high_guard) {
            res_bot_id = bot_id;
            break;
        }
        if (dest.low_dest == "bot")
            bots[dest.low_dest_id].push(low);
        else
            outputs[dest.low_dest_id] = low;
        if (dest.high_dest == "bot")
            bots[dest.high_dest_id].push(high);
        else
            outputs[dest.high_dest_id] = high;
        bots[bot_id] = [];
    }
    return { outputs: outputs, bot_id: res_bot_id };
}
exports.exec = exec;
function solve_part_one(day_input) {
    let res = exec(day_input, 17, 61);
    return res.bot_id;
}
exports.solve_part_one = solve_part_one;
function solve_part_two(day_input) {
    let res = exec(day_input, -1, -1);
    return res.outputs['0'] * res.outputs['1'] * res.outputs['2'];
}
exports.solve_part_two = solve_part_two;
