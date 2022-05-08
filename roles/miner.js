import { getObjectsByPrototype, findInRange, findClosestByPath } from '/game/utils';
import { Creep, Source } from '/game/prototypes';
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from '/game/constants';
import { Visual } from '/game/visual'


export function runMiner(creep, spawn) {
    let source = getObjectsByPrototype(Source);
    let closeSource = findClosestByPath(creep, source)
    if (creep.harvest(closeSource) === ERR_NOT_IN_RANGE) {
        creep.moveTo(closeSource)
    }

}