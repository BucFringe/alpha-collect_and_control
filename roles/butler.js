import { getObjectsByPrototype, findInRange, findClosestByPath } from '/game/utils';
import { Creep, Source, Resource, StructureSpawn } from '/game/prototypes';
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from '/game/constants';
import { Visual } from '/game/visual'


export function runButler(creep) {
    let energy = getObjectsByPrototype(Resource);
    let nextto = findInRange(creep, energy, 2);
    let spawn = getObjectsByPrototype(StructureSpawn).filter(spawn => spawn.my);
    let dropPoint = findInRange(creep, spawn, 2);

    if (nextto.length > 1) {
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
            if (creep.pickup(nextto[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(nextto[0])
            }
        } else {
            if (creep.transfer(dropPoint, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(dropPoint)
            }
        }
    }
}