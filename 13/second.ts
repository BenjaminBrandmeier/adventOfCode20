import {Bus} from "./data.ts";

const areWeStillLookingForABus = (indexOfBusStillToBeFound: number) => indexOfBusStillToBeFound !== -1;
const findBusWhichDoesNotFulfillCriteria = (relevantBuses: Bus[], time: number) => relevantBuses.find(bus => !(Number.isInteger((time + bus.idx) / bus.busId)));
const calculateNewStep = (busesFound: number, relevantBuses: Bus[]) => [...Array(busesFound).keys()].reduce((acc, b) => acc * relevantBuses[b].busId, 1);

function day13b(allBuses: number[]) {
    const relevantBuses: Bus[] = allBuses.map((busId, idx) => ({busId, idx})).filter((bus) => !isNaN(bus.busId))
    let time = 0;
    let step = relevantBuses[0].busId;
    let busesFound = 0;
    let busesFoundLastTime = 0;

    while (areWeStillLookingForABus(busesFound)) {
        time += step;
        busesFound = relevantBuses.indexOf(findBusWhichDoesNotFulfillCriteria(relevantBuses, time)!);

        if (busesFound > busesFoundLastTime) {
            step = calculateNewStep(busesFound, relevantBuses);
            busesFoundLastTime = busesFound;
        }
    }
    return time;
}

const allBuses: number[] = (await Deno.readTextFile('input.txt')).split(/\n/)[1].split(',').map(Number);
console.log('Answer:', day13b(allBuses));