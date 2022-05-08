import { getObjectsByPrototype } from '/game/utils';
import { Creep } from '/game/prototypes';

import { runMiner } from "./miner";
import { runScout } from "./scout";

export function creepMaster(creep, spawn) {
    // console.log('we hit the creep master whoop!')
    if (creep.role === 'starter') {
        // console.log('creep is a starter creep')
        runMiner(creep, spawn);
    } else if (creep.role === 'scout') {
        runScout(creep);
    }
}