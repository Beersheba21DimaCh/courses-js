import { isArray } from "lodash";

export function getRandomInteger(min, max) {
    if(max < min){
        [min, max] = [max, min];
    }
    return Math.round(min + (max - min) * Math.random());
}

export function getRandomElement(array) {

    if(!Array.isArray(array) || array.length === 0){
        throw Error("");
    }
    return array[getRandomInteger(0, array.length-1)];
}
