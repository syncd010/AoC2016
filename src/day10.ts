
export function exec(instructions: string[], low_guard: number, high_guard: number) : { outputs: {} , bot_id: string } {
    // bots is a map of bot id to the values it has (which is number[])
    // transfers is a map of bot id to the destinations (bots or output) of its low and high values
    // (which is { low_dest: string, low_dest_id: number, high_dest: string, high_dest_id: number }
    let bots = {}, transfers = {};
    for (let line of instructions) {
        let val_match = line.match(/value (\d+) goes to bot (\d+)/),
            bot_match = line.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/);

        if (val_match != null) {
            let id = val_match[2];
            if (!(id in bots)) bots[id] = [];
            bots[id].push(parseInt(val_match[1]));
        } else if (bot_match != null) {
            let orig_id = parseInt(bot_match[1]);
            transfers[orig_id] = {
                low_dest: bot_match[2], low_dest_id: parseInt(bot_match[3]),
                high_dest: bot_match[4], high_dest_id: parseInt(bot_match[5])
            };
            for (let id of [orig_id, transfers[orig_id].low_dest_id, transfers[orig_id].high_dest_id])
                if (!(id in bots)) bots[id] = [];
        }
    }

    let outputs = {}, res_bot_id = "None";
    // Distribute the values that are on bots
    while (true) {
        // Find a bot that has 2 values to distribute
        let bot_id = "";
        for (const [id, values] of Object.entries(bots)) {
            if (Array.isArray(values) && (values.length == 2)) {
                bot_id = id;
                break;
            }
        }
        // No more bots to distribute
        if (bot_id == "") break;

        let low = Math.min(...bots[bot_id]), high = Math.max(...bots[bot_id]), dest = transfers[bot_id];
        // Found it?
        if (low == low_guard && high == high_guard) {
            res_bot_id = bot_id;
            break;
        }

        // Distribute bot values
        if (dest.low_dest == "bot")
            bots[dest.low_dest_id].push(low)
        else
            outputs[dest.low_dest_id] = low;
        if (dest.high_dest == "bot")
            bots[dest.high_dest_id].push(high)
        else
            outputs[dest.high_dest_id] = high;
        bots[bot_id] = []
    }
    return { outputs: outputs, bot_id: res_bot_id };
}

export function solve_part_one(day_input: string[]): string {
    let res = exec(day_input, 17, 61)
    return res.bot_id;
}

export function solve_part_two(day_input: string[]): number {
    // Invoke again with bogus guards so that it executes till the end
    let res = exec(day_input, -1, -1)
    return res.outputs['0'] * res.outputs['1'] * res.outputs['2'];
}