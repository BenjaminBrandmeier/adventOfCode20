const intializeMapWithNextAdapters = (adapters: number[]) => new Map(adapters.map(n => [n, adapters.filter(a => n + 3 >= a && a > n)]));
const getOrCalcWays = (mapOfWays: Map<number, number>, mapOfNexts: Map<number, number[]>, adapter: number, all: number[]): number => mapOfWays.get(adapter) ?? mapOfWays.set(adapter, calcAllDistinctWays(mapOfWays, mapOfNexts, all, Math.max(...all), adapter)).get(adapter)!;
const addUp = (mapOfNexts: Map<number, number[]>, adapter: number, mapOfWays: Map<number, number>, all: number[]) => mapOfNexts.get(adapter)!.map((a) => getOrCalcWays(mapOfWays, mapOfNexts, a, all)).reduce((a, b) => a + b);
const calcAllDistinctWays = (mapOfWays: Map<number, number>, mapOfNexts: Map<number, number[]>, all: number[], max: number, n = 0): number => n != max ? addUp(mapOfNexts, n, mapOfWays, all) : 1;

const allAdapters: number[] = (await Deno.readTextFile('input.txt')).split(/\n/).map(Number).concat(0);
const mapOfNexts = intializeMapWithNextAdapters(allAdapters);
const jointDifferences = Array.from(mapOfNexts).map(b => Math.abs(b[0] - Math.min(...b[1])));

console.log('product of jolts:', jointDifferences.filter(n => n === 1).length * (jointDifferences.filter(n => n === 3).length + 1));
console.log('all distinct ways:', calcAllDistinctWays(new Map(), mapOfNexts, allAdapters, Math.max(...allAdapters)))