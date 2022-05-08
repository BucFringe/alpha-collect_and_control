import { getObjectsByPrototype, findInRange, findClosestByPath } from '/game/utils';
import { Creep, Source } from '/game/prototypes';
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from '/game/constants';
import { Visual } from '/game/visual'


export function runMiner(creep, spawn) {
    console.log('lets do mining stuff');
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
        // Visual.text(creep, 'Mine')
        console.log('Creep has space', creep.store.getFreeCapacity(RESOURCE_ENERGY));
        // The creep has space and it should now go and mine
        let source = getObjectsByPrototype(Source);
        let closeSource = findClosestByPath(creep, source)
        if (creep.harvest(closeSource) === ERR_NOT_IN_RANGE) {
            console.log('Need to move closer to the source ... ')
            creep.moveTo(closeSource)
        }
    } else {
        // console.log('full', spawn)
        if (creep.transfer(spawn[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            console.log('moving to spawn')
            creep.moveTo(spawn[0])
        }
    }
}