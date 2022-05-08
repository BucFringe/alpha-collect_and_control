// Game Imports
import { getObjectsByPrototype } from '/game/utils';
import { Creep, StructureSpawn } from '/game/prototypes';
import { MOVE, CARRY, WORK, TOUGH, RANGED_ATTACK, HEAL } from '/game/constants';

// My Imports


//   The Following script deals with the overall creation of screeps, The actuall creation is done in following
// scripts contained in the same folder as this file.

function customSpawner(spawn, creepBody, role) {
    let c = spawn.spawnCreep(creepBody).object;
    try {
        c.role = role
    } catch (error) {
        // console.log('oppps creep must not be around yet')
    }
}
function customGroupSpawner(spawn, creepBody, role, group) {
    let c = spawn.spawnCreep(creepBody).object;
    try {
        c.role = role
        c.groupNumber = group
    } catch (error) {
        // console.log('oppps creep must not be around yet')
    }
}

export function spawnMaster(spawn) {
    // Creep Types
    let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    let myMiners = myCreeps.filter(c => c.role === 'miner');
    let myScouts = myCreeps.filter(c => c.role === 'scout');
    let myButlers = myCreeps.filter(c => c.role === 'butler');
    let mydefenders = myCreeps.filter(c => c.role === 'defender')
    let mydefhealers = myCreeps.filter(c => c.role === 'defenderHeal')

    // Creep selection code
    // console.log(myScouts.length)
    if (myMiners.length < 1) {
        //    if there is no creeps always spawn a quick starter creep.
        console.log('attempting to spawn a miner creep')
        let c = spawn.spawnCreep([WORK, WORK, WORK, MOVE]).object;
        try {
            c.role = 'miner'
        } catch (error) {
            // console.log('oppps creep must not be around yet')
        }
    } else if (myButlers.length < 1) {
        console.log('attempting to spawn a butler')
        let c = spawn.spawnCreep([MOVE, CARRY]).object;
        try {
            c.role = 'butler'
        } catch (error) {
            // console.log('oppps creep must not be around yet')
        }
    } else if (myMiners.length < 2) {
        console.log('attempting to spawn a 2nd Miner')
        customSpawner(spawn, [WORK, WORK, WORK, MOVE], 'miner' )
    } else if (mydefenders.length < 1) {
        console.log('attempting to spawn Defenders')
        customGroupSpawner(spawn, [TOUGH, TOUGH, TOUGH , TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], 'defender', 'base')
    } else if (mydefhealers.length <= 2) {
        console.log('attempting to spawn Defence Healers')
        customGroupSpawner(spawn, [TOUGH, HEAL, HEAL, MOVE, MOVE], 'defenderHeal', 'base')
    } else if (myScouts.length < 2) { //Getting a Scout out to get the ball rolling
        console.log('attempting to spawn a scout creep')
        let c = spawn.spawnCreep([TOUGH, WORK, CARRY, RANGED_ATTACK, HEAL, CARRY, MOVE, MOVE]).object;
        try {
            c.role = 'scout'
        } catch (error) {
            // console.log('oppps creep must not be around yet')
        }
    }
}
