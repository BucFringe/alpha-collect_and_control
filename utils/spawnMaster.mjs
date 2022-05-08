// Game Imports
import { getObjectsByPrototype } from '/game/utils';
import { Creep, StructureSpawn } from '/game/prototypes';
import { MOVE, CARRY, WORK, TOUGH, RANGED_ATTACK, HEAL } from '/game/constants';

// My Imports


//   The Following script deals with the overall creation of screeps, The actuall creation is done in following
// scripts contained in the same folder as this file.

export function spawnMaster(spawn) {
    // Creep Types
    let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    let myHarvesters = myCreeps.filter(c => c.role === 'harvest');
    let myScouts = myCreeps.filter(c => c.role === 'scout');

    // Creep selection code
    // console.log(myScouts.length)
    if (myCreeps.length < 2) {
        //    if there is no creeps always spawn a quick starter creep.
        console.log('attempting to spawn a starter creep')
        let c = spawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE]).object;
        try {
            c.role = 'starter'
        } catch (error) {
            console.log('oppps creep must not be around yet')
        }
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
