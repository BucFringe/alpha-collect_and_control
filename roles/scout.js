import { getObjectsByPrototype, findInRange, findClosestByPath } from '/game/utils';
import { Creep, Source, StructureContainer } from '/game/prototypes';
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from '/game/constants';
import { Visual } from '/game/visual'
import { RESOURCE_SCORE, ScoreCollector } from '/arena';

export function runScout(creep) {
    let enemies = getObjectsByPrototype(Creep).filter(creep => !creep.my);
    console.log('Enemies found in map', enemies.length)
    let nearEnemies = findInRange(creep, enemies, 10);
    let tooClose = findInRange(creep, enemies, 2);
    let containers = getObjectsByPrototype(StructureContainer).filter(c => c.store[RESOURCE_SCORE]);
    let scorers = getObjectsByPrototype(ScoreCollector);
    if (creep.hits == creep.hitsMax) {
        if (nearEnemies.length > 1) {
            console.log('Need to attack');
            creep.rangedAttack(nearEnemies[0]);
        } else {
            if (containers.length > 0) {
                if (creep.store.getFreeCapacity(RESOURCE_ENERGY)){
                    let closest = findClosestByPath(scorers[0], containers);
                    if (creep.withdraw(closest, RESOURCE_SCORE) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(closest)
                    }
                } else {
                    if (creep.transfer(scorers[0], RESOURCE_SCORE) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(scorers[0])
                    }
                }

            }
        }
    } else {
        console.log('Creep needs to heal')
        creep.heal(creep);
    }



}