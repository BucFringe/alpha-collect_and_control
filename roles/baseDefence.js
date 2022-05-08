import { getObjectsByPrototype, findInRange, findClosestByPath } from '/game/utils';
import { Creep, StructureSpawn } from '/game/prototypes';
import { ERR_NOT_IN_RANGE } from '/game/constants';



export function baseHealers(creep) {
    let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    let myGroup = myCreeps.filter(c => c.groupNumber === 'base');

    myGroup.forEach(c => {
        if (c.hits === c.hitsMax){
            if (creep.rangedHeal(c) === ERR_NOT_IN_RANGE){
                creep.moveTo(c);
            }
        }
    })

}

export function baseDefence(creep) {
    let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    let enemies = getObjectsByPrototype(Creep).filter(creep => !creep.my);
    let myGroup = myCreeps.filter(c => c.groupNumber === 'base');
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(spawn => spawn.my);
    let base = findInRange(creep, mySpawn, 50);

    console.log(myGroup.length)

    if (myGroup.length >= 3) {
        console.log('Defence Ready');
        let enemiesInRange = findInRange(base[0], enemies, 35);
        if (enemiesInRange) {
            let target = findClosestByPath(creep, enemiesInRange)
            if (findInRange(creep, enemiesInRange, 2)) {
                creep.moveTo(base[0])
                if (creep.rangedAttack(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
            } else {
                if (creep.rangedAttack(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
            }
        }

    } else { console.log('Defence Not Ready'); }
}
