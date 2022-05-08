import { getObjectsByPrototype } from '/game/utils';
import { Creep } from '/game/prototypes';

import { runMiner } from "./miner";
import { runScout } from "./scout";
import { runButler } from "./butler";
import { baseDefence, baseHealers } from "./baseDefence";

export function creepMaster(creep, spawn) {
    // console.log('we hit the creep master whoop!')
    if (creep.role === 'miner') {
        // console.log('creep is a starter creep')
        runMiner(creep, spawn);
    } else if (creep.role === 'scout') {
        runScout(creep);
    } else if (creep.role === 'butler') {
        runButler(creep);
    } else if (creep.role === 'defender') {
        baseDefence(creep)
    } else if (creep.role === 'defenderHeal') {
        baseHealers(creep)
    }
}